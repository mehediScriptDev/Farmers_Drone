import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { formatErrorMessage } from '../utils/helpers';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  // Redirect if already logged in
  if (user) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Navigation will be handled by the auth state change
    } catch (err) {
      setError(formatErrorMessage(err));
      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full'>
      <div className='flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left side - Login Form */}
          <div className='max-w-md mx-auto lg:mx-0 w-full'>
            <div className='bg-white rounded-xl shadow-lg p-8'>
              <div className='text-center'>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                  {t('auth.welcomeBack')}
                </h2>
                <p className='text-gray-600 mb-8'>
                  {t('auth.signInToAccount')}
                </p>
              </div>

              {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-4'>
                <Input
                  label={t('auth.email')}
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />

                <Input
                  label={t('auth.password')}
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-white hover:bg-gray-50 focus:bg-gray-50 text-black font-semibold py-2 px-4 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? t('auth.signingIn') : t('auth.signIn')}
                </button>
              </form>

              <div className='mt-8 border-t pt-6'>
                <div className='text-center'>
                  <p className='text-sm font-semibold text-gray-700 mb-4'>
                    {t('auth.demoAccounts')}
                  </p>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs'>
                    <div className='bg-blue-50 p-3 rounded-lg'>
                      <p className='font-semibold text-blue-800'>
                        {t('roles.admin')}
                      </p>
                      <p className='text-blue-600'>admin@example.com</p>
                    </div>
                    <div className='bg-green-50 p-3 rounded-lg'>
                      <p className='font-semibold text-green-800'>
                        {t('roles.marketing')}
                      </p>
                      <p className='text-green-600'>marketing@example.com</p>
                    </div>
                    <div className='bg-purple-50 p-3 rounded-lg'>
                      <p className='font-semibold text-purple-800'>
                        {t('roles.employee')}
                      </p>
                      <p className='text-purple-600'>employee@example.com</p>
                    </div>
                    <div className='bg-orange-50 p-3 rounded-lg'>
                      <p className='font-semibold text-orange-800'>
                        {t('roles.fieldAgent')}
                      </p>
                      <p className='text-orange-600'>fieldagent@example.com</p>
                    </div>
                  </div>
                  <p className='mt-4 text-xs text-gray-500'>
                    <span className='font-medium'>Password:</span>{' '}
                    {t('auth.passwordHint')}
                  </p>
                  <p className='mt-1 text-xs text-gray-400'>
                    {t('auth.demoAccountsNote')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Welcome Message */}
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-6xl font-bold text-gray-900 mb-6'>
              {t('home.title')}
            </h1>
            <p className='text-lg lg:text-xl text-gray-600 mb-8'>
              {t('home.subtitle')}
            </p>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div className='bg-white/80 p-4 rounded-lg'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  {t('home.features.roleBasedAccess')}
                </h3>
                <p className='text-gray-600'>
                  {t('home.features.roleBasedDescription')}
                </p>
              </div>
              <div className='bg-white/80 p-4 rounded-lg'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  {t('home.features.modernDesign')}
                </h3>
                <p className='text-gray-600'>
                  {t('home.features.modernDescription')}
                </p>
              </div>
              <div className='bg-white/80 p-4 rounded-lg'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  {t('home.features.secure')}
                </h3>
                <p className='text-gray-600'>
                  {t('home.features.secureDescription')}
                </p>
              </div>
              <div className='bg-white/80 p-4 rounded-lg'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  {t('home.features.responsive')}
                </h3>
                <p className='text-gray-600'>
                  {t('home.features.responsiveDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
