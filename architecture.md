# Numora Architecture Guide

This document defines the architectural standards for the Next.js migration and future feature work. The existing React/Vite code is migration material, not the target architecture.

This revision hardens the original guide with explicit input validation, sanitization, security, financial-integrity, error-handling, testing, and observability rules so the system is safe by default, not just organized by default.

## Core Principles

- Prefer server rendering and server data access by default.
- Keep client-side JavaScript limited to components that need browser APIs, local state, event handlers, or client navigation.
- Keep financial operations, authentication, authorization, and database access on the server.
- Use strict TypeScript types across every module.
- Keep UI, domain logic, validation, and data access separate.
- Build for extension through typed configuration and shared abstractions rather than duplicated page logic.
- Treat every input from a client, webhook, or third-party provider as untrusted until it has been validated and, where it will be rendered or stored, sanitized.
- Fail closed: on any unexpected error, return a safe generic response and log the detail server-side rather than leaking internals.
- Every operation that changes a wallet balance or transaction record must be atomic and idempotent.

## Server-First App Router

- Every `page.tsx` is a Server Component by default.
- Every `layout.tsx` is a Server Component by default.
- Do not add `"use client"` to route files unless there is a documented, unavoidable reason.
- A page should compose server data and UI components; it should not contain a large form or presentation implementation.
- Add `"use client"` only to the smallest component that requires interactivity.
- Client components receive serializable props from their server parents.
- Use Server Actions or Route Handlers for mutations and server-side operations.
- Use `useRouter`, `usePathname`, and other Next navigation APIs only inside client components.
- Route Handlers that receive webhooks or third-party callbacks (payment providers, airtime/data vendors) must verify the request's authenticity (signature, shared secret, or IP allowlist) before any processing, and must respond quickly, deferring heavy work to a background job.

## Directory Ownership

```text
src/
  app/
    (auth)/
      layout.tsx
      login/page.tsx
      register/page.tsx
      reset-password/page.tsx
    (user)/
      layout.tsx
      dashboard/page.tsx
      airtime/page.tsx
      data/page.tsx
      education/page.tsx
      airtime-to-cash/page.tsx
      wallet/page.tsx
      transactions/page.tsx
      profile/page.tsx
    admin/
      layout.tsx
      login/page.tsx
      page.tsx
      analytics/page.tsx
      pricing/page.tsx
      users/page.tsx
      transactions/page.tsx
      profile/page.tsx
    api/
      webhooks/
        [provider]/route.ts

  components/
    user/
      layout/
      dashboard/
      services/
      wallet/
      transactions/
      profile/
    admin/
      layout/
      dashboard/
      analytics/
      pricing/
      users/
      transactions/
      profile/
    shared/
      ui/
      forms/
      feedback/
      navigation/

  lib/
    auth/
    db/
    services/
    validations/
    permissions/
    security/
    errors/
    logging/
    env.ts
    utils/

  types/
    auth.ts
    user.ts
    admin.ts
    wallet.ts
    transaction.ts
    service.ts
    api.ts
    errors.ts

  middleware.ts

prisma/
public/
```

### Route Files

Route files belong in `src/app/`. They define URL structure, metadata, server-side composition, and loading/error boundaries. They should not become general-purpose component directories.

### UI Components

All reusable UI belongs in `src/components/`. Separate user, admin, and shared components. A component should have one clear responsibility and a typed props interface.

### Library Modules

Business logic, database access, authorization, service integrations, validation schemas, and utility functions belong in `src/lib/`. These modules must not import browser-only APIs unless explicitly isolated for client use.

- `lib/validations/` is the single source of truth for the shape and constraints of every external input. Do not duplicate ad hoc checks inside components, Server Actions, or Route Handlers.
- `lib/security/` holds sanitizers, rate-limit helpers, and CSRF/webhook-verification utilities.
- `lib/errors/` holds typed domain errors and the mapping from domain errors to safe client-facing responses.
- `lib/logging/` holds the structured logger and the audit-log writer.
- `lib/env.ts` parses and validates `process.env` at startup against a schema; the app must fail to start if required config is missing or malformed.

### Types

Shared domain types belong in `src/types/`. Prefer named types or interfaces for users, roles, wallets, transactions, services, API results, and form contracts. Avoid repeating object shapes across components. Every Zod schema in `lib/validations/` exports its inferred type via `z.infer`; do not hand-write a parallel interface that can drift from the schema.

