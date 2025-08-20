import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Key,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Bell,
  Settings,
  Lock
} from 'lucide-react';

const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock admin data - replace with actual data from localStorage or API
  const [adminData, setAdminData] = useState({
    id: 1,
    name: 'Admin User',
    email: 'admin@vtu.com',
    phone: '+234 800 123 4567',
    role: 'Super Admin',
    created_at: '2023-12-01',
    last_login: '2024-01-20 14:30:00',
    permissions: ['users', 'transactions', 'pricing', 'analytics', 'settings']
  });

  const [editForm, setEditForm] = useState({
    name: adminData.name,
    email: adminData.email,
    phone: adminData.phone
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [notifications, setNotifications] = useState({
    email_notifications: true,
    sms_notifications: false,
    transaction_alerts: true,
    security_alerts: true,
    weekly_reports: true
  });

  const handleSaveProfile = () => {
    setAdminData(prev => ({
      ...prev,
      ...editForm
    }));
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: adminData.name,
      email: adminData.email,
      phone: adminData.phone
    });
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      alert('New passwords do not match');
      return;
    }
    // Here you would typically make an API call to change the password
    console.log('Password change requested');
    setShowPasswordModal(false);
    setPasswordForm({
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
    // Here you would typically make an API call to update notification preferences
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-ginto font-bold text-neutral-900">Admin Profile</h1>
          <p className="text-neutral-600 mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-ginto font-semibold text-neutral-900">Basic Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-success-600 text-white rounded-xl hover:bg-success-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">{adminData.name}</h4>
                  <p className="text-neutral-600">{adminData.role}</p>
                  <button className="text-sm text-primary-600 hover:text-primary-700 mt-1">
                    Change Photo
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="premium-input"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-neutral-50 rounded-xl">
                      <User className="w-5 h-5 text-neutral-400" />
                      <span className="text-neutral-900">{adminData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="premium-input"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-neutral-50 rounded-xl">
                      <Mail className="w-5 h-5 text-neutral-400" />
                      <span className="text-neutral-900">{adminData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="premium-input"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-neutral-50 rounded-xl">
                      <Phone className="w-5 h-5 text-neutral-400" />
                      <span className="text-neutral-900">{adminData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Role
                  </label>
                  <div className="flex items-center space-x-2 p-3 bg-neutral-50 rounded-xl">
                    <Shield className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-900">{adminData.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6"
          >
            <h3 className="text-lg font-ginto font-semibold text-neutral-900 mb-6">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-neutral-600" />
                  <div>
                    <p className="font-medium text-neutral-900">Password</p>
                    <p className="text-sm text-neutral-600">Last changed 30 days ago</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                >
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Key className="w-5 h-5 text-neutral-600" />
                  <div>
                    <p className="font-medium text-neutral-900">Two-Factor Authentication</p>
                    <p className="text-sm text-neutral-600">Add an extra layer of security</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6"
          >
            <h3 className="text-lg font-ginto font-semibold text-neutral-900 mb-6">Notification Preferences</h3>
            
            <div className="space-y-4">
              {[
                { key: 'email_notifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'sms_notifications', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
                { key: 'transaction_alerts', label: 'Transaction Alerts', description: 'Get notified of new transactions' },
                { key: 'security_alerts', label: 'Security Alerts', description: 'Important security notifications' },
                { key: 'weekly_reports', label: 'Weekly Reports', description: 'Receive weekly performance reports' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                  <div>
                    <p className="font-medium text-neutral-900">{item.label}</p>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Account Summary */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6"
          >
            <h3 className="text-lg font-ginto font-semibold text-neutral-900 mb-6">Account Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Admin ID</span>
                <span className="font-medium text-neutral-900">#{adminData.id}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Account Created</span>
                <span className="font-medium text-neutral-900">
                  {new Date(adminData.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Last Login</span>
                <span className="font-medium text-neutral-900">
                  {new Date(adminData.last_login).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-600">Status</span>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-success-100 text-success-700 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </motion.div>

          {/* Permissions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6"
          >
            <h3 className="text-lg font-ginto font-semibold text-neutral-900 mb-6">Permissions</h3>
            
            <div className="space-y-2">
              {adminData.permissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2 p-2 bg-neutral-50 rounded-lg">
                  <Shield className="w-4 h-4 text-success-500" />
                  <span className="text-sm text-neutral-900 capitalize">{permission.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full"
          >
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-ginto font-semibold text-neutral-900">Change Password</h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, current_password: e.target.value }))}
                    className="premium-input pr-12"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.new_password}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, new_password: e.target.value }))}
                    className="premium-input pr-12"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirm_password}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                    className="premium-input pr-12"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 premium-button"
                >
                  Change Password
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-6 py-3 text-neutral-600 hover:bg-neutral-100 rounded-2xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;