# Numora Admin Dashboard Prompt

## Recommended Directory Structure for React + PHP

For best maintainability and separation of concerns:

- **Frontend (React):**

  - Place all admin dashboard React components/pages in `src/components/admin/` or `src/admin/`.
  - Keep user/client-facing React code in their respective folders (`dashboard/`, `services/`, etc).
  - Share common UI components (cards, modals, charts) and CSS from `src/components/ui/` and global styles.

- **Backend (PHP):**

  - Place admin PHP scripts, controllers, and API endpoints in a separate backend folder, e.g. `backend/admin/` or `api/admin/`.
  - Share business logic, models, and utility functions with the main app backend as needed.

- **Shared Assets:**
  - CSS, fonts, icons, and utility JS/TS files should be in shared folders (`src/assets/`, `src/components/ui/`, `src/styles/`) so both client and admin can import and use them.

**Summary:**

- Keep admin React code in its own folder within `src/components/` or `src/`.
- Share UI components and styles via common folders.
- Keep PHP backend admin logic separate but share models/utilities as needed.

---

## Workspace Directory Tree (Annotated)

```
.gitignore
eslint.config.js         # ESLint config for code linting
index.html               # Main HTML entry point
package.json             # Project dependencies and scripts
postcss.config.js        # PostCSS config for CSS processing
prompt.md                # Prompts and documentation
README.md                # Project overview and instructions
tailwind.config.js       # Tailwind CSS config
todo.md                  # Project TODOs
tsconfig.app.json        # TypeScript config for app
tsconfig.json            # Main TypeScript config
tsconfig.node.json       # TypeScript config for Node
vite.config.ts           # Vite build config
.bolt/                   # Bolt AI config and prompt files
src/
  App.tsx                # Main React app entry
  index.css              # Global styles (Tailwind, fonts)
  main.tsx               # React root renderer
  vite-env.d.ts          # Vite TypeScript env types
  assets/                # Static assets (icons, fonts, images)
    favicon.png
    fonts/               # Custom font files
    icons/               # Service/network icons (MTN, Glo, etc.)
  components/
    admin/               # (To be created) Admin dashboard pages/components
    auth/                # Login, Register, Reset Password pages
    dashboard/           # User dashboard, profile completion, analytics
    layout/              # Dashboard layout, sidebar, navigation
    modals/              # Reusable modals (SetPin, FundWallet, Withdraw)
    profile/             # User profile page and modals
    services/            # Service pages (Airtime, Data, Electricity, etc.)
    transactions/        # Transactions history and filters
    ui/                  # UI widgets (charts, cards, grids)
    wallet/              # Wallet page, wallet card, funding
```

---

## Admin Dashboard Requirements

### General

- **Framework:** React (frontend), PHP (backend with XAMPP), MySQL (DB)
- **Design:** Adaptive (sidebar for desktop, premium bottom nav for mobile)
- **UI Consistency:** Use `lucide-react` icons, vector graphics for empty states
- **Charts:** Recharts for analytics, KPIs, transaction trends
- **Animations:** Loading animations before rendering content
- **Validation:** Real-time validation (e.g., network prefixes)
- **Security:** Role-based access control, audit logs for critical admin actions

---

### Admin Dashboard Core Pages

#### 1. **Dashboard (Overview)**

- KPI cards: Total Users, Active Users, Transactions Today, Revenue
- Quick navigation to critical sections
- Latest activities (logs, account lock/unlock, pricing updates)
- System health indicator (uptime, errors)

#### 2. **Analytics**

- Graphs: revenue trends, user growth, most-used services
- Transaction breakdown by service (airtime, data, bills, betting, etc.)
- Filters: date ranges, service types
- Export reports to CSV/PDF

#### 3. **Transactions**

- Full transaction list (filters: user, date, service, status)
- Transaction status management (approve, revoke, refund)
- Export feature (Excel, CSV, PDF)
- Real-time updates (websockets/polling)

#### 4. **Pricing Control**

- Manage service prices (airtime, data, electricity, education, betting)
- Toggle lock/unlock on services
- Differentiate retail and reseller pricing
- Bulk pricing updates via CSV upload

#### 5. **User Management**

- View all users (filter by active, locked, disabled)
- Lock/unlock accounts
- Disable/enable specific features (data purchase, betting, wallet funding)
- Reset user transaction PIN
- View profile setup progress for each user

#### 6. **Admin Management**

- Create new admins with role-based permissions
- Edit or revoke admin accounts
- Define roles (super-admin, finance-admin, support-admin)
- Audit logs for admin actions

#### 7. **Premium Profile Page (for Admins)**

- Admin details (name, email, role, activity logs)
- Change password, 2FA setup
- Notification preferences
- API key management (if applicable)

#### 8. **Notifications & Logs**

- Real-time notifications for critical actions (price updates, new user registrations, failed transactions)
- Activity logs for transparency
- Searchable log history

---

### Navigation

- **Sidebar (Desktop):** Persistent, collapsible menus
- **Bottom Navigation (Mobile):** Premium tabbed navigation for quick access
- **Routing:** React Router with nested routes

---

### Extra Features

- **Withdrawal Requests:** Manage and approve/reject user withdrawal requests
- **Service Toggles:** Enable/disable services dynamically
- **PWA Ready:** Mobile-first, installable as a PWA

---

### UI/UX Consistency

- Use the same modal, card, and button styles as in [`src/components/services`](src/components/services), `dashboard/`, and `profile/`
- Use `lucide-react` icons for all KPIs, actions, and navigation
- Charts should match the style of [`SpendingChart`](src/components/ui/SpendingChart.tsx) and [`TransactionChart`](src/components/ui/TransactionChart.tsx)
- Table/list layouts should match [`TransactionsPage`](src/components/transactions/TransactionsPage.tsx)
- Modals should match [`SetPinModal`](src/components/modals/SetPinModal.tsx) and [`FundWalletModal`](src/components/modals/FundWalletModal.tsx)
- Sidebar and mobile nav should match [`DashboardLayout`](src/components/layout/DashboardLayout.tsx)

---

**Use this prompt for Bolt AI to generate the admin dashboard codebase for Numora.**
