import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { DashboardLayout } from '../components/common/DashboardLayout';
import LoginPage from '../pages/LoginPage';
import NotAuthorizedPage from '../pages/NotAuthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';

// Dashboard Components
import AdminDashboard from '../components/admin/components/AdminDashboard';

import FieldAgentDashboard from '../components/fieldAgent/FieldAgentDashboard';

// Admin Components
import Jobs from '../components/admin/components/Jobs';
import PaymentsManagement from '../components/admin/components/PaymentsManagement';
import Reports from '../components/admin/components/Reports';
import UserManagement from '../components/admin/components/UserManagement';
import UserManagementDetails from '../components/admin/components/UserManagementDetails';
import Complaints from '../components/admin/components/Complaints';
import ComplaintDetails from '../components/admin/components/ComplaintDetails';
import ComplaintFeedback from '../components/admin/components/ComplaintFeedback';
import AdminServices from '../components/admin/components/Services';
import Settings from '../components/admin/components/Settings';
import OrderDetails from '../components/admin/components/OrderDetails';

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
import MarketingDashBoard from '../components/marketing/components/MarketingDashBoard';
import Analytics from './../components/marketing/Analytics';

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
        path: 'users',
        element: <UserManagement />,
      },
      {
        path: 'users/:userId',
        element: <UserManagementDetails />,
      },
      {
        path: 'jobs',
        element: <Jobs />,
      },
      {
        path: 'order-details/:operatorId',
        element: <OrderDetails />,
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
        path: 'complaints',
        element: <Complaints />,
      },
      {
        path: 'complaint-details/:id',
        element: <ComplaintDetails />,
      },
      {
        path: 'complaint-feedback/:id',
        element: <ComplaintFeedback />,
      },
      {
        path: 'services',
        element: <AdminServices />,
      },
    ],
  },
  {
    path: '/admin/settings',
    element: (
      <PrivateAdminRoute>
        <Settings />
      </PrivateAdminRoute>
    ),
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
        element: <MarketingDashBoard />,
      },
      {
        path: 'campaigns',
        element: <Campaigns />,
      },
      {
        path: 'LeadManagment',
        element: <LeadManagment />,
      },

      {
        path: 'analytics',
        element: <Analytics />,
      },
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
