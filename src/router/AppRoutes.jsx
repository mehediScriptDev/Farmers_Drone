import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { DashboardLayout } from '../components/common/DashboardLayout';
import LoginPage from '../pages/LoginPage';
import NotAuthorizedPage from '../pages/NotAuthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';

// Dashboard Components
import AdminDashboard from '../components/admin/components/AdminDashboard';

import FieldAgentDashboard from '../components/fieldAgent/FieldAgentDashboard';
import { MarketingDashboardLayout } from '../components/marketing/MarketingDashboardLayout';

// Admin Components
import Complaints from '../components/admin/components/Complaints';
import DroneOperator from '../components/admin/components/DroneOperator';
import EmployeeManagement from '../components/admin/components/EmployeeManagement';
import FieldAgent from '../components/admin/components/FieldAgent';
import Jobs from '../components/admin/components/Jobs';
import PaymentsManagement from '../components/admin/components/PaymentsManagement';
import Reports from '../components/admin/components/Reports';
import UserManagement from '../components/admin/components/UserManagement';

// Field Agent Components
import FieldAgentReports from '../components/fieldAgent/Reports';
import MyAssignments from '../components/fieldAgent/MyAssignments';
import LocationTracking from '../components/fieldAgent/LocationTracking';
import PhotoCapture from '../components/fieldAgent/PhotoCapture';
import RouteOptimization from '../components/fieldAgent/RouteOptimization';
import VehicleManagement from '../components/fieldAgent/VehicleManagement';



// Private Route Components
import {
  PrivateRoute,
  PrivateAdminRoute,
  PrivateEmployeeRoute,
  PrivateFieldAgentRoute,
  PrivateMarketingRoute,
} from './PrivateRoute';
import { RoleBasedRedirect } from './RoleBasedRedirect';
import LeadManagment from '../components/marketing/components/LeadManagment';
import Anylytics from '../components/marketing/components/Anylytics';
import MarketingDashBoard from '../components/marketing/components/MarketingDashBoard';
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
import MarketingDashboard from './../components/marketing/MarketingDashboard';
import Campaigns from './../components/marketing/Campaigns';
import OrderDetailsPage from '../components/employee/employdashboard/components/OrderDetailsPage';

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainLayout />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/admin',
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
        path: 'complaints',
        element: <Complaints />,
      },
      {
        path: 'drone-operators',
        element: <DroneOperator />,
      },
      {
        path: 'employees',
        element: <EmployeeManagement />,
      },
      {
        path: 'field-agents',
        element: <FieldAgent />,
      },
      {
        path: 'jobs',
        element: <Jobs />,
      },
      {
        path: 'payments',
        element: <PaymentsManagement />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
    ],
  },
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
      path: "customers/:customerId",
      element: <CoustomerDetailsPage />,
    },
    {
      path: "customers/:customerId/order/:id",
      element: <OrderDetailsPage />,
    },
    {
      path: "customerspage",
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
    path: '/field-agent',
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
        path: 'reports',
        element: <FieldAgentReports />,
      },
      {
        path: 'assignments',
        element: <MyAssignments />,
      },
      {
        path: 'location-tracking',
        element: <LocationTracking />,
      },
      {
        path: 'photo-capture',
        element: <PhotoCapture />,
      },
      {
        path: 'route-optimization',
        element: <RouteOptimization />,
      },
      {
        path: 'vehicle-management',
        element: <VehicleManagement />,
      },
    ],
  },
  {
    path: '/marketing',
    element: (
      <PrivateMarketingRoute>
        <DashboardLayout />
      </PrivateMarketingRoute>
    ),
    children: [
      {
        index: true,
        element: <MarketingDashBoard/>
      },
      {
        path :"campaigns",
        element : <Campaigns/>
      },
      {
        path: "LeadManagment",
        element : <Leads/>
      },{
        path : "analytics",
        element : <Anylytics/>
      }
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <RoleBasedRedirect />
      </PrivateRoute>
    ),
  },
  {
    path: '/unauthorized',
    element: <NotAuthorizedPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export { AppRoutes };
