import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import AdminSidebarLayout from 'src/layouts/AdminSidebarLayout';
import CoordinatorSidebarLayout from 'src/layouts/CoordinatorSidebarLayout';

import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import ProtectedRoute from 'src/hooks-auth/components/ProtectedRoute';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Auth Components
const AdminLogin = Loader(lazy(() => import('src/auth/authAdmin/Login')));
const CoordinatorLogin = Loader(lazy(() => import('src/auth/authCoordinator/Login')));

const Register = Loader(lazy(() => import('src/auth/authCoordinator/Register')));

// Dashboard Components
const Admin = Loader(lazy(() => import('src/content/dashboards/Admin')));
const Coordinator = Loader(lazy(() => import('src/coordinator_contents/dashboards/Coordinator')));

// Beneficiary Components


// Admin/Coordinator Shared Components
const Messenger = Loader(lazy(() => import('src/content/applications/Messenger')));
const Transactions = Loader(lazy(() => import('src/content/applications/Transactions')));
const Sector = Loader(lazy(() => import('src/content/applications/Sector')));
const CoordinatorSettings = Loader(lazy(() => import('src/content/applications/Coordinator')));
const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));
const UserSettings = Loader(lazy(() => import('src/content/applications/Users/settings')));

// UI Components
const Buttons = Loader(lazy(() => import('src/content/pages/Components/Buttons')));
const Modals = Loader(lazy(() => import('src/content/pages/Components/Modals')));
const Accordions = Loader(lazy(() => import('src/content/pages/Components/Accordions')));
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(lazy(() => import('src/content/pages/Components/Badges')));
const Tooltips = Loader(lazy(() => import('src/content/pages/Components/Tooltips')));
const Avatars = Loader(lazy(() => import('src/content/pages/Components/Avatars')));
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status Pages
const Status404 = Loader(lazy(() => import('src/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/pages/Status/Maintenance')));

const routes = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      { path: '', element: <Navigate to="login" replace /> },
      { path: 'login', element: <AdminLogin /> },
      { path: 'coordinator-login', element: <CoordinatorLogin /> },
      { path: 'register', element: <Register /> },
      {
        path: 'status',
        children: [
          { path: '', element: <Navigate to="404" replace /> },
          { path: '404', element: <Status404 /> },
          { path: '500', element: <Status500 /> },
          { path: 'maintenance', element: <StatusMaintenance /> },
          { path: 'coming-soon', element: <StatusComingSoon /> }
        ]
      },
      { path: '*', element: <Status404 /> } 
    ]
  },

  // 🔴 Admin Routes
  {
    path: 'dashboards',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminSidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Navigate to="Admin" replace /> },
      { path: 'Admin', element: <Admin /> },
      { path: 'messenger', element: <Messenger /> }
    ]
  },
  {
    path: 'management',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminSidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Navigate to="transactions" replace /> },
      { path: 'Sector', element: <Sector /> },
      { path: 'Coordinator', element: <CoordinatorSettings /> },
      { path: 'transactions', element: <Transactions /> },
      {
        path: 'profile',
        children: [
          { path: '', element: <Navigate to="details" replace /> },
          { path: 'details', element: <UserProfile /> },
          { path: 'settings', element: <UserSettings /> }
        ]
      }
    ]
  },

  // 🟣 Coordinator Routes
  {
    path: 'coordinator',
    element: (
      <ProtectedRoute allowedRoles={['coordinator']}>
        <CoordinatorSidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Coordinator /> },
      { path: 'transactions', element: <Transactions /> },
      {
        path: 'profile',
        children: [
          { path: '', element: <Navigate to="details" replace /> },
          { path: 'details', element: <UserProfile /> },
          { path: 'settings', element: <UserSettings /> }
        ]
      },
      { path: '*', element: <Status404 /> }
    ]
  },


  // ⚙️ Shared Components (Admin/Coordinator)
  {
    path: 'components',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
        <AdminSidebarLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Navigate to="buttons" replace /> },
      { path: 'buttons', element: <Buttons /> },
      { path: 'modals', element: <Modals /> },
      { path: 'accordions', element: <Accordions /> },
      { path: 'tabs', element: <Tabs /> },
      { path: 'badges', element: <Badges /> },
      { path: 'tooltips', element: <Tooltips /> },
      { path: 'avatars', element: <Avatars /> },
      { path: 'cards', element: <Cards /> },
      { path: 'forms', element: <Forms /> }
    ]
  },

  // 🌐 Global Catch-All (Fallback for any invalid route)
  {
    path: '*',
    element: <Status404 />
  }
];

export default routes;