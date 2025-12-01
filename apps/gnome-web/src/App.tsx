import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "@/pages/admin";
import BuildDetail from "@/pages/builds/builds-detail-panel";
import BuildsPanel from "@/pages/builds/builds-panel";
import EventsPanel from "@/pages/events/events-panel";
import GnomeEvents from "@/pages/events/gnome-event";
import GnomesPanel from "@/pages/gnomes/gnomes-panel";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import LoginCallback from "@/pages/login-callback";
import { RequireAuth } from "@/pages/requireAuth";
import UserDetail from "@/pages/users/users-detail-panel";
import UsersPanel from "@/pages/users/users-panel";
import { useAuthStore } from "./store/useAuthStore";

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
    element: (
      <RequireAuth>
        <AdminPage />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <GnomesPanel />,
      },
      {
        path: "builds",
        element: <BuildsPanel />,
      },
      {
        path: "builds/:id",
        element: <BuildDetail />,
      },
      {
        path: "events",
        element: <EventsPanel />,
      },
      {
        path: "events/:id",
        element: <GnomeEvents />,
      },
      {
        path: "users",
        element: <UsersPanel />,
      },
      {
        path: "users/:id",
        element: <UserDetail />,
      },
    ],
  },
]);

function App() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    void init();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
