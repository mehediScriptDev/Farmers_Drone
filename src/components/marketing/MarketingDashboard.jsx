import React, { useEffect, useState } from 'react';

const MarketingDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // public assets are served from the root in Vite
    fetch('/MarketingDashboard/data/marketingLandingPage.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className='p-6'>Loading marketing data...</div>;
  if (error)
    return <div className='p-6 text-red-600'>Error loading data: {error}</div>;
  if (!data) return <div className='p-6'>No data available</div>;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Marketing Dashboard</h1>

      {/* Stats summary */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        {Array.isArray(data.stats) &&
          data.stats.map((s, idx) => (
            <div key={idx} className='p-4 bg-white rounded shadow'>
              <div className='text-sm text-gray-500'>{s.label}</div>
              <div className='text-xl font-bold'>{s.value}</div>
              <div className='text-xs text-gray-400'>{s.change}</div>
            </div>
          ))}
      </div>

      {/* Activities list (simple table) */}
      <div className='bg-white rounded shadow p-4'>
        <h2 className='text-lg font-medium mb-3'>Recent Activities</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='text-sm text-gray-600'>
                <th className='pr-4'>Lead</th>
                <th className='pr-4'>Source</th>
                <th className='pr-4'>Location</th>
                <th className='pr-4'>Score</th>
                <th className='pr-4'>Status</th>
                <th className='pr-4'>Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data.activities) &&
                data.activities.map((a, i) => (
                  <tr key={i} className='border-t'>
                    <td className='py-2'>{a.lead}</td>
                    <td className='py-2'>{a.source}</td>
                    <td className='py-2'>{a.location}</td>
                    <td className='py-2'>{a.score}</td>
                    <td className='py-2'>{a.status}</td>
                    <td className='py-2'>{a.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
