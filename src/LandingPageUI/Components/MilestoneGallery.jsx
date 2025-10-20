import React from 'react';

export default function MilestoneGallery() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Content Section */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Milestones & Memories
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                Take a look at our drone journey — from stunning aerial shots and surveying projects to real estate promotions and specialized operations. Every image reflects precision, innovation, and excellence in flight.
              </p>
            </div>
            
            {/* Bottom left image */}
            <div className="h-[244px] rounded-lg overflow-hidden hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop"
                alt="Drone in hand"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Column 2 - Tall and Short */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <div className="h-[448px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&h=800&fit=crop"
                alt="Drone on grass"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-[244px] rounded-lg overflow-hidden">
              <img 
                src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/54A5/production/_87996612_87996608.jpg"
                alt="Delivery drone over city"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Column 3 - Single Tall */}
          <div className="lg:col-span-3">
            <div className="h-[448px] lg:h-[717px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&h=1200&fit=crop"
                alt="Drone flying in sky"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Column 4 - Tall and Short */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <div className="h-[448px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=800&fit=crop"
                alt="Drone with autumn background"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-[244px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=600&fit=crop"
                alt="Drone over landscape"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}