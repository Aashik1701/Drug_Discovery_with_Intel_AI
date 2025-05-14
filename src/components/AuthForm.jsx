import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import ErrorBoundary from './ErrorBoundary';
import { AlertCircle, Loader2, CheckCircle, LogIn } from 'lucide-react';

/**
 * Authentication component that handles both login and registration
 */
const AuthForm = ({ mode = 'login' }) => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form validation
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  // Auth hook
  const { login, register, isLoading, error, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  // If already logged in, redirect to dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    
    // Basic validation
    if (!email) {
      setFormError('Email is required');
      return;
    }
    
    if (!password) {
      setFormError('Password is required');
      return;
    }
    
    if (mode === 'register') {
      if (!name) {
        setFormError('Name is required');
        return;
      }
      
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }
    }
    
    try {
      if (mode === 'login') {
        await login(email, password);
        setFormSuccess('Login successful!');
        // Redirect after short delay to show success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        await register(email, password, name);
        setFormSuccess('Registration successful!');
        // Redirect after short delay to show success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      setFormError(err.message || 'Authentication failed. Please try again.');
    }
  };
  
  return (
    <ErrorBoundary>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {mode === 'login' ? 'New to DrugForge?' : 'Already have an account?'}{' '}
              <Link
                to={mode === 'login' ? '/register' : '/signin'}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {mode === 'login' ? 'Register now' : 'Sign in'}
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              {/* Name field (register only) */}
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              )}

              {/* Email field */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              {/* Confirm password field (register only) */}
              {mode === 'register' && (
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              )}
            </div>

            {/* Error message */}
            {(formError || error) && (
              <div className="flex items-center space-x-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p>{formError || error}</p>
              </div>
            )}

            {/* Success message */}
            {formSuccess && (
              <div className="flex items-center space-x-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p>{formSuccess}</p>
              </div>
            )}

            {/* Form actions */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-300" />
                  ) : (
                    <LogIn className="h-5 w-5 text-blue-300" />
                  )}
                </span>
                {mode === 'login'
                  ? isLoading
                    ? 'Signing in...'
                    : 'Sign in'
                  : isLoading
                  ? 'Registering...'
                  : 'Register'}
              </button>
            </div>
          </form>

          {/* Helper text */}
          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              By {mode === 'login' ? 'signing in' : 'registering'}, you agree to our{' '}
              <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AuthForm;
