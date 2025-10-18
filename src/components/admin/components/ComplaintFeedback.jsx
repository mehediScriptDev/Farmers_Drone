import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const ComplaintFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // TODO: Submit feedback to API
    console.log('Feedback submitted for complaint', id, ':', feedback);
    // Navigate back to complaint details
    navigate(`/admin/complaint-details/${id}`);
  };

  return (
    <div className='min-h-screen bg-white px-6 xl:px-11 py-6'>
      <button
        onClick={() => navigate(`/admin/complaint-details/${id}`)}
        className='mb-6 flex items-center text-gray-600 hover:text-gray-900'
      >
        <IoArrowBack className='w-6 h-6' />
      </button>

      <div className='max-w-4xl'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-6'>
          Give Feedback
        </h1>

        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Your Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={10}
            placeholder='Write your feedback here...'
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none'
          />
        </div>

        <div className='flex gap-4'>
          <button
            onClick={handleSubmit}
            className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
          >
            Submit Feedback
          </button>
          <button
            onClick={() => navigate(`/admin/complaint-details/${id}`)}
            className='px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintFeedback;
