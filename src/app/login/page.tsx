'use client';

import {useState, useRef, Suspense} from 'react';
import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';
import {signInWithCustomToken} from 'firebase/auth';
import {auth} from '@/libs/firebaseConfig';
import {useAuth} from '@/context/AuthContext';
import {Eye, EyeOff, LogIn, UserPlus, Mail, Lock} from 'lucide-react';
import {Turnstile, type TurnstileInstance} from '@marsidev/react-turnstile';

type LoginFormType = {email: string; password: string};

function LoginForm() {
  const {loading: authLoading} = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState<LoginFormType>({email: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const turnstileRef = useRef<TurnstileInstance>(null);

  const rawRedirect = searchParams.get('redirect');
  const redirectTo = rawRedirect && rawRedirect.startsWith('/') ? rawRedirect : '/dashboard';

  const handleChange = (key: keyof LoginFormType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({...p, [key]: e.target.value}));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }

    if (!turnstileToken) {
      setError('Please verify you are human.');
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          turnstileToken: turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const {customToken} = data;

      if (!customToken) {
        throw new Error('Login successful, but secure token was missing.');
      }

      const userCred = await signInWithCustomToken(auth, customToken);
      const user = userCred.user;
      const idToken = await user.getIdToken();

      await fetch('/api/auth/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: idToken}),
      });

      router.replace(redirectTo);
    } catch (err: unknown) {
      let message = 'Login failed. Please try again.';
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      }
      setError(message);

      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="bg-base-200 flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen overflow-x-hidden">
      <div className="hero-content w-full max-w-[100vw] flex-col gap-10 px-4 lg:flex-row-reverse lg:gap-20">
        <div className="max-w-lg text-center lg:text-left">
          <div className="badge badge-primary badge-outline mb-4 font-medium">Dashboard Access</div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Welcome back!</h1>
          <p className="text-base-content/70 py-6 text-base leading-relaxed">
            Access your dashboard to manage your restaurant profile, track digital menu updates, and keep your customers
            informed.
          </p>
        </div>

        <div className="card border-base-300 bg-base-100 w-full max-w-md shrink-0 rounded-[2rem] border shadow-2xl">
          <div className="card-body p-4 sm:p-10">
            <h2 className="card-title mb-6 justify-center text-2xl font-bold">Sign In</h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="form-control w-full">
                <div className="label pt-0 pb-1.5">
                  <span className="label-text font-semibold">Email</span>
                </div>
                <label
                  className={`input input-bordered flex items-center gap-3 ${error && !form.email ? 'input-error' : ''}`}
                >
                  <Mail className="size-4 shrink-0 opacity-50" />
                  <input
                    id="email"
                    type="email"
                    className="min-w-0 grow"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                    autoComplete="email"
                  />
                </label>
              </div>

              <div className="form-control w-full">
                <div className="label pt-0 pb-1.5">
                  <span className="label-text font-semibold">Password</span>
                </div>
                <label
                  className={`input input-bordered flex items-center gap-3 ${error && !form.password ? 'input-error' : ''}`}
                >
                  <Lock className="size-4 shrink-0 opacity-50" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="min-w-0 grow"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange('password')}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content shrink-0"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </label>
                <div className="mt-2 text-right">
                  <Link
                    href="/forgot-password"
                    className="link link-hover text-base-content/60 hover:text-primary text-xs font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="bg-base-200/50 border-base-300 flex w-full max-w-full justify-center overflow-hidden rounded-xl border py-3 shadow-sm">
                <div className="max-w-full overflow-x-auto overflow-y-hidden">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      if (error === 'Please verify you are human.') setError(null);
                    }}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => {
                      setTurnstileToken(null);
                      turnstileRef.current?.reset();
                    }}
                    options={{theme: 'light', size: 'flexible'}}
                  />
                </div>
              </div>

              {error && (
                <div className="alert alert-error text-error-content rounded-xl py-3 text-sm break-words shadow-sm">
                  <span>{error}</span>
                </div>
              )}

              <button className="btn btn-primary mt-2 w-full shadow-sm" type="submit" disabled={submitting}>
                {submitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <LogIn className="size-4 shrink-0" /> Sign In
                  </>
                )}
              </button>
            </form>

            <div className="divider text-base-content/30 my-6 text-xs font-medium">OR</div>

            <div className="text-base-content/70 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="link link-hover text-primary inline-flex items-center gap-1 font-bold">
                Create Account <UserPlus className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-base-200 flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
