'use client';

import {useState, useEffect, useRef, Suspense} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {signInWithCustomToken} from 'firebase/auth';
import {auth} from '@/libs/firebaseConfig';
import {useAuth} from '@/context/AuthContext';
import {Eye, EyeOff, Check, X, ShieldCheck, Mail, Lock, User} from 'lucide-react';
import {Turnstile, type TurnstileInstance} from '@marsidev/react-turnstile';

type RegisterForm = {name: string; email: string; password: string; confirm: string};

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms?: string;
  general?: string;
};

function RegisterFormContent() {
  const {loading: authLoading} = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [criteria, setCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
  });
  const [strengthScore, setStrengthScore] = useState(0);

  useEffect(() => {
    const pwd = form.password;
    const rules = {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
    };

    setCriteria(rules);
    const score = Object.values(rules).filter(Boolean).length;
    setStrengthScore(score);
  }, [form.password]);

  const handleChange = (key: keyof RegisterForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({...p, [key]: e.target.value}));
    if (errors[key]) setErrors((prev) => ({...prev, [key]: undefined}));
    if (errors.general) setErrors((prev) => ({...prev, general: undefined}));
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Full Name is required.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (strengthScore < 4) {
      newErrors.password = 'Password is too weak. Please meet all requirements.';
      isValid = false;
    }

    if (form.password !== form.confirm) {
      newErrors.confirm = 'Passwords do not match.';
      isValid = false;
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions.';
      isValid = false;
    }

    if (!turnstileToken) {
      newErrors.general = 'Please verify you are human.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          turnstileToken: turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const {customToken} = data;
      if (!customToken) throw new Error('Registration successful, but login failed.');

      const userCred = await signInWithCustomToken(auth, customToken);
      const user = userCred.user;
      const idToken = await user.getIdToken();

      await fetch('/api/auth/session', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: idToken}),
      });

      router.replace('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      let message = 'An unexpected error occurred.';
      if (err instanceof Error) message = err.message;

      setErrors({general: message});
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const getProgressColor = () => {
    if (strengthScore <= 1) return 'progress-error';
    if (strengthScore <= 3) return 'progress-warning';
    return 'progress-success';
  };

  if (authLoading) {
    return (
      <div className="bg-base-200 flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen overflow-x-hidden pt-[64px]">
      <div className="hero-content w-full max-w-[100vw] flex-col gap-10 px-4 lg:flex-row-reverse lg:gap-20">
        <div className="max-w-lg text-center lg:text-left">
          <div className="badge badge-primary badge-outline mb-4 font-medium">Join Menucraft</div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Create Account</h1>
          <p className="text-base-content/70 py-6 text-base leading-relaxed">
            Set up your restaurant profile, build beautiful digital menus, and share them instantly with your customers.
          </p>
        </div>

        <div className="card border-base-300 bg-base-100 w-full max-w-md shrink-0 rounded-[2rem] border shadow-2xl">
          <div className="card-body p-4 sm:p-10">
            <h2 className="card-title mb-6 justify-center text-2xl font-bold">Sign Up</h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="form-control w-full">
                <div className="label pt-0 pb-1.5">
                  <span className="label-text font-semibold">Full Name</span>
                </div>
                <label className={`input input-bordered flex items-center gap-3 ${errors.name ? 'input-error' : ''}`}>
                  <User className="size-4 shrink-0 opacity-50" />
                  <input
                    id="name"
                    type="text"
                    className="min-w-0 grow"
                    placeholder="e.g. John Smith"
                    value={form.name}
                    onChange={handleChange('name')}
                    required
                  />
                </label>
                {errors.name && <span className="text-error mt-1 text-xs">{errors.name}</span>}
              </div>

              <div className="form-control w-full">
                <div className="label pt-0 pb-1.5">
                  <span className="label-text font-semibold">Email</span>
                </div>
                <label className={`input input-bordered flex items-center gap-3 ${errors.email ? 'input-error' : ''}`}>
                  <Mail className="size-4 shrink-0 opacity-50" />
                  <input
                    id="email"
                    type="email"
                    className="min-w-0 grow"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    required
                  />
                </label>
                {errors.email && <span className="text-error mt-1 text-xs">{errors.email}</span>}
              </div>

              <div className="form-control w-full">
                <div className="label pt-0 pb-1.5">
                  <span className="label-text font-semibold">Password</span>
                </div>
                <label
                  className={`input input-bordered flex items-center gap-3 ${errors.password ? 'input-error' : form.password && strengthScore < 4 ? 'input-warning' : ''}`}
                >
                  <Lock className="size-4 shrink-0 opacity-50" />
                  <input
                    id="new-password"
                    name="new-password"
                    autoComplete="new-password"
                    type={showPassword ? 'text' : 'password'}
                    className="min-w-0 grow"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange('password')}
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content shrink-0"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </label>
                {errors.password && <span className="text-error mt-1 text-xs">{errors.password}</span>}

                <div className="mt-3">
                  <progress
                    className={`progress h-1.5 w-full ${getProgressColor()}`}
                    value={strengthScore}
                    max="4"
                  ></progress>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-x-2 gap-y-1.5 text-[11px] sm:grid-cols-2 sm:text-xs">
                  <Requirement met={criteria.length} label="8+ Characters" />
                  <Requirement met={criteria.upper} label="Uppercase (A-Z)" />
                  <Requirement met={criteria.lower} label="Lowercase (a-z)" />
                  <Requirement met={criteria.number} label="Number (0-9)" />
                </div>
              </div>

              <div className="form-control w-full">
                <div className="label pt-2 pb-1.5">
                  <span className="label-text font-semibold">Confirm Password</span>
                </div>
                <label
                  className={`input input-bordered flex items-center gap-3 ${errors.confirm ? 'input-error' : ''}`}
                >
                  <Lock className="size-4 shrink-0 opacity-50" />
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    autoComplete="new-password"
                    type={showConfirm ? 'text' : 'password'}
                    className="min-w-0 grow"
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={handleChange('confirm')}
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-circle text-base-content/50 hover:text-base-content shrink-0"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </label>
                {errors.confirm && <span className="text-error mt-1 text-xs">{errors.confirm}</span>}
              </div>

              <div className="form-control mt-2 w-full">
                <label className="label cursor-pointer items-start justify-start gap-3 p-0">
                  <input
                    type="checkbox"
                    className={`checkbox checkbox-sm mt-1 shrink-0 ${errors.terms ? 'checkbox-error' : 'checkbox-primary'}`}
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      if (errors.terms) setErrors((prev) => ({...prev, terms: undefined}));
                    }}
                  />
                  <span className="label-text flex-1 text-xs leading-relaxed sm:text-sm">
                    I agree to the{' '}
                    <Link href="/terms" target="_blank" className="link link-primary font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" target="_blank" className="link link-primary font-medium">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.terms && <div className="text-error mt-1 ml-8 text-xs">{errors.terms}</div>}
              </div>

              <div className="bg-base-200/50 border-base-300 mt-2 flex w-full max-w-full justify-center overflow-hidden rounded-xl border py-3 shadow-sm">
                <div className="max-w-full overflow-x-auto overflow-y-hidden">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      if (errors.general === 'Please verify you are human.')
                        setErrors((prev) => ({...prev, general: undefined}));
                    }}
                    onExpire={() => {
                      setTurnstileToken(null);
                      turnstileRef.current?.reset();
                    }}
                    onError={() => setTurnstileToken(null)}
                    options={{theme: 'light', size: 'flexible'}}
                  />
                </div>
              </div>

              {errors.general && (
                <div className="alert alert-error text-error-content rounded-xl py-3 text-sm break-words shadow-sm">
                  <span>{errors.general}</span>
                </div>
              )}

              <button className="btn btn-primary mt-2 w-full shadow-sm" type="submit" disabled={submitting}>
                {submitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    Create Account <ShieldCheck className="size-4 shrink-0" />
                  </>
                )}
              </button>
            </form>

            <div className="divider text-base-content/30 my-6 text-xs font-medium">OR</div>

            <div className="text-base-content/70 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="link link-hover text-primary font-bold">
                Log in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Requirement({met, label}: {met: boolean; label: string}) {
  return (
    <div
      className={`flex items-center gap-1.5 transition-colors duration-300 ${met ? 'text-success' : 'text-base-content/40'}`}
    >
      {met ? <Check className="size-3 shrink-0" /> : <X className="size-3 shrink-0" />}
      <span className="truncate">{label}</span>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-base-200 flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }
    >
      <RegisterFormContent />
    </Suspense>
  );
}
