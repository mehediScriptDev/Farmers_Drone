import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiGlobeAlt } from 'react-icons/hi';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'US', flag: '🇺🇸', fullName: t('languages.english') },
    { code: 'hi', name: 'IN', flag: '🇮🇳', fullName: t('languages.hindi') },
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className='relative group'>
      <button className='flex items-center space-x-1 px-2 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md transition-colors border border-gray-200 hover:border-gray-300'>
        <HiGlobeAlt className='w-4 h-4 text-gray-600' />
        <span className='text-xs font-semibold'>
          {languages.find((lang) => lang.code === i18n.language)?.name || 'US'}
        </span>
      </button>

      {/* Dropdown */}
      <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
        <div className='py-1'>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-3 transition-colors ${
                i18n.language === language.code
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700'
              }`}
            >
              <span className='text-lg'>{language.flag}</span>
              <div className='flex flex-col'>
                <span className='font-medium'>{language.fullName}</span>
                <span className='text-xs text-gray-500'>{language.name}</span>
              </div>
              {i18n.language === language.code && (
                <span className='ml-auto text-indigo-500'>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
