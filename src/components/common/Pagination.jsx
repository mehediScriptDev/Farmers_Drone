import React from 'react';

const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  itemLabel = 'User', // singular form
  itemLabelPlural = 'Users', // plural form
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Calculate the range of items being shown
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show (show current page and one more if available)
  const pages = [];
  if (totalPages > 0) {
    let startPage = currentPage;
    let endPage = Math.min(startPage + 1, totalPages);

    // If we're on the last page and there are more than 1 pages, show previous page too
    if (currentPage === totalPages && totalPages > 1) {
      startPage = totalPages - 1;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return (
    <div className='px-4 md:px-6 py-3 md:py-4 bg-white border-t border-gray-200'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='text-sm text-gray-600'>
          {totalItems > 0
            ? `Showing ${endItem} of ${totalItems} ${
                totalItems === 1 ? itemLabel : itemLabelPlural
              }`
            : `No ${itemLabelPlural.toLowerCase()} to display`}
        </div>
        <div className='flex items-center space-x-1'>
          <button
            onClick={handlePreviousClick}
            className='px-3 md:px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            disabled={currentPage === 1 || totalPages === 0}
          >
            Previous
          </button>

          {pages.map((page) => (
            <button
              key={page}
              className={`px-3 md:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNextClick}
            className='px-3 md:px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
