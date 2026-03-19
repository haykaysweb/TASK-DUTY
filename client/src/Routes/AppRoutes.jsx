import { createBrowserRouter, RouterProvider } from "react-router";
import { PrivateRoute, PublicRoute } from "./ProtectedRoute";
import { Suspense, lazy } from "react";

const AuthLayout = lazy(() => import("../Layout/AuthLayout"));
const RootLayout = lazy(() => import("../Layout/RootLayout"));
const Register = lazy(() => import("../Pages/auth/Register"));
const Login = lazy(() => import("../Pages/auth/Login"));
const Home = lazy(() => import("../Pages/Home/Home"));

const Mytask = lazy(() => import("../Pages/Task/Mytask"));
const Newtask = lazy(() => import("../Pages/Task/Newtask"));
const EditTask = lazy(() => import("../Pages/Task/EditTask"));

import Spinner from "../Components/Spinner";
import { useAuth } from "../hooks/useAuth";

export default function AppRoutes() {
  const { accessToken } = useAuth();
  const route = [
    {
      path: "/",
      element: (
        <Suspense fallback={<Spinner />}>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "auth/newtask",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <Newtask />
            </PrivateRoute>
          ),
        },
        {
          path: "auth/editTask/:id",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <EditTask />
            </PrivateRoute>
          ),
        },
        {
          path: "auth/mytask",
          element: (
            <PrivateRoute accessToken={accessToken}>
              <Mytask />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<Spinner />}>
          <PublicRoute accessToken={accessToken}>
            <AuthLayout />
          </PublicRoute>
        </Suspense>
      ),
      children: [
        {
          path: "auth/register",
          element: <Register />,
        },
        {
          path: "auth/login",
          element: <Login />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(route);

  return <RouterProvider router={router} />;
}
