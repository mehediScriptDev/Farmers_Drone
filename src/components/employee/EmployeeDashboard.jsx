import React, { useState } from "react";
import Coustomerpage from "./Coustomerpage";
import OrderManagementPage from "./OrderManagementPage";
import PaymentManagement from "./PaymentManagement";
import SupportPage from "./SupportPage";
import Sidebar from "./components/Sidebar";
import Dashboard from "./DashBoard";
import CustomerDetailsPage from "./components/CustomeDetailsPage";
import ReportAnalysisPage from "./components/ReportAnalysisPage";
import OrderDetailsPage from "./components/OrderDetailsPage";
import MessagePage from "./components/MessagePage";

const EmployeeDashboard = () => {

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleViewCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setActiveSection("customerDetails");
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setActiveSection("orderDetails");
  };

  const handleBackToDashboard = () => {

    setActiveSection("dashboard");

    setSelectedCustomer(null);

    setSelectedOrder(null);

  };

  const handleBackToCustomerDetails = () => {

    setActiveSection("customerDetails");

    setSelectedOrder(null);

  };

  // Determine which section should be active in the sidebar

  const getSidebarActiveSection = () => {

    if (activeSection === "customerDetails" || activeSection === "orderDetails") {

      return "dashboard";

    }

    // Keep customer active when on report analysis page

    if (activeSection === "reportAnalysis") {

      return "customer";

    }

    return activeSection;

  };

  const renderContent = () => {

    switch (activeSection) {

      case "dashboard":

        return <Dashboard onViewCustomerDetails={handleViewCustomerDetails} />;

      case "customerDetails":

        return (
          <CustomerDetailsPage

            customer={selectedCustomer}

            onBack={handleBackToDashboard}

            onViewOrderDetails={handleViewOrderDetails}

          />

        );

      case "orderDetails":

        return (
          <OrderDetailsPage

            order={selectedOrder}

            onBack={handleBackToCustomerDetails}

          />

        );

      case "customer":

        return (
          <Coustomerpage

            setActiveSection={setActiveSection}

            setSelectedCustomer={setSelectedCustomer}

          />

        );

      case "orders":

        return <OrderManagementPage />;

      case "payments":

        return <PaymentManagement />;

      case "support":

        return <SupportPage />;
      
      case "reportAnalysis":

        return <ReportAnalysisPage />;
        case "message":
      return <MessagePage/>;

      default:

        return <div>Page not found</div>;

    }

  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar

        sidebarOpen={sidebarOpen}

        setSidebarOpen={setSidebarOpen}

        activeSection={getSidebarActiveSection()}

        setActiveSection={setActiveSection}

      />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        
        <main className="flex-1 overflow-x-hidden overflow-y bg-gray-100">

         <div className='min-h-full'>{renderContent()}</div>
        </main>
      </div>
    </div>

  );

};

export default EmployeeDashboard;

