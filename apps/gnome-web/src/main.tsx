import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddGnomePage } from "./pages/AddGnomePage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { GnomePage } from "./pages/GnomePage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import InfoAddPage from "./pages/InfoAddPage";
import { LogAdminPage } from "./pages/LogAdminPage.tsx";
import { LogPage } from "./pages/LogPage.tsx";
import { LostInfoPage } from "./pages/LostInfoPage.tsx";
import { ReportPage } from "./pages/ReportPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="report" element={<ReportPage />} />
      <Route path="gnomes/:gnomeId" element={<GnomePage />} />
      <Route path="log" element={<LogPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="infoadd" element={<InfoAddPage />} />
      <Route path="lostinfo" element={<LostInfoPage />} />
      <Route path="addgnome" element={<AddGnomePage />} />
      <Route path="logadmin" element={<LogAdminPage />} />
    </Routes>
  </BrowserRouter>,
);
