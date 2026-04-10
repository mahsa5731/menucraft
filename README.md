# Menucraft

Menucraft is a full-stack digital menu builder for restaurants. It allows restaurant owners to create a professional public menu page, manage menu sections and dishes from a dashboard, and share their menu through a unique QR-ready link.

This project was built as a portfolio-grade, production-style application to demonstrate practical engineering skills across frontend, backend, authentication, data modeling, API security, and UI/UX.

## Live demo

- Production app: https://menucraft-two.vercel.app/

## Why this project is resume-ready

- Solves a real-world problem with clear business value.
- Uses modern stack choices and production patterns (Next.js App Router, Firebase Admin, role/permission model, schema validation).
- Includes secure auth workflow with bot protection and session synchronization.
- Demonstrates strong UX details: responsive design, reusable component architecture, toasts/modals, theme support, and smooth dashboard flow.

## Core features

- Authentication: Register, login, logout, forgot password.
- Security: Cloudflare Turnstile on auth endpoints, secure session cookie sync, server token verification.
- Restaurant profile management: Name, phone, address, cover image.
- Menu builder: Dynamic sections and dishes with validation.
- Public menu page: Read-only customer-facing menu rendered by menu ID.
- QR sharing: Dashboard-generated menu URL and QR code.
- Role-aware navigation: Permission mapping for user/admin capability control.


## Tech stack

- Framework: Next.js 16 (App Router), React 19, TypeScript
- Styling: Tailwind CSS v4, DaisyUI
- Backend/data: Firebase Admin SDK, Firestore, Firebase Storage
- Authentication: Firebase Auth + custom token flow
- Bot protection: Cloudflare Turnstile
- Data fetching and caching: TanStack Query
- Forms and validation: React Hook Form + Zod
- HTTP client: Axios with auth interceptors

## Architecture overview

### Frontend

- App Router pages live under `src/app`.
- Shared UI and feature components live under `src/components`.
- App-level providers (auth, query, toast, modal, theme) are mounted in `src/app/layout.tsx`.
- Dashboard routes are protected by `src/components/auth/ProtectedRoute.tsx`.

### Backend (inside Next.js route handlers)

- API endpoints are implemented in `src/app/api/**/route.ts`.
- Sensitive operations use Firebase Admin via `src/libs/firebaseAdmin.ts`.
- Protected endpoints use `withAuth` middleware helper in `src/libs/server-api.ts`.

### Data flow

1. User authenticates via `/api/auth/login` or `/api/auth/register`.
2. Server returns Firebase custom token.
3. Client signs in with Firebase SDK and gets ID token.
4. Client syncs ID token to an HTTP-only session cookie via `/api/auth/session`.
5. API calls include Bearer token through Axios interceptor in `src/libs/api-client.ts`.
6. Server verifies token and role (when required) before data access.

## API endpoints

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register user, set custom role claim, return custom token |
| `POST` | `/api/auth/login` | Verify credentials via Firebase Identity Toolkit, return custom token |
| `POST` | `/api/auth/forgot-password` | Trigger password reset email flow |
| `POST` | `/api/auth/session` | Store token in HTTP-only cookie |
| `DELETE` | `/api/auth/session` | Clear session cookie |
| `GET` | `/api/profile` | Get authenticated user restaurant profile + menu |
| `POST` | `/api/profile` | Save authenticated user restaurant profile + menu |
| `DELETE` | `/api/account` | Delete authenticated user account + profile data |
| `GET` | `/api/public/menu/[id]` | Fetch public menu by user/menu owner ID |

## Full project file map

The repository includes configuration, source, and quality tooling files. Main structure:

```text
menucraft/
	.env
	.gitignore
	.husky/
		pre-commit
		pre-push
	.prettierignore
	.prettierrc
	eslint.config.mjs
	next-env.d.ts
	next.config.ts
	package.json
	package-lock.json
	postcss.config.mjs
	README.md
	tsconfig.json
	src/
		app/
			globals.css
			icon.png
			layout.tsx
			page.tsx
			dashboard/
				page.tsx
				account/page.tsx
				menus/page.tsx
				restaurant/page.tsx
			forgot-password/page.tsx
			login/page.tsx
			register/page.tsx
			menu/[id]/
				page.tsx
				not-found.tsx
			api/
				account/route.ts
				auth/
					forgot-password/route.ts
					login/route.ts
					register/route.ts
					session/route.ts
				profile/route.ts
				public/menu/[id]/route.ts
		components/
			account/
				AccountOverview.tsx
				DeleteAccountCard.tsx
				PasswordResetCard.tsx
			auth/
				ProtectedRoute.tsx
			dashboard/
				PublicMenuCard.tsx
				QuickActions.tsx
			home/
				AboutProjectSection.tsx
				FeatureSection.tsx
				HeroSection.tsx
				TechStackSection.tsx
			layout/
				ClientLayoutWrapper.tsx
				Footer.tsx
				Header.tsx
				Sidebar.tsx
				ThemeToggle.tsx
			menu-builder/
				DishEditor.tsx
				MenuBuilderForm.tsx
				SectionEditor.tsx
			profile/
				ProfileForm.tsx
				ProfileImageUpload.tsx
				ProfilePreview.tsx
			providers/
				ThemeProvider.tsx
			ui/
				GlobalModal.tsx
				ToastContainer.tsx
		context/
			AuthContext.tsx
			ModalContext.tsx
			QueryProvider.tsx
			ToastContext.tsx
		hooks/
			useAccount.ts
			useRestaurantProfile.ts
		libs/
			api-client.ts
			firebaseAdmin.ts
			firebaseConfig.ts
			restaurantProfile.ts
			server-api.ts
		types/
			roles.ts
			schema.ts
```

## Environment variables

Create `.env` in the project root and define:

```env
# Firebase client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin SDK
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

```

## Local development

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env`.

3. Run development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Available scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production build
- `npm run lint` - run ESLint
- `npm run format` - run Prettier on JS/TS files

## Security and quality notes

- Route protection uses Firebase ID token verification on server-side handlers.
- Bot mitigation is applied to registration, login, and forgot-password flows.
- Payload validation uses shared Zod schemas to reduce invalid writes.
- Query caching and invalidation reduce unnecessary network traffic.
- Husky hooks are configured for pre-commit/pre-push quality gates.

## Portfolio talking points for recruiters

- Built a complete product loop: onboarding, dashboard operations, and public customer-facing experience.
- Designed reusable, maintainable architecture with clear separation of UI, data, and API concerns.
- Implemented secure auth/session synchronization strategy in a hybrid server/client environment.
- Applied modern React patterns (context providers, custom hooks, schema-driven forms, and optimistic UX patterns).

## Author

Mahsa

- Website: https://bymahsa.com
- GitHub: https://github.com/mahsa5731/menucraft
