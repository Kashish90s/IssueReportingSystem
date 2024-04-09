import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import User from "./views/User";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Reports from "./views/Reports";
import Home from "./views/Home";
import UserForm from "./views/UserForm";
import Profile from "./views/Profile";
import ManageReports from "./views/ManageReports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/Home" />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/Reports",
        element: <Reports />,
      },
      {
        path: "/Users",
        element: <User />,
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/Manage Reports",
        element: <ManageReports />,
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />,
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
