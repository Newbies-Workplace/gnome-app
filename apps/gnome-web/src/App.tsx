import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GnomeDetails from "@/components/ui/admin/gnome-details";
import AdminPage from "@/pages/admin";
import BuildsPanel from "@/pages/builds/builds-panel";
import EventsPanel from "@/pages/events/events-panel";
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
