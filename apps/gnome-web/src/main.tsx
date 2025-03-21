import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { GnomePage } from "./pages/GnomePage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { ReportPage } from "./pages/ReportPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={"report"} element={<ReportPage />} />
      <Route path={"gnomes/:gnomeId"} element={<GnomePage />} />
    </Routes>
  </BrowserRouter>,
);
