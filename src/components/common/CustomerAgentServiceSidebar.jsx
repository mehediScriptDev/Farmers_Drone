import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { PiUsersThreeBold } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa";
import { LuHeadset, LuMessageCircle } from "react-icons/lu";

const CustomerAgentServiceSidebar = ({ sidebarOpen, setSidebarOpen }) => {
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
      matchPaths: ["/employee", "/employee/", "customers/:customerId", "order/:id"],
    },
    {
      id: "customer",
      label: t("sidebar.employee.customer"),
      icon: PiUsersThreeBold,
      path: "customerspage",
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

  useEffect(() => {
    const pathname = location.pathname;

    //  Priority: activeMenu from navigation state
    if (location.state?.activeMenu) {
      setActiveMenu(location.state.activeMenu);
      return;
    }

    // Dashboard related detail route fallback
    const isDashboardRelatedDetailRoute =
      pathname.includes("/customers/") || pathname.includes("/order/");

    if (
      pathname === "/employee" ||
      pathname === "/employee/" ||
      pathname.endsWith("/employee") ||
      isDashboardRelatedDetailRoute
    ) {
      setActiveMenu("dashboard");
      return;
    }

    // Normal route matching
    let foundActiveMenu = "";
    for (const item of menuItems) {
      if (item.id === "dashboard") continue;
      if (item.matchPaths) {
        const isMatched = item.matchPaths.some(
          (matchPath) =>
            pathname.endsWith(matchPath) || pathname.includes(`/${matchPath}/`)
        );
        if (isMatched) {
          foundActiveMenu = item.id;
          break;
        }
      }
    }
    setActiveMenu(foundActiveMenu);
  }, [location.pathname, location.state]);

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
                      ? "bg-white border-l-4 border-[#28A844] font-semibold shadow-sm"
                      : "text-[#002244] hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-[#002244]" : "text-gray-500"}`}
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

export default CustomerAgentServiceSidebar;
