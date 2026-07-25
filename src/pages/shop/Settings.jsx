import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SettingsForm from '../../components/shop/SettingsForm';
import { ShieldAlert } from 'lucide-react';

const Settings = () => {
  const { user, updateProfile, changePassword, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 mx-auto">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Authentication Required</h2>
          <p className="text-slate-500 text-sm">Please sign in to your store account to access and edit settings.</p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Account Settings</h1>
      
      <SettingsForm 
        user={user}
        onUpdateProfile={updateProfile}
        onChangePassword={changePassword}
      />
    </div>
  );
};

export default Settings;
