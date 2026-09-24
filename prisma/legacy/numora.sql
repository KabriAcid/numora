-- ===============================
-- CORE ENTITIES
-- ===============================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    pin_code VARCHAR(10),
    role ENUM('user','admin','superadmin','support') DEFAULT 'user',
    status ENUM('active','inactive','suspended') DEFAULT 'active',
    photo VARCHAR(255) DEFAULT 'uploads/default.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE service_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- ===============================
-- SERVICES & PROVIDERS
-- ===============================
CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES service_categories(category_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE service_providers (
    provider_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    type ENUM('network','tv','electricity','bills','other') NOT NULL,
    brand_color VARCHAR(20) DEFAULT '#94241e',
    icon VARCHAR(255) DEFAULT 'default-brand.svg',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(service_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE service_plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    provider_id INT NOT NULL,
    variation_code VARCHAR(100) NOT NULL,
    plan_name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    base_price DECIMAL(15,2),
    volume VARCHAR(20),
    reseller_price DECIMAL(15,2) DEFAULT 0.00,
    type ENUM('daily','weekly','monthly','tv','bulk','other') DEFAULT 'other',
    validity VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(service_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ===============================
-- USER-RELATED SETTINGS & AUTH
-- ===============================
CREATE TABLE user_settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    biometrics_enabled BOOLEAN DEFAULT FALSE,
    hide_balance BOOLEAN DEFAULT FALSE,
    session_expiry_enabled BOOLEAN DEFAULT FALSE,
    account_locked BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE reset_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_type ENUM('password','pin','account') NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE auth_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ===============================
-- WALLET & TRANSACTIONS
-- ===============================
CREATE TABLE wallets (
    wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cash_balance DECIMAL(15,2) DEFAULT 0.00,
    reward_balance DECIMAL(15,2) DEFAULT 0.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE transactions (
    transaction_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    provider_id INT,
    variation_code VARCHAR(100),
    direction ENUM('credit','debit') NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    reference VARCHAR(100) UNIQUE NOT NULL,
    status ENUM('pending','success','failed','reversed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ===============================
-- LOGS & NOTIFICATIONS
-- ===============================
CREATE TABLE logs (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action_type VARCHAR(50) NOT NULL,
    action_description TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type ENUM('system','user','security','default') DEFAULT 'default',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ===============================
-- SUPPORT & REFERRALS
-- ===============================
CREATE TABLE support_tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('open','in_progress','resolved','closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE referral_rewards (
    reward_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    referred_user_id INT NOT NULL,
    reward_amount DECIMAL(15,2) NOT NULL,
    status ENUM('claimed','pending') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (referred_user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ===============================
-- TASKS & REWARDS SYSTEM
-- ===============================
CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    reward_amount DECIMAL(15,2) NOT NULL,
    type ENUM('ad','survey','app_install','referral','other') DEFAULT 'other',
    status ENUM('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE task_submissions (
    submission_id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    proof TEXT,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ===============================
-- APP SETTINGS
-- ===============================
CREATE TABLE app_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value VARCHAR(255) NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
