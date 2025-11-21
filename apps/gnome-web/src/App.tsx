import { Route, Routes } from "react-router-dom";
import AdminPage from "./adminPage";
import HomePage from "./homePage";
import LoginPage from "./loginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/adminPage" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
