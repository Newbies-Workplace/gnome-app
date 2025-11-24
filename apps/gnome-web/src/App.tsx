import { Route, Routes } from "react-router-dom";
import AdminPage from "@/pages/admin";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import LoginCallback from "@/pages/login-callback";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path={"login"}>
        <Route index element={<LoginPage />} />
        <Route path="callback" element={<LoginCallback />} />
      </Route>

      <Route path="admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
