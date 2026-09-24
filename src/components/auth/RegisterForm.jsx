import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Phone, Camera, Check, X, ShieldAlert } from 'lucide-react';

const RegisterForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasNumber && hasSpecial;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setValidationError('Password must meet all security requirements listed below.');
      return;
    }
    setValidationError('');
    onSubmit(name, email, password, phone, profilePicture, 'user');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Profile Picture Upload Circle */}
      <div className="flex flex-col items-center justify-center pb-2">
        <label className="relative cursor-pointer group">
          <div className="w-20 h-20 rounded-full border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden shadow-sm transition-all group-hover:border-indigo-500">
            {profilePreview ? (
              <img src={profilePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Camera className="h-8 w-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1.5 rounded-full shadow-md transition-all group-hover:scale-110">
            <Camera className="h-3.5 w-3.5" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <span className="text-[10px] font-semibold text-slate-500 mt-2">Upload Profile Picture</span>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-500">Full Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-500">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-500">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="tel"
            required
            autoComplete="tel"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-500">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-655 dark:hover:text-slate-200 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Password Strength Checklist */}
        <div className="pt-1 pb-1 space-y-1 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px]">
          <span className="font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Password Requirements:
          </span>
          <div className="grid grid-cols-2 gap-1 text-[10.5px]">
            <span className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
              {hasMinLength ? <Check className="h-3 w-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1 mr-0.5" />}
              At least 8 characters
            </span>
            <span className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
              {hasUpper ? <Check className="h-3 w-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1 mr-0.5" />}
              1 uppercase letter (A-Z)
            </span>
            <span className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
              {hasLower ? <Check className="h-3 w-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1 mr-0.5" />}
              1 lowercase letter (a-z)
            </span>
            <span className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
              {hasNumber ? <Check className="h-3 w-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1 mr-0.5" />}
              1 number (0-9)
            </span>
            <span className={`flex items-center gap-1.5 col-span-2 ${hasSpecial ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
              {hasSpecial ? <Check className="h-3 w-3" /> : <span className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1 mr-0.5" />}
              1 special character (!@#$%^&* etc.)
            </span>
          </div>
        </div>

        {validationError && (
          <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 dark:bg-red-950/30 p-2 rounded-lg border border-red-100 dark:border-red-900/50">
            <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none transition-all active:scale-95 disabled:bg-indigo-400 cursor-pointer"
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default RegisterForm;
export { RegisterForm };
