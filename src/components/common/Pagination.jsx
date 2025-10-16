import React from 'react';
// import { useTranslation } from 'react-i18next';

const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}) => {
  // const { t } = useTranslation();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Show only 2 numbered buttons at once
  let startPage = currentPage;
  let endPage = Math.min(startPage + 1, totalPages);
  if (currentPage === totalPages && totalPages > 1) {
    startPage = totalPages - 1;
    endPage = totalPages;
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <div className='px-6 py-4 bg-white border-t border-gray-200'>
      <div className='flex items-center justify-between'>
       <div className='text-sm text-gray-700'>
  {`Showing ${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} Users`}
</div>
        <div className='flex items-center space-x-1'>
          <button
            onClick={handlePreviousClick}
            className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {pages.map((page) => (
            <button
              key={page}
              className={`px-3 py-2 text-sm font-medium rounded ${
                currentPage === page
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextClick}
            className='px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
