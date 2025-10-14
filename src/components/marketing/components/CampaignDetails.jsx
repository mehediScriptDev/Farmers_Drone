import React, { useState } from 'react';
import { ArrowLeft, Eye, MousePointer, Users, TrendingUp, Download } from 'lucide-react';

const  CampaignDetails = () => {
  const [timeRange, setTimeRange] = useState('Last 30 days overview');

  const stats = [
    { label: 'Impressions', value: '245,000', icon: Eye, trend: '+12%' },
    { label: 'Clicks', value: '12,300', icon: MousePointer, trend: '+8%' },
    { label: 'Conversions', value: '387', icon: Users, trend: '+15%' },
    { label: 'Conversion Rate', value: '3.15%', icon: TrendingUp, trend: '+5%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back</span>
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Export
              </button>
              <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Campaign Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Campaign Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-sm text-gray-600 mb-1">Campaign Name</p>
              <p className="font-semibold text-gray-900">Luxury Real Estate Drone Photography Campaign</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Objective</p>
              <p className="font-semibold text-gray-900">Lead Generation</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Duration</p>
              <p className="font-semibold text-gray-900">1/6/2024 - 21/6/2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Campaign Type</p>
              <p className="font-semibold text-gray-900">Multi-Channel</p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="mb-6">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Last 30 days overview</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <stat.icon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <span className="text-green-600 text-sm font-semibold flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Story */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Story</h2>
          
          {/* Drone Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop" 
                alt="Drone over house"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&h=400&fit=crop" 
                alt="White drone in flight"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Showcase Properties from a New Perspective</h3>
            
            <p className="text-gray-700 leading-relaxed">
              In today's competitive real estate market, it's more crucial than ever to stand out with stunning, bird's-eye photography. Our properties run campaigns that go beyond the ground level, tapping into the unique capability of aerial photography to showcase expansive views, intricate architectural details, and surroundings that standard photography simply cannot capture. From wide-angle aerial perspectives that showcase the property's full scope, to close-up shots that reveal exclusive features, drone videos create an unparalleled first impression for potential buyers.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              This campaign leverages high-resolution drone photography to give potential buyers a complete understanding of what each property has to offer. Rather than relying on static, ground-level photos, prospective buyers can now experience properties as if they're already there. By visualizing the property in its true context—in the surroundings, the neighborhood, and the environment—buyers can evaluate the property's fit with their lifestyle and better imagine calling the property home. By using drone photography and estate agents can significantly increase listing engagement, attract higher offers, and accelerate sales.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Our campaign positions real estate professionals as forward-thinking, tech-savvy industry leaders. With innovative tools like drones that turn every property into a story worth telling, and give your clients the confidence they need to take the next step. With high-quality drone photography, listing agents can build credibility and trust with potential buyers, helping to drive inquiries and close sales faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails