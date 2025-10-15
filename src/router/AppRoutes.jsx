import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/common/Layout";
import { DashboardLayout } from "../components/common/DashboardLayout";
import LoginPage from "../pages/LoginPage";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import NotFoundPage from "../pages/NotFoundPage";

// Dashboard Components
import AdminDashboard from "../components/admin/components/AdminDashboard";

<<<<<<< HEAD
import FieldAgentDashboard from '../components/fieldAgent/FieldAgentDashboard';
=======
import FieldAgentDashboard from "../components/fieldAgent/FieldAgentDashboard";
>>>>>>> 9b950d996a3ae1a49c0be493c25f8d46fde3075f

// Admin Components
import Complaints from "../components/admin/components/Complaints";
import DroneOperator from "../components/admin/components/DroneOperator";
import EmployeeManagement from "../components/admin/components/EmployeeManagement";
import FieldAgent from "../components/admin/components/FieldAgent";
import Jobs from "../components/admin/components/Jobs";
import PaymentsManagement from "../components/admin/components/PaymentsManagement";
import Reports from "../components/admin/components/Reports";
import UserManagement from "../components/admin/components/UserManagement";

// Field Agent Components
<<<<<<< HEAD
import FieldAgentReports from '../components/fieldAgent/Reports';
import MyAssignments from '../components/fieldAgent/MyAssignments';
import LocationTracking from '../components/fieldAgent/LocationTracking';
import PhotoCapture from '../components/fieldAgent/PhotoCapture';
import RouteOptimization from '../components/fieldAgent/RouteOptimization';
import VehicleManagement from '../components/fieldAgent/VehicleManagement';
=======
import FieldAgentReports from "../components/fieldAgent/Reports";
import MyAssignments from "../components/fieldAgent/MyAssignments";
import LocationTracking from "../components/fieldAgent/LocationTracking";
import PhotoCapture from "../components/fieldAgent/PhotoCapture";
import RouteOptimization from "../components/fieldAgent/RouteOptimization";
import VehicleManagement from "../components/fieldAgent/VehicleManagement";
>>>>>>> 9b950d996a3ae1a49c0be493c25f8d46fde3075f

// Private Route Components
import {
  PrivateRoute,
  PrivateAdminRoute,
  PrivateEmployeeRoute,
  PrivateFieldAgentRoute,
  PrivateMarketingRoute,
<<<<<<< HEAD
} from './PrivateRoute';
import { RoleBasedRedirect } from './RoleBasedRedirect';
import LeadManagment from '../components/marketing/components/LeadManagment';
import MainLayout from './../LandingPageUI/Layout/MainLayout';
import Services from './../LandingPageUI/Pages/Services';
import About from './../LandingPageUI/Pages/About';
import Blog from './../LandingPageUI/Pages/Blog';
import Contact from './../LandingPageUI/Pages/Contact';
import Dashboard from '../components/employee/employdashboard/Dashboard';
import Coustomerpage from '../components/employee/employdashboard/Coustomerpage';
import OrderManagementPage from '../components/employee/employdashboard/OrderManagementPage';
import MessagePage from '../components/employee/employdashboard/MessagePage';
import PaymentManagement from '../components/employee/employdashboard/PaymentManagement';
import SupportPage from '../components/employee/employdashboard/SupportPage';
import ReportAnalysisPage from '../components/employee/employdashboard/components/ReportAnalysisPage';
import CoustomerDetailsPage from '../components/employee/employdashboard/components/CoustomerDetailsPage';

import Leads from './../components/marketing/Leads';
import Campaigns from './../components/marketing/Campaigns';
import OrderDetailsPage from '../components/employee/employdashboard/components/OrderDetailsPage';
import DroneOperatorDetails from '../components/admin/components/DroneOperatorDetails'; // Add this import
import MarketingDashBoard from '../components/marketing/components/MarketingDashBoard';
=======
} from "./PrivateRoute";
import { RoleBasedRedirect } from "./RoleBasedRedirect";
import LeadManagment from "../components/marketing/components/LeadManagment";
import MarketingDashBoard from "../components/marketing/components/MarketingDashBoard";
import MainLayout from "./../LandingPageUI/Layout/MainLayout";
import Services from "./../LandingPageUI/Pages/Services";
import About from "./../LandingPageUI/Pages/About";
import Blog from "./../LandingPageUI/Pages/Blog";
import Contact from "./../LandingPageUI/Pages/Contact";
import Dashboard from "../components/employee/employdashboard/Dashboard";
import Coustomerpage from "../components/employee/employdashboard/Coustomerpage";
import OrderManagementPage from "../components/employee/employdashboard/OrderManagementPage";
import MessagePage from "../components/employee/employdashboard/MessagePage";
import PaymentManagement from "../components/employee/employdashboard/PaymentManagement";
import SupportPage from "../components/employee/employdashboard/SupportPage";
import ReportAnalysisPage from "../components/employee/employdashboard/components/ReportAnalysisPage";
import CoustomerDetailsPage from "../components/employee/employdashboard/components/CoustomerDetailsPage";

import Campaigns from "./../components/marketing/Campaigns";
import OrderDetailsPage from "../components/employee/employdashboard/components/OrderDetailsPage";
import Analytics from "../components/marketing/Analytics";
>>>>>>> 9b950d996a3ae1a49c0be493c25f8d46fde3075f

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainLayout />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateAdminRoute>
        <DashboardLayout />
      </PrivateAdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "complaints",
        element: <Complaints />,
      },
      {
        path: "drone-operators",
        element: <DroneOperator />,
      },
      {
<<<<<<< HEAD
        path: 'drone-operators/:operatorId',
        element: <DroneOperatorDetails />,
      },
      {
        path: 'employees',
=======
        path: "employees",
>>>>>>> 9b950d996a3ae1a49c0be493c25f8d46fde3075f
        element: <EmployeeManagement />,
      },
      {
        path: "field-agents",
        element: <FieldAgent />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "payments",
        element: <PaymentsManagement />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
    ],
  },
<<<<<<< HEAD
  {
    path: '/employee',
    element: (
      <PrivateEmployeeRoute>
        <DashboardLayout />
      </PrivateEmployeeRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'customers/:customerId',
        element: <CoustomerDetailsPage />,
      },
      {
        path: 'customers',
        element: <Coustomerpage />,
      },

      {
        path: 'report-analysis',
        element: <ReportAnalysisPage />,
      },
      {
        path: 'orders',
        element: <OrderManagementPage />,
      },
      {
        path: 'orders/:orderId',
        element: <OrderDetailsPage />,
      },
      {
        path: 'payments',
        element: <PaymentManagement />,
      },
      {
        path: 'supports',
        element: <SupportPage />,
      },
      {
        path: 'messages',
        element: <MessagePage />,
      },
    ],
  },
=======
>>>>>>> 9b950d996a3ae1a49c0be493c25f8d46fde3075f
  {
    path: "/employee",
    element: (
      <PrivateEmployeeRoute>
        <DashboardLayout />
      </PrivateEmployeeRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customers/:customerId",
        element: <CoustomerDetailsPage />,
      },
      {
        path: "customers",
        element: <Coustomerpage />,
      },

      {
        path: "report-analysis",
        element: <ReportAnalysisPage />,
      },
      {
        path: "orders",
        element: <OrderManagementPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetailsPage />,
      },
      {
        path: "payments",
        element: <PaymentManagement />,
      },
      {
        path: "supports",
        element: <SupportPage />,
      },
      {
        path: "messages",
        element: <MessagePage />,
      },
    ],
  },
  {
    path: "/field-agent",
    element: (
      <PrivateFieldAgentRoute>
        <DashboardLayout />
      </PrivateFieldAgentRoute>
    ),
    children: [
      {
        index: true,
        element: <FieldAgentDashboard />,
      },
      {
        path: "reports",
        element: <FieldAgentReports />,
      },
      {
        path: "assignments",
        element: <MyAssignments />,
      },
      {
        path: "location-tracking",
        element: <LocationTracking />,
      },
      {
        path: "photo-capture",
        element: <PhotoCapture />,
      },
      {
        path: "route-optimization",
        element: <RouteOptimization />,
      },
      {
        path: "vehicle-management",
        element: <VehicleManagement />,
      },
    ],
  },
  {
    path: "/marketing",
    element: (
      <PrivateMarketingRoute>
        <DashboardLayout />
      </PrivateMarketingRoute>
    ),
    children: [
      {
        index: true,
        element: <MarketingDashBoard />,
      },
      {
<<<<<<< HEAD
        path: 'campaigns',
        element: <Campaigns />,
      },
      {
        path: 'LeadManagment',
        element: <Leads />,
      },
      {
        path: 'LeadManagment',
        element: <LeadManagment />,
      },
=======
        path: "campaigns",
        element: <Campaigns />,
      },
      {
        path: "LeadManagment",
        element: <LeadManagment />,
      },
      
      
      
      
      
      {
        path: "analytics",
        element: <Analytics />,
      },
>>>>>>> 9b950d996a3ae1a49c0be493c25f8d46fde3075f
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <RoleBasedRedirect />
      </PrivateRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <NotAuthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export { AppRoutes };
