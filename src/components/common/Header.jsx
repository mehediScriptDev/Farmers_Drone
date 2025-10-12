import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { Button } from './Button';
import LanguageSwitcher from './LanguageSwitcher';
import { HiFire } from 'react-icons/hi';
import { APP_NAME, ROUTES } from '../../constants/app';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <nav className='w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
        <Link to={ROUTES.HOME} className='flex items-center space-x-2'>
          <HiFire className='w-6 h-6 sm:w-8 sm:h-8 text-indigo-600' />
          <span className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-800'>
            {APP_NAME}
          </span>
        </Link>
        <div className='flex items-center space-x-2 sm:space-x-4'>
          <LanguageSwitcher />
          {user ? (
            <>
              <Button
                variant='blackText'
                size='small'
                className='hidden sm:inline-flex'
                onClick={() => navigate(ROUTES.DASHBOARD)}
              >
                {t('navigation.dashboard')}
              </Button>
              <Button variant='blackText' size='small' onClick={logout}>
                {t('navigation.logout')}
              </Button>
            </>
          ) : (
            <Button
              variant='blackText'
              size='small'
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              {t('navigation.login')}
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
