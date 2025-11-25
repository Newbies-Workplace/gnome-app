import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "@/pages/admin";
import BuildsPanel from "@/pages/builds/builds-panel";
import EventsPanel from "@/pages/events/events-panel";
import GnomePanel from "@/pages/gnomes/gnomes-panel";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import LoginCallback from "@/pages/login-callback";
import UsersPanel from "@/pages/users/users-panel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "login",
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "callback",
        element: <LoginCallback />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
    children: [
      {
        index: true,
        element: <GnomePanel />,
      },
      {
        path: "builds",
        element: <BuildsPanel />,
      },
      {
        path: "events",
        element: <EventsPanel />,
      },
      {
        path: "users",
        element: <UsersPanel />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
