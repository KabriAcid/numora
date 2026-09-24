# Numora Transition Plan

This document is the implementation roadmap for moving Numora from the existing Vite React prototype to a modern Next.js application.

## Product Scope

- [ ] Keep the initial product focused on Airtime, Data, Education, Airtime to Cash, Wallet, Transactions, and Profile.
- [ ] Remove Betting from the user experience, admin views, transaction filters, mock data, and service definitions.
- [ ] Remove Electricity from the user experience, admin views, transaction filters, mock data, and service definitions.
- [ ] Remove Cable TV from the user experience, admin views, transaction filters, mock data, and service definitions.
- [ ] Review the remaining features and defer anything that is not required for the first usable release.
- [ ] Preserve a clean path for adding services later through configuration rather than duplicated page logic.

## Target Stack

- [ ] Migrate from Vite React to the latest stable Next.js App Router setup available when implementation begins.
- [ ] Use TypeScript throughout the application.
- [ ] Upgrade styling to Tailwind CSS v4 and remove the Tailwind v3 configuration approach.
- [ ] Keep Lucide React for icons and Framer Motion only where motion adds useful feedback.
- [ ] Use a current charting solution only where analytics require it; remove duplicate chart libraries if possible.
- [ ] Use Prisma as the database access layer and schema source of truth.
- [ ] Use Supabase PostgreSQL as the planned database platform at the persistence stage.
- [ ] Do not introduce PHP or an XAMPP-based backend. The application backend will be TypeScript/Next.js based.
- [ ] Reassess unused dependencies such as Firebase, Axios, Google OAuth, and duplicate chart packages before installation.

## Phase 1: Stabilize the Existing Product

- [ ] Confirm the current application baseline with install, lint, typecheck, and production build commands.
- [ ] Fix the package metadata and lockfile so the project consistently identifies itself as Numora.
- [ ] Define shared TypeScript types for users, services, wallets, transactions, and admin records.
- [ ] Separate mock data from UI components so it can be replaced by Prisma-backed data later.
- [ ] Identify all simulated API calls and mark them for replacement with real server actions or route handlers.
- [ ] Remove client-side storage of sensitive authentication and transaction PIN data.

## Phase 2: Next.js Migration

- [ ] Create the Next.js App Router structure with route groups for authentication, user dashboard, and admin pages.
- [ ] Move global styles, fonts, assets, and design tokens into the Next.js structure.
- [ ] Convert React Router links and navigation to Next.js `Link`, `useRouter`, and route conventions.
- [ ] Replace `App.tsx` route and auth orchestration with layouts, loading states, error states, and route protection.
- [ ] Mark interactive components with `use client` only where browser state or event handlers are required.
- [ ] Preserve the existing dashboard and admin visual language while improving component boundaries.
- [ ] Add metadata, favicon, not-found handling, and a consistent root layout.

## Phase 3: Responsive UX

- [ ] Make mobile the primary responsive constraint across authentication, dashboard, services, wallet, transactions, and admin screens.
- [ ] Stack the register first-name and last-name fields on small screens and use a two-column layout from the appropriate breakpoint upward.
- [ ] Test navigation, bottom bars, sidebars, modals, charts, tables, and forms at phone, tablet, and desktop widths.
- [ ] Prevent horizontal overflow and ensure every form control and action remains usable with touch input.
- [ ] Add accessible labels, keyboard states, focus states, error announcements, and sufficient color contrast.
- [ ] Add loading, empty, error, and success states for every primary workflow.

## Phase 4: Application Architecture

- [ ] Create `app/`, `components/`, `lib/`, `prisma/`, and `types/` directories with clear ownership boundaries.
- [ ] Add a typed validation layer for authentication, profile updates, wallet actions, and service purchases.
- [ ] Create shared service definitions so supported products drive navigation, forms, pricing, and transaction labels.
- [ ] Establish server actions or route handlers for mutations and server-side data access.
- [ ] Add a consistent error model and user-safe error messages.
- [ ] Keep admin functionality separate from user functionality with explicit role checks.

## Phase 5: Prisma and Supabase PostgreSQL

- [ ] Design the relational model for users, roles, sessions, wallets, services, providers, plans, transactions, notifications, and audit logs.
- [ ] Remove or revise legacy schema entities for discontinued services before creating the Prisma schema.
- [ ] Configure Prisma for Supabase PostgreSQL using environment variables and separate development/test/production settings.
- [ ] Add migrations, seed data, and a documented local development workflow.
- [ ] Use database transactions for wallet balance changes, purchases, refunds, and reversals.
- [ ] Add unique constraints, indexes, foreign keys, and status transitions for financial records.
- [ ] Never expose database credentials or privileged service keys to the browser.
- [ ] Decide whether Supabase Auth will be used or whether authentication will be implemented in the Next.js application while Supabase remains the database platform.

## Phase 6: Authentication and Security

- [ ] Replace `localStorage` auth with secure HTTP-only, SameSite-aware session cookies.
- [ ] Implement registration, login, logout, password reset, session expiry, and role-based authorization.
- [ ] Hash passwords and transaction PINs with a current password hashing algorithm; never store plaintext secrets.
- [ ] Verify Google OAuth tokens on the server if Google sign-in remains in scope.
- [ ] Protect admin routes and mutations on the server, not only through client-side redirects.
- [ ] Add rate limiting, input validation, CSRF protection where applicable, and audit logging for sensitive actions.
- [ ] Do not store access tokens, OAuth credentials, or transaction PINs in client storage.

## Phase 7: Core Workflows

- [ ] Implement user registration and onboarding.
- [ ] Implement wallet funding and balance display.
- [ ] Implement Airtime purchase flow with validation, confirmation, processing, and transaction status.
- [ ] Implement Data purchase flow with provider and plan selection.
- [ ] Implement Education payment flow.
- [ ] Implement Airtime to Cash flow with clear fees, status, and settlement states.
- [ ] Implement transaction history with pagination, filtering, and detail views.
- [ ] Implement profile, password, and transaction PIN management.
- [ ] Implement admin dashboard, pricing controls, user management, and transaction management against real data.

## Phase 8: Testing and Delivery

- [ ] Add unit tests for validation, pricing, wallet calculations, permissions, and transaction state transitions.
- [ ] Add integration tests for authentication, Prisma data access, wallet mutations, and service purchases.
- [ ] Add end-to-end tests for registration, login, funding, purchase, logout, and key admin flows.
- [ ] Run lint, typecheck, test, and production build checks in CI.
- [ ] Add environment variable documentation without committing secrets.
- [ ] Configure deployment for Next.js and Supabase PostgreSQL.
- [ ] Add monitoring, error reporting, database backups, and a rollback procedure before launch.

## Deferred Features

- [ ] Betting, Electricity, and Cable TV services.
- [ ] Rewards, tasks, ads, and referral monetization until the core transaction flows are stable.
- [ ] Firebase integrations and push notifications.
- [ ] Mobile app wrapper or native application.
- [ ] Additional bill-payment providers and service categories.
