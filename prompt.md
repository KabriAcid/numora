# Numora Admin Dashboard Prompt

## General Requirements

- **Framework**: React (frontend), PHP (backend with XAMPP), MySQL (DB).
- **Design**: Adaptive design (sidebar for desktop, premium bottom nav for mobile).
- **UI Consistency**: Use `lucide-react` icons for KPI cards, vector graphics for empty states.
- **Charts**: Recharts for analytics, transaction trends, and KPIs.
- **Animations**: Loading animations on each page before rendering content.
- **Validation**: Real-time validation (e.g., network prefixes).
- **Security**: Role-based access control, audit logs for critical admin actions.

---

## Admin Dashboard Core Pages

### 1. **Dashboard (Overview)**

- KPI cards (Total Users, Active Users, Transactions Today, Revenue).
- Quick navigation to critical sections.
- Latest activities (logs, account lock/unlock, pricing updates).
- System health indicator (uptime, errors).

### 2. **Analytics**

- Graphs showing revenue trends, user growth, most-used services.
- Transaction breakdown by service (airtime, data, bills, betting, etc.).
- Filters for date ranges, service types.
- Export reports to CSV/PDF.

### 3. **Transactions**

- Full transaction list (with filters: by user, date, service, status).
- Transaction status management (approve, revoke, refund).
- Export feature (Excel, CSV, PDF).
- Real-time updates with websockets/polling.

### 4. **Pricing Control**

- Manage service prices (airtime, data, electricity, education payments, betting).
- Toggle lock/unlock on services.
- Differentiate retail and reseller pricing.
- Bulk pricing updates via CSV upload.

### 5. **User Management**

- View all users (filter by active, locked, disabled).
- Lock/unlock accounts.
- Disable/enable specific features (data purchase, betting, wallet funding).
- Reset user transaction PIN.
- View profile setup progress for each user.

### 6. **Admin Management**

- Create new admins with role-based permissions.
- Edit or revoke admin accounts.
- Define roles (super-admin, finance-admin, support-admin).
- Audit logs for admin actions.

### 7. **Premium Profile Page (for Admins)**

- Admin details (name, email, role, activity logs).
- Change password, 2FA setup.
- Notification preferences.
- API key management (if applicable).

### 8. **Notifications & Logs**

- Real-time notifications for critical actions (price updates, new user registrations, failed transactions).
- Activity logs for transparency.
- Searchable log history.

---

## Navigation

- **Sidebar (Desktop)**: Persistent with collapsible menus.
- **Bottom Navigation (Mobile)**: Premium tabbed navigation for quick access.
- **Routing**: React Router with nested routes.

---

## Extra Features

- **Withdrawal Requests**: Manage and approve/reject user withdrawal requests.
- **Service Toggles**: Enable/disable services dynamically.
- **PWA Ready**: Web app with mobile-first feel, installable as a PWA.
