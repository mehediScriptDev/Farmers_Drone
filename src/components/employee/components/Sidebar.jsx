import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  LayoutDashboard,
  User,
  ShoppingCart,
  CreditCard,
  Headphones,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection,
}) => {
  const { t } = useTranslation();

  const menuItems = [
    { id: "dashboard", label: t("sidebar.employee.dashboard"), icon: LayoutDashboard },
    { id: "customer", label: t("sidebar.employee.customer"), icon: User },
    { id: "orders", label: t("sidebar.employee.orders"), icon: ShoppingCart },
    { id: "payments", label: t("sidebar.employee.payments"), icon: CreditCard },
    { id: "support", label: t("sidebar.employee.support"), icon: Headphones },
    { id: "message", label:"Message", icon:MessageCircle },
  ];

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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#EAEDF4] shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-3 py-4 overflow-y-auto pt-24 lg:pt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`group relative w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mb-1 border-l-4 overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${
                      isActive
                        ? "bg-white border-[#28A844] text-[#002244] font-semibold shadow-sm"
                        : "border-transparent text-[#002244] hover:bg-gray-50 hover:text-[#002244]"
                    }`}
                >
                  {/* Animated left border */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-[#28A844] animate-[slideIn_0.3s_ease-in-out]" />
                  )}

                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive
                        ? "text-[#002244]"
                        : "text-gray-500 group-hover:text-[#002244]"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
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

      {/* Custom animation keyframes */}
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