## User and Admin Separation

- User and admin routes must have separate layouts.
- User and admin navigation components must be separate.
- User and admin permissions must be checked on the server.
- Admin UI must not rely on client-side redirects as its security boundary.
- Shared primitives may live under `components/shared`, but user-specific and admin-specific workflows must remain distinct.
- Admin login, and any admin action that approves, reverses, or adjusts a financial record, must be rate-limited and written to the audit trail.

## TypeScript Standards

- Use strict TypeScript settings.
- Do not use `any`; define a type, use `unknown`, or narrow the value safely.
- Type component props explicitly.
- Type Server Action inputs and outputs.
- Type API responses and error results.
- Use discriminated unions for transaction states, roles, service categories, and result states where appropriate.
- Validate external input at runtime with Zod before using it in business logic.

## File Size and Componentization

- Keep source files at or below 200 lines whenever practical.
- Extract meaningful sections into components instead of splitting code mechanically.
- Extract forms, tables, charts, modals, navigation, cards, and complex sections into focused files.
- Keep business rules out of large JSX blocks.
- Keep route files thin and readable.
- A file exceeding 200 lines should trigger a review to determine whether it has more than one responsibility.

## State and Data Rules

- Do not store authentication tokens, transaction PINs, OTPs, or financial state in `localStorage`, `sessionStorage`, or any client-readable storage.
- Use secure, HTTP-only, `SameSite`-protected session cookies for authentication.
- Keep server state on the server and pass only the data required by the UI.
- Use client state only for transient interaction state such as open modals, field values, and selected tabs.
- Use database transactions for wallet changes, purchases, refunds, and reversals.
- Keep mock data in dedicated typed modules until real Prisma-backed data replaces it.
- Never log PINs, OTPs, passwords, full card/account numbers, or session tokens, even at debug level.

## Service Modularity

The initial service set is Airtime, Data, Education, Airtime to Cash, Wallet, Transactions, and Profile.

- Define supported services through typed configuration.
- Do not duplicate provider, pricing, validation, and transaction-label logic across pages.
- Betting, Electricity, and Cable TV remain deferred and must not be added to the initial user or admin workflows.
- New services should add a domain module and configuration rather than bypassing existing boundaries.

## Input Validation and Sanitization

- Every Server Action and Route Handler defines a Zod schema for its input and parses it before touching business logic; reject anything that doesn't parse with a structured, generic validation error.
- Never trust a client-supplied price, discount, fee, or wallet amount. Recompute or re-validate it server-side against the source-of-truth service configuration before executing a purchase or transfer.
- Validate and normalize domain-specific formats before use or before calling a downstream provider: phone numbers, network/provider codes, meter numbers, account numbers, and email addresses.
- Enforce explicit max lengths on all free-text fields (names, support messages, notes) to bound storage size and rendering cost.
- Sanitize any user-supplied text before it is rendered as HTML (e.g., with a library such as DOMPurify); never pass unsanitized input to `dangerouslySetInnerHTML`.
- Use the Prisma query builder or fully parameterized raw queries only — never build a query by concatenating user input into a string.
- Validate file uploads (if introduced) by type, size, and content — not by filename or client-reported MIME type alone.
- Reject unknown/extra fields on strict-parsed schemas rather than silently dropping or coercing them.

## Security Requirements

- Set strict security headers on every response — Content-Security-Policy, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Strict-Transport-Security`, and a frame-ancestors/X-Frame-Options policy — via `middleware.ts` or `next.config`.
- Server Actions get Next.js's built-in origin checks; any Route Handler that mutates state on behalf of a browser session must additionally verify the request origin/referer or a CSRF token.
- Rate-limit authentication, OTP/PIN verification, password reset, and every financial mutation endpoint, per-IP and per-account, to slow brute-force and abuse.
- Hash transaction PINs and passwords with a strong, salted algorithm (argon2 or bcrypt); never store, log, or return them in plaintext.
- Verify webhook signatures from payment, airtime, and data providers before processing; treat any unverified or malformed webhook as untrusted and discard it.
- Keep all secrets (API keys, provider credentials, session/signing secrets) in environment variables validated through `lib/env.ts`; never commit them or hard-code them in source.
- Apply least privilege to admin accounts, service accounts, and API keys — scope each credential to only what it needs.
- Log security-relevant events (failed logins, PIN lockouts, admin actions, permission denials) to an append-only audit trail that ordinary application code cannot edit or delete.

## Financial Integrity and Idempotency

- Store every monetary value as an integer in the smallest currency unit (kobo), never as a floating-point number.
- Every wallet-affecting operation (top-up, purchase, refund, reversal) runs inside a database transaction and accepts an idempotency key, so a retried or duplicated request cannot double-charge or double-credit a wallet.
- Treat the transaction ledger as the source of truth; the cached wallet balance is a derived value that must reconcile against it.
- When a call to a downstream provider can succeed while our own write fails (or vice versa), record the attempt and resolve it through a reconciliation/retry job — never leave it as a silent, unresolved fire-and-forget call.
- Any manual balance adjustment by an admin must be justified with a reason, tied to an admin identity, and written to the audit trail.

## Error Handling and Logging

- Never return a raw exception message, stack trace, or database error to the client; map every error to a safe, user-facing message with a stable error code.
- Centralize error handling through typed domain errors (in `lib/errors/`) caught at a single boundary per Server Action or Route Handler, rather than ad hoc try/catch scattered through UI code.
- Log full error detail server-side — with a request/correlation ID and relevant non-sensitive context — through the structured logger in `lib/logging/`, not `console.log`.
- Add an `error.tsx` boundary per route segment so an unhandled error degrades that segment instead of crashing the app.

## Testing Standards

- Unit-test all business logic and validation schemas in `lib/`.
- Integration-test every Server Action and Route Handler that touches the wallet, a transaction, or authentication.
- Cover critical paths — login, PIN verification, airtime/data purchase, wallet top-up, refund/reversal — with at least smoke-level end-to-end tests.
- Treat passing tests as a required, non-optional part of the Definition of Done and CI, not an afterthought.

## Observability and Auditing

- Emit structured logs for every financial mutation and admin action, tagged with a correlation/request ID that ties client request, server processing, and downstream provider call together.
- Add basic error-rate and uptime monitoring for API routes and Server Actions so failures surface before users report them.
- Keep the audit trail queryable by admins but not writable by ordinary application paths.

## Environment and Dependency Management

- Parse and validate all required environment variables at startup with a schema (`lib/env.ts`); fail fast on missing or malformed config instead of failing later mid-request.
- Pin dependency versions and run automated vulnerability scanning (`npm audit`, Dependabot, or equivalent) in CI.
- Separate environment configuration (and secrets) cleanly between development, staging, and production; production secrets must never be reachable from a lower environment.

## Migration Sequence

1. Establish strict Next.js, TypeScript, Tailwind v4, ESLint, and Prisma configuration, plus a runtime-validated environment schema.
2. Define shared domain types and remove unsafe `any` usage.
3. Create separate user and admin layouts.
4. Convert route files into thin Server Components.
5. Extract interactive forms and controls into focused Client Components.
6. Replace React Router with Next.js navigation inside client components only.
7. Move mock data into typed modules.
8. Add Zod validation schemas for every Server Action and Route Handler input, and sanitize any user-supplied content before it is rendered or persisted.
9. Introduce Prisma repositories and database transactions, including idempotency keys for every wallet-affecting operation.
10. Replace simulated authentication with secure server sessions, hashed PINs/passwords, and rate-limited login/OTP endpoints.
11. Add security headers, CSRF protection for non-Server-Action mutations, and signature verification for all provider webhooks.
12. Add structured logging, an append-only audit trail for financial and admin actions, and centralized typed error handling.
13. Add automated checks for type safety, file size, linting, tests, dependency vulnerabilities, and build health.

## Definition of Done

A feature is complete when:

- Its route remains server-first.
- Interactive behavior is isolated in the smallest necessary Client Component.
- User and admin ownership is clear.
- Props, domain data, validation, and mutation results are typed.
- All external input is validated with Zod and, where rendered, sanitized.
- Any financial mutation is wrapped in a database transaction and is idempotent.
- No secret, PIN, password, or stack trace is exposed to the client or written to logs.
- Errors are caught by a typed boundary and return safe, coded responses to the client.
- Relevant unit and/or integration tests exist and pass for new business logic.
- Security headers and rate limiting cover any new public or authentication endpoint.
- No source file unnecessarily exceeds 200 lines.
- Loading, error, empty, success, and mobile states are handled.
- Authentication and authorization are enforced server-side.
- Lint, typecheck, tests, and production build pass.