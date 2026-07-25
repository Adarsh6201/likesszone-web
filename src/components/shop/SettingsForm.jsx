import React, { useState } from 'react';
import { User, Lock, Mail, Phone, MapPin, Eye, EyeOff } from 'lucide-react';

const SettingsForm = ({ user, onUpdateProfile, onChangePassword }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '9304264241',
    address: user?.address || 'New Area 1st Gali, Okni near Joda shiv temple, Ward 20',
    avatar: user?.avatar || ''
  });

  // Password state
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await onUpdateProfile(profileData);
      setMessage({ type: 'success', text: 'Profile details updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await onChangePassword(passwords.oldPassword, passwords.newPassword);
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update password.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Column Tabs selectors */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="relative group shrink-0">
              <img 
                src={profileData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'} 
                alt="Avatar Preview" 
                className="h-12 w-12 rounded-full border-2 border-indigo-500/20 object-cover bg-slate-100" 
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-[10px] font-bold">
                Edit
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="truncate">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{profileData.name || 'User Name'}</h3>
              <p className="text-xs text-slate-400 truncate">{profileData.email || 'user@example.com'}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {[
              { id: 'profile', label: 'Edit Profile', icon: User },
              { id: 'security', label: 'Security & Password', icon: Lock }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMessage({ type: '', text: '' });
                  }}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-left transition-all ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none' 
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-850'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column Content View */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm min-h-[450px]">
        
        {/* Status Alerts */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-xs font-bold border transition-all animate-fadeIn ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400' 
              : 'bg-red-50 border-red-100 text-red-700 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* TAB 1: EDIT PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Profile Details</h2>
              <p className="text-xs text-slate-400 mt-0.5">Manage your public information and billing preferences.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Avatar Image</label>
                  <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100/50 dark:hover:bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 cursor-pointer w-full transition-all">
                    Choose local image...
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" /> Phone Number
                  </label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Default Shipping Address
                </label>
                <textarea
                  rows="3"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-indigo-600 text-white font-bold text-xs py-3 px-8 hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none transition-transform active:scale-95 disabled:opacity-50"
            >
              {isSaving ? 'Saving Changes...' : 'Save Profile Details'}
            </button>
          </form>
        )}

        {/* TAB 2: CHANGE PASSWORD */}
        {activeTab === 'security' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Security & Password</h2>
              <p className="text-xs text-slate-400 mt-0.5">Ensure your account is protected with a secure password lock.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5 relative">
                <label className="text-xs font-semibold text-slate-500">Current Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, oldPassword: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 py-2.5 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-655"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-505">New Password</label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                    placeholder="Min 6 characters"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-505">Confirm New Password</label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-850 dark:text-white dark:focus:bg-slate-900"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-indigo-600 text-white font-bold text-xs py-3 px-8 hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none transition-transform active:scale-95 disabled:opacity-50"
            >
              {isSaving ? 'Updating Password...' : 'Change Password'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default SettingsForm;
export { SettingsForm };
