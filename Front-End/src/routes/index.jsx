import { lazy, Suspense } from 'react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'

// Lazy pages
const Home = lazy(() => import('../pages/Home'))
const Platform = lazy(() => import('../pages/Platform'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Profile = lazy(() => import('../pages/Profile'))
const AdminUsers = lazy(() => import('../pages/AdminUsers'))
import AdminDashboard from './../pages/AdminDashboard';
import ChangePassword from './../pages/ChangePassword';
import ForgotPassword from './../pages/ForgotPassword';
import ResetPassword from './../pages/ResetPassword';

/* Pages with main layout */
const withLayout = (Component) => (
  <Layout>
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Component />
    </Suspense>
  </Layout>
)

/* Pages without navbar/footer */
const withAuthLayout = (Component) => (
  <Suspense fallback={<LoadingSpinner fullScreen />}>
    <Component />
  </Suspense>
)

export const routes = [
  // 🌍 Public
  { path: '/', element: withLayout(Home) },
  { path: '/platform/:slug', element: withLayout(Platform) },

  // 🔐 Auth
  { path: '/login', element: withAuthLayout(Login) },
  { path: '/register', element: withAuthLayout(Register) },

  // 👤 User (protected)
  {
    path: '/profile',
    element: withLayout(Profile),
    protected: true,
  },

  // 🛡️ Admin (protected + adminOnly)
  {
    path: '/admin/users',
    element: withLayout(AdminUsers),
    protected: true,
    adminOnly: true,
  },
  {
  path: '/admin',
  element: withLayout(AdminDashboard),
  protected: true,
  adminOnly: true,
},
{
  path: '/change-password',
  element: withLayout(ChangePassword),
  protected: true,
},
{ path: '/forgot-password', element: <ForgotPassword /> },
{ path: '/reset-password/:token', element: <ResetPassword /> }

]