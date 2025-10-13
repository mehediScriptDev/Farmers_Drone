// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useNavigate, useLocation } from "react-router-dom";
// import { HiMenuAlt3, HiX } from "react-icons/hi";
// import { RiDashboardLine } from "react-icons/ri";
// import { PiUsersThreeBold } from "react-icons/pi";
// import { FiShoppingCart } from "react-icons/fi";
// import { FaRegCreditCard } from "react-icons/fa";
// import { LuHeadset } from "react-icons/lu";
// import { LuMessageCircle } from "react-icons/lu";

// const EmployeeSidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeMenu, setActiveMenu] = useState("");

//   const menuItems = [
//     {
//       id: "dashboard",
//       label: t("sidebar.employee.dashboard"),
//       icon: RiDashboardLine,
//       path: "",
//       matchPaths: ["/employee", "/employee/"],
//     },
//     {
//       id: "customer",
//       label: t("sidebar.employee.customer"),
//       icon: PiUsersThreeBold,
//       path: "customerspage",
//       matchPaths: ["customerspage", "customers", "report-analysis"],
//     },
//     {
//       id: "orders",
//       label: t("sidebar.employee.orders"),
//       icon: FiShoppingCart,
//       path: "orders",
//       matchPaths: ["orders"],
//     },
//     {
//       id: "payments",
//       label: t("sidebar.employee.payments"),
//       icon: FaRegCreditCard,
//       path: "payments",
//       matchPaths: ["payments"],
//     },
//     {
//       id: "support",
//       label: t("sidebar.employee.support"),
//       icon: LuHeadset,
//       path: "supports",
//       matchPaths: ["supports"],
//     },
//     {
//       id: "message",
//       label: "Message",
//       icon: LuMessageCircle,
//       path: "messages",
//       matchPaths: ["messages"],
//     },
//   ];

//   // Location change detect করে activeMenu update করো
//   useEffect(() => {
//     const pathname = location.pathname;
    
//     console.log("Current pathname:", pathname);
    
//     // dashboard check - এটা প্রথমে check করতে হবে
//     if (pathname === "/employee" || pathname === "/employee/" || pathname.endsWith("/employee")) {
//       console.log("Setting active to dashboard");
//       setActiveMenu("dashboard");
//       return;
//     }

//     // অন্যান্য routes check করো
//     let foundActiveMenu = "";

//     for (const item of menuItems) {
//       if (item.id === "dashboard") continue; // dashboard skip করো এখানে
      
//       if (item.matchPaths) {
//         const isMatched = item.matchPaths.some(
//           (matchPath) =>
//             pathname.includes(`/${matchPath}`) ||
//             pathname.endsWith(matchPath)
//         );
        
//         if (isMatched) {
//           console.log("Found match:", item.id);
//           foundActiveMenu = item.id;
//           break;
//         }
//       }
//     }

//     console.log("Setting active to:", foundActiveMenu || "none");
//     setActiveMenu(foundActiveMenu);
//   }, [location.pathname]);

//   const handleMenuClick = (item) => {
//     setActiveMenu(item.id);
//     navigate(item.path);
//     setSidebarOpen(false);
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       {!sidebarOpen && (
//         <div className="lg:hidden fixed top-4 left-4 z-50">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200"
//           >
//             <HiMenuAlt3 className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`bg-[#F5F7FA] shadow-lg transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static inset-y-0 xl:pt-2 left-0 z-50 w-[304px] xl:pl-9 overflow-y-auto`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Close Button for Mobile */}
//           <div className="lg:hidden p-4 border-b border-gray-200">
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="text-gray-600 hover:text-gray-900"
//             >
//               <HiX className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Menu Items */}
//           <nav className="flex-1 px-3 py-4 overflow-y-auto">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeMenu === item.id;

//               return (
//                 <button
//                   key={item.id}
//                   type="button"
//                   onClick={() => handleMenuClick(item)}
//                   className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mb-1 transition-all duration-300 ${
//                     isActive
//                       ? "bg-white border-l-4 border-green-600 font-semibold shadow-sm"
//                       : "text-black hover:bg-gray-50 border-l-4 border-transparent"
//                   }`}
//                 >
//                   <Icon
//                     className={`w-5 h-5 ${
//                       isActive ? "text-green-600" : "text-gray-500"
//                     }`}
//                   />
//                   <span>{item.label}</span>
//                 </button>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black/40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default EmployeeSidebar;










import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa";
import { LuHeadset } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";

const EmployeeSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");

  const menuItems = [
    {
    id: "dashboard",
    label: t("sidebar.employee.dashboard"),
    icon: RiDashboardLine,
    path: "",
    // এই matchPaths এ customer details ও order details এর রুটগুলি অন্তর্ভুক্ত করুন।
    matchPaths: ["/employee", "/employee/", "customers/:customerId", "order/:id"], 
  },
  {
    id: "customer",
    label: t("sidebar.employee.customer"),
    icon: PiUsersThreeBold,
    path: "customerspage",
    // শুধুমাত্র কাস্টমার পেজ এবং রিপোর্ট পেজকে match করবে, ডিটেইলস পেজ নয়।
    matchPaths: ["customerspage", "report-analysis"], 
  },
    {
      id: "orders",
      label: t("sidebar.employee.orders"),
      icon: FiShoppingCart,
      path: "orders",
      matchPaths: ["orders"],
    },
    {
      id: "payments",
      label: t("sidebar.employee.payments"),
      icon: FaRegCreditCard,
      path: "payments",
      matchPaths: ["payments"],
    },
    {
      id: "support",
      label: t("sidebar.employee.support"),
      icon: LuHeadset,
      path: "supports",
      matchPaths: ["supports"],
    },
    {
      id: "message",
      label: "Message",
      icon: LuMessageCircle,
      path: "messages",
      matchPaths: ["messages"],
    },
  ];

  // Location change detect করে activeMenu update করো
// EmployeeSidebar.jsx - useEffect hook
useEffect(() => {
  const pathname = location.pathname;

  // 1. ড্যাশবোর্ডের সাথে সম্পর্কিত সমস্ত ডিটেইলস রুটগুলির জন্য একটি কাস্টম চেক
  // এই রুটগুলি Dashboard-এর মতোই activeMenu সেট করবে।
  const isDashboardRelatedDetailRoute = 
    pathname.includes("/customers/") || // /employee/customers/123
    pathname.includes("/order/"); // /employee/customers/123/order/456

  if (
    pathname === "/employee" || 
    pathname === "/employee/" || 
    pathname.endsWith("/employee") ||
    isDashboardRelatedDetailRoute // <-- নতুন চেক
  ) {
    console.log("Setting active to dashboard or related detail route");
    setActiveMenu("dashboard");
    return;
  }

  // 2. অন্যান্য মূল রুটগুলির জন্য স্বাভাবিক চেক 
  // এই লজিক এখন শুধুমাত্র মূল রুটগুলি (/customerspage, /orders) খুঁজবে, ডিটেইলস নয়।
  let foundActiveMenu = "";

  for (const item of menuItems) {
    if (item.id === "dashboard") continue; 

    if (item.matchPaths) {
      const isMatched = item.matchPaths.some(
        (matchPath) =>
          // আমরা চাই যেন এটি শুধুমাত্র পুরো পাথের অংশগুলির সাথে মেলে
          pathname.endsWith(matchPath) || 
          pathname.includes(`/${matchPath}/`) // /orders/12345 match করার জন্য
      );
      
      if (isMatched) {
        console.log("Found match:", item.id);
        foundActiveMenu = item.id;
        break;
      }
    }
  }

  console.log("Setting active to:", foundActiveMenu || "none");
  setActiveMenu(foundActiveMenu);
}, [location.pathname]);

  const handleMenuClick = (item) => {
    setActiveMenu(item.id);
    navigate(item.path);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {!sidebarOpen && (
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200"
          >
            <HiMenuAlt3 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#F5F7FA] shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static inset-y-0 xl:pt-2 left-0 z-50 w-[304px] xl:pl-9 overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button for Mobile */}
          <div className="lg:hidden p-4 border-b border-gray-200">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mb-1 transition-all duration-300 ${
                    isActive
                      ? "bg-white border-l-4 border-green-600 font-semibold shadow-sm"
                      : "text-black hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-green-600" : "text-gray-500"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default EmployeeSidebar;