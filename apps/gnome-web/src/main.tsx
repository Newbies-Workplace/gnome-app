import { createRoot } from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddGnomePage } from "./pages/AddGnomePage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { GnomePage } from "./pages/GnomePage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import InfoAddPage from "./pages/InfoAddPage";
import { LogAdminPage } from "./pages/LogAdminPage.tsx";
import { LostInfoPage } from "./pages/LostInfoPage.tsx";
import { ReportPage } from "./pages/ReportPage.tsx";

const clientId = import.meta.env.VITE_PUBLIC_GOOGLE_WEB_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="gnomes/:gnomeId" element={<GnomePage />} />
        <Route path="admin">
          <Route index element={<AdminPage />} />
          <Route path="infoadd" element={<InfoAddPage />} />
          <Route path="lostinfo" element={<LostInfoPage />} />
          <Route path="addgnome" element={<AddGnomePage />} />
          <Route path="logadmin" element={<LogAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>,
);
