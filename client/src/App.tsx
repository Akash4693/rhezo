import Login from "./auth/Login";

import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HereSection from "./components/HereSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";
import { useUserStore } from "./store/useUserStore";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import React, { useEffect } from "react";
import Loading from "./components/Loading";
import { ThemeStore, useThemeStore } from "./store/useThemeStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;
  return <>{children}</>;
};

const AuthenticatedUser: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
  return <>{children}</>;
};
const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.admin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HereSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      // admin services start from here
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Restaurant />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  const initializeTheme = useThemeStore(
    (state: ThemeStore) => state.initializeTheme
  );
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
