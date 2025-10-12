import { Eye, } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationModal from './components/Modal/RegistrationModal';
import AssistProfileSetupModal from './components/Modal/AssistProfileSetupModal';
const Coustomerpage = () => {
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false); 

  const activities = [
    {
      name: 'Eleanor Pena',
      company: 'Agritech Solutions',
      contact: 'John@agritech.com',
      phone: '(225) 555-0118',
      location: 'Gujrat, India',
      server: 'Unassigned',
      progress: 'In Progress',
      priority: 'Low',
      avatar: 'EP'
    },
    {
      name: 'Esther Howard',
      company: 'Agritech Solutions',
      contact: 'John@agritech.com',
      phone: '(225) 555-0118',
      location: 'Gujrat, India',
      server: 'John Doe',
      progress: 'In Progress',
      priority: 'High',
      avatar: 'EH'
    },
    {
      name: 'Theresa Webb',
      company: 'Agritech Solutions',
      contact: 'John@agritech.com',
      phone: '(225) 555-0118',
      location: 'Gujrat, India',
      server: 'Unassigned',
      progress: 'In Progress',
      priority: 'Low',
      avatar: 'TW'
    },
    {
      name: 'Floyd Miles',
      company: 'Agritech Solutions',
      contact: 'John@agritech.com',
      phone: '(225) 555-0118',
      location: 'Gujrat, India',
      server: 'Prasad das',
      progress: 'In Progress',
      priority: 'Medium',
      avatar: 'FM'
    },
    {
      name: 'Floyd Miles',
      company: 'Agritech Solutions',
      contact: 'John@agritech.com',
      phone: '(225) 555-0118',
      location: 'Gujrat, India',
      server: 'Prasad das',
      progress: 'In Progress',
      priority: 'Medium',
      avatar: 'FM'
    },
    {
      name: 'Floyd Miles',
      company: 'Agritech Solutions',
      contact: 'John@agritech.com',
      phone: '(225) 555-0118',
      location: 'Gujrat, India',
      server: 'Prasad das',
      progress: 'In Progress',
      priority: 'Medium',
      avatar: 'FM'
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Customer  Management</h1>
        <p className="text-sm md:text-base text-gray-600">Monitor your customer service performance</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Recent Business Activity</h2>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <button onClick={() => setOpen(true)} className="px-4 md:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-sm md:text-base">
                Register New Customer
              </button>
              <button  onClick={() => setIsModalOpen(true)} className="px-4 md:px-6 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 font-medium text-sm md:text-base">
                Assist in Profile Setup
              </button>
              <button
                onClick={() => navigate('/customer/report-analysis')}
                className="px-4 md:px-6 py-2 bg-[#DC3545] text-white rounded-lg hover:bg-red-700 font-medium text-sm md:text-base"
              >
                Report Analysis
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Service name</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Contact</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Location</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Server</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Progress</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Priority</th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activities.map((activity, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 md:px-6 py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium text-xs md:text-sm">
                        {activity.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 text-sm md:text-base whitespace-nowrap">{activity.name}</div>
                        <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <div className="text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.contact}</div>
                    <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{activity.phone}</div>
                  </td>
                  <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-900 whitespace-nowrap">{activity.location}</td>
                  <td className="px-3 md:px-6 py-4">
                    <span className={`inline-flex px-2 md:px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${activity.server === 'Unassigned'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                      }`}>
                      {activity.server}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <select className="px-2 md:px-3 py-1 bg-[#394C6B] text-white rounded text-xs md:text-sm">
                      <option>{activity.progress}</option>
                    </select>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <span className={`inline-flex px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium whitespace-nowrap ${activity.priority === 'High' ? 'text-red-600' :
                      activity.priority === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                      {activity.priority}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-4">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-gray-600">Showing 1 to 4 of 4 results</div>
          <div className="flex gap-2">
            <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
      <RegistrationModal isOpen={open} onClose={() => setOpen(false)} />
        <AssistProfileSetupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};


export default Coustomerpage
