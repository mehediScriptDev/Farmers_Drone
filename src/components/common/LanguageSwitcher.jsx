import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'EN', flagCode: 'US', fullName: t('languages.english') },
    { code: 'hi', name: 'IN', flagCode: 'IN', fullName: t('languages.hindi') },
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-1 px-2 py-1 !bg-transparent text-lg font-medium text-gray-700 hover:text-gray-900 focus:outline-none rounded-md transition-colors  hover:border-gray-300'
      >
        {/* <HiGlobeAlt className='w-4 h-4 text-gray-600' /> */}
        <span className='text-xs font-bold'>
          {languages.find((lang) => lang.code === i18n.language)?.name || 'EN'}
        </span>
        <ChevronDown className='w-3 h-3' />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div 
            className='fixed inset-0 z-10' 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className='absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 rounded-md border border-gray-300 bg-white ring-1 ring-opacity-5 z-20'>
            <div className='py-1'>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full text-left px-4 py-2 text-sm !bg-white flex items-center space-x-3 transition-colors ${
                    i18n.language === language.code
                      ? ' text-indigo-700'
                      : 'text-gray-700'
                  }`}
                >
                  <ReactCountryFlag 
                    countryCode={language.flagCode}
                    svg
                    style={{
                      width: '1.5em',
                      height: '1.5em',
                    }}
                  />

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
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;




