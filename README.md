# Numora Web Application

Numora is a **Virtual Top-Up (VTU) platform** designed to offer the cheapest data and airtime bundles (at near reseller prices, \~1% profit margin), while monetizing through **ads, tasks, and referral rewards**. The application provides a **modern React frontend**, a **PHP backend with MySQL**, and a secure, scalable architecture.

---

## 🚀 Features

### **For Users**

* Secure **registration & login** (JWT-based authentication)
* **Wallet system** with:

  * Cash balance (funding, airtime/data purchases)
  * Reward balance (earned via ads, tasks, referrals)
* **Services supported:**

  * Airtime top-up (MTN, Airtel, Glo, 9Mobile)
  * Data bundles
  * TV subscriptions (DSTV, GOTV, Startimes)
  * Electricity & bills (extensible)
* **Transaction history** with filtering
* **Tasks & Rewards:**

  * Watch ads
  * Complete surveys
  * App installs
  * Referral bonuses
* **Profile & Settings:**

  * Update personal info
  * Manage PIN & password
  * Enable biometrics, hide balance

### **For Admins**

* **Admin dashboard** with KPIs & charts (user growth, service usage, revenue)
* **Manage services & pricing** (bulk updates)
* **User management** (lock/unlock, reset PINs, manage referrals)
* **Transaction management** (approve/revoke/refund)
* **Task management** (create/edit ad campaigns & user tasks)
* **System settings** (app-wide configurations)
* **Audit logs** for accountability

---

## 🛠 Tech Stack

### **Frontend (React + TypeScript)**

* React + TypeScript
* Tailwind CSS (custom color palette, Ginto font)
* Framer Motion (animations)
* Recharts (charts & analytics)
* Axios (API requests)
* React Router (routing)
* LocalStorage tokens (auth)

### **Backend (PHP + MySQL)**

* PHP (via XAMPP)
* MySQL database with:

  * **Referential integrity** & cascading rules
  * Normalized schema
  * Task & rewards integration
* JWT authentication (access + refresh tokens)
* RESTful JSON APIs for frontend consumption

### **Future Integrations**

* Firebase (real-time database, push notifications)
* Payment gateways (Paystack, Flutterwave)
* Ads SDKs (Google AdMob, Facebook Audience Network)

---

## 📂 Directory Structure

```bash
src/
  App.tsx                  # Main app entry, routing & auth
  index.css                # Global styles
  assets/                  # Fonts, icons, images
  components/
    auth/                  # Login, Register, ResetPassword
    dashboard/             # User dashboard, analytics
    admin/                 # Admin dashboard, analytics, users
    layout/                # Shared layouts, sidebar, nav
    modals/                # Reusable modals (FundWallet, Withdraw)
    profile/               # User profile pages
    services/              # Airtime, Data, TV, Electricity, Education
    transactions/          # History & filters
    ui/                    # UI widgets (charts, cards, grids)
    wallet/                # Wallet & funding
```

---

## 🗄 Database Schema (Highlights)

### **Core Entities**

* `users` – user accounts
* `wallets` – cash & reward balances
* `auth_tokens` – refresh tokens for JWT
* `reset_tokens` – password/PIN resets

### **Services & Providers**

* `service_categories` – Airtime, Data, TV, Bills
* `services` – sub-services (e.g., Airtime Top-up)
* `service_providers` – MTN, Airtel, DSTV
* `service_plans` – MTN 1GB Daily, Airtel 2GB Weekly, etc.

### **Transactions & Logs**

* `transactions` – user purchases & wallet funding
* `logs` – activity logs (actions, IPs, user agents)
* `notifications` – system/user alerts

### **Monetization**

* `tasks` – ads, surveys, installs
* `task_submissions` – user proofs & statuses
* `referral_rewards` – referral earnings

### **Admin & System**

* `support_tickets` – user support
* `app_settings` – configurable app settings

---

## 🌱 Seed Data

### **Users**

* **Admin:** `admin@numora.com` / `Admin@123`
* **Demo User:** `musa@example.com` / `User@123`

### **Wallets**

* Admin: ₦100,000
* Demo User: ₦500 cash, ₦50 reward

### **Services**

* Airtime (MTN, Airtel)
* Data (MTN 1GB Daily, Airtel 2GB Weekly)
* TV (DSTV Premium)

### **Tasks**

* Watch ad video → ₦20 reward
* Install XYZ app → ₦50 reward

### **Referral Example**

* Demo user referred Admin → ₦100 reward

---

## 🔒 Security

* Passwords hashed with SHA2 (or bcrypt in production)
* JWT authentication (access & refresh tokens)
* Input validation & sanitization
* Foreign keys with `ON DELETE CASCADE` & `ON UPDATE CASCADE`
* Role-based access control (user, admin, superadmin)

---

## ▶️ Running Locally

### **Backend (XAMPP)**

1. Import `numora_db.sql` into phpMyAdmin.
2. Start Apache & MySQL in XAMPP.
3. Place backend PHP files in `htdocs/numora-backend/`.

### **Frontend (React)**

```bash
git clone <repo-url>
cd numora-frontend
npm install
npm run dev
```

Access:

* User Dashboard → `http://localhost:3000/dashboard`
* Admin Dashboard → `http://localhost:3000/admin`

---

## 📈 Business Model

* **Cheapest Data Strategy:** Sell data at reseller rates with minimal markup.
* **Revenue Streams:**

  * Ads (video, banners)
  * YouTube video links.
  * User tasks (sponsored installs, surveys)
  * Referral system
* **Long-term:** Expand into bill payments, micro-loans, and value-added services.

---

## ✅ Roadmap

* [x] Core schema & seed data
* [x] Wallets & transactions
* [x] Tasks & rewards
* [ ] Integrate JWT authentication
* [ ] Firebase push notifications
* [ ] Ads SDK integration
* [ ] Launch mobile app wrapper

---

**Summary:** Numora is more than just a VTU platform — it’s a **fintech-inspired ecosystem** combining **cheap data sales, gamified rewards, and ads-based revenue**. With scalability and security at its core, Numora is built for long-term growth.
