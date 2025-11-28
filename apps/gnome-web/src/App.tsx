import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "@/pages/admin";
import BuildsPanel from "@/pages/builds/builds-panel";
import EventsPanel from "@/pages/events/events-panel";
import GnomeDetails from "@/pages/gnomes/[gnome-id]";
import GnomeEdit from "@/pages/gnomes/[gnome-id]-edit";
import GnomeAdd from "@/pages/gnomes/gnome-add";
import GnomesPanel from "@/pages/gnomes/gnomes-panel";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import LoginCallback from "@/pages/login-callback";
import { RequireAuth } from "@/pages/requireAuth";
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
        path: "gnomes/add",
        element: <GnomeAdd />,
      },
      {
        path: "gnomes/edit/:id",
        element: <GnomeEdit />,
      },
      {
        path: "gnomes/:id",
        element: <GnomeDetails />,
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
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    void init();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
