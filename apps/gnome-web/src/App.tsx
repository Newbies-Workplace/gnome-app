import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pages/login" element={<LoginPage />} />
      <Route path="/pages/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
