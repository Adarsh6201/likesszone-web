import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/auth/LoginForm';
import QuickLoginPanel from '../../components/auth/QuickLoginPanel';
import LogoImage from '../../assets/logo.png';

const Login = () => {
  const { login, isAuthenticated, error, user } = useAuth();
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || (user?.role === 'admin' ? '/admin' : '/');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, user, location]);

  const handleLoginFormSubmit = async (email, password) => {
    setFormError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setFormError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLoginSubmit = async (email, password) => {
    setFormError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setFormError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <img 
            src={LogoImage} 
            alt="Likesszon Logo" 
            className="h-20 w-20 object-contain rounded-full shadow-md mx-auto mb-2 border border-slate-100 bg-white" 
          />
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Sign In to Likesszon</h2>
          <p className="text-xs text-slate-500">Access your store orders and dashboard panel.</p>
        </div>

        {/* Route warnings */}
        {(location.state?.error || location.state?.from) && (
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-xs text-amber-850 dark:text-amber-300 border border-amber-100 dark:border-amber-900/40">
            {location.state?.error || 'Authentication required to access that dashboard path.'}
          </div>
        )}

        {/* Global errors */}
        {(formError || error) && (
          <div className="rounded-xl bg-red-50 dark:bg-red-950/20 px-4 py-3 text-xs text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/40">
            {formError || error}
          </div>
        )}

        <LoginForm 
          onSubmit={handleLoginFormSubmit}
          loading={loading}
        />

        <QuickLoginPanel 
          onQuickLogin={handleQuickLoginSubmit}
        />

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Register now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
