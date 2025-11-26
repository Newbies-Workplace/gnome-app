import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "@/pages/admin";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import LoginCallback from "@/pages/login-callback";
import { RequireAuth } from "@/pages/requireAuth";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    void init();
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path={"login"}>
        <Route index element={<LoginPage />} />
        <Route path="callback" element={<LoginCallback />} />
      </Route>

      <Route
        path="admin"
        element={
          <RequireAuth>
            <AdminPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
