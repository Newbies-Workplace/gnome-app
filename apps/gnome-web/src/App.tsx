import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { RequireAuth } from "@/components/require-auth.tsx";
import AdminPage from "@/pages/admin";
import BuildDetail from "@/pages/buildings/building-details.tsx";
import BuildingListPanel from "@/pages/buildings/building-list-panel.tsx";
import EventsPanel from "@/pages/events/events-panel";
import GnomeEvents from "@/pages/events/gnome-event";
import GnomeAdd from "@/pages/gnomes/gnome-add";
import GnomeDetails from "@/pages/gnomes/gnome-details.tsx";
import GnomeEdit from "@/pages/gnomes/gnome-edit.tsx";
import GnomeListPanel from "@/pages/gnomes/gnome-list-panel.tsx";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import LoginCallback from "@/pages/login-callback";
import Privacy from "@/pages/privacy";
import UserDetail from "@/pages/users/users-detail-panel";
import UsersPanel from "@/pages/users/users-panel";
import AccountDeleteTutorialPage from "./pages/account-delete-tutorial";
import { useAuthStore } from "./store/useAuthStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "privacy",
    element: <Privacy />,
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
    path: "account-delete-tutorial",
    element: <AccountDeleteTutorialPage />,
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
        element: <GnomeListPanel />,
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
        path: "buildings",
        element: <BuildingListPanel />,
      },
      {
        path: "buildings/:id",
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
  const { init } = useAuthStore();

  useEffect(() => {
    void init();
  }, [init]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors theme="dark" duration={1000} position="top-right" />
    </>
  );
}

export default App;
