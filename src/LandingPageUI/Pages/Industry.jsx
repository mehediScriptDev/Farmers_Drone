// import industry1 from "/assets/images/industry1.png";
// import industry2 from "/assets/images/industry2.png";
// import industry3 from "/assets/images/industry3.png";
// import industry4 from "/assets/images/industry4.png";
// import industry5 from "/assets/images/industry5.png";
// import industry6 from "/assets/images/industry6.png";
export default function Industry() {
  const services = [
    {
      id: "01",
      icon: "/assets/images/industry1.png",
      title: "Aerial Media Services",
      description:
        "Capture stunning aerial footage and photography to elevate your media projects.",

      iconColor: "text-blue-600",
    },
    {
      id: "02",
      icon: "/assets/images/industry2.png",
      title: "Real Estate & Marketing",
      description:
        "Showcase properties from the sky for effective real estate promotion and marketing.",

      iconColor: "text-purple-600",
    },
    {
      id: "03",
      icon: "/assets/images/industry3.png",
      title: "Mapping & Surveying",
      description:
        "Accurate aerial mapping and surveying solutions for precise planning and analysis.",

      iconColor: "text-orange-600",
    },
    {
      id: "04",
      icon: "/assets/images/industry4.png",
      title: "Agriculture",
      description:
        "Monitor crops and optimize farm management with advanced drone technology.",

      iconColor: "text-green-600",
    },
    {
      id: "05",
      icon: "/assets/images/industry5.png",
      title: "Inspection & Infrastructure",
      description:
        "Conduct safe and efficient inspections of bridges, towers, and other infrastructure.",

      iconColor: "text-red-600",
    },
    {
      id: "06",
      icon: "/assets/images/industry6.png",
      title: "Specialized Operations",
      description:
        "Handle custom drone operations with specialized equipment for unique tasks.",

      iconColor: "text-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#E6EBF1] py-4 lg:py-16 xl:py-[83px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="lg:text-[40px] text-2xl sm:text-3xl font-medium text-center text-gray-900 mb-4 lg:mb-16">
          Our Services
        </h1>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg
                transition-all duration-300 transform  p-8 relative overflow-hidden"
              >
                <div className="absolute top-6 right-6 text-2xl font-bold text-[#A8A8A8] transition-colors">
                  {service.id}
                </div>

                <div className="w-16 h-16 bg-white shadow-2xl border border-gray-100 rounded-full flex items-center justify-center mb-6 relative z-10 transition-transform duration-300">
                  <img
                    src={service.icon}
                    alt="icon"
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <h3 className="text-[18px] font-medium text-black mb-4 relative z-10">
                  {service.title}
                </h3>

                <p className="text-[#303030] md:text-[16px] text-xs mb-6 leading-relaxed relative z-10">
                  {service.description}
                </p>

                <button className="flex mt-3 items-center text-[#28A844] font-semibold cursor-pointer transition-colors  relative z-10">
                  Learn more
                  <svg
                    className="w-5 h-5 ml-2  transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
