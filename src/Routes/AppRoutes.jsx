import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../Pages/Home/Home";
import EditTask from "../Pages/Task/EditTask"
import Newtask from "../Pages/Task/Newtask";
import Mytask from "../Pages/Task/Mytask";
import Rootlayout from "../Layout/Rootlayout";


export default function AppRoutes() {
  const route = [
    {
      path: "/",
      element: <Rootlayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "auth/newtask",
          element: <Newtask />,
        },
        {
          path: "auth/editTask",
          element: <EditTask/>
        },
        {
          path: "auth/mytask",
          element: <Mytask />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(route);

  return <RouterProvider router={router} />;
}
