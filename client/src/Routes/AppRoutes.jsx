import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../Pages/Home/Home";
import EditTask from "../Pages/Task/EditTask";
import Newtask from "../Pages/Task/Newtask";
import Mytask from "../Pages/Task/Mytask";
import Rootlayout from "../Layout/Rootlayout";
import AuthLayout from "../Layout/AuthLayout";
import Register from "../Pages/auth/Register";
import Login from "../Pages/auth/Login";
import { Suspense } from "react";
import Spinner from "../Components/Spinner";
import { PrivateRoute, PublicRoute } from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

export default function AppRoutes() {
  const { accessToken } = useAuth();
  const route = [
    {
      path: "/",
      element: (
        <Suspense fallback={<Spinner />}>
          <Rootlayout />
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
