import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ShoppingCart } from 'lucide-react';
import RegisterForm from '../../components/auth/RegisterForm';

const Register = () => {
  const { register, isAuthenticated, error } = useAuth();
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSubmit = async (name, email, password, phone, profilePicture, role) => {
    setFormError('');
    setLoading(true);
    try {
      await register({ name, email, password, phone, profilePicture, role });
      navigate('/');
    } catch (err) {
      setFormError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md mb-2">
            <ShoppingCart className="h-5 w-5" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Create an Account</h2>
          <p className="text-xs text-slate-500">Sign up to buy exclusive watchwear and tech items.</p>
        </div>

        {/* Global errors */}
        {(formError || error) && (
          <div className="rounded-xl bg-red-50 dark:bg-red-950/20 px-4 py-3 text-xs text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/40">
            {formError || error}
          </div>
        )}

        <RegisterForm 
          onSubmit={handleRegisterSubmit}
          loading={loading}
        />

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
