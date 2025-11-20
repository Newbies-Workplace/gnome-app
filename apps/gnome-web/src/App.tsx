import { Route, Routes } from "react-router-dom";
import HomePage from "./homePage";
import Login from "./login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
