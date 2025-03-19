import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";

export const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Admin</h1>
      <LinkButton to="/admin/addgnome" label="Dodaj krasnala do bazy" />
      <LinkButton to="/admin/lostinfo" label="Sprawdź ostatnie zgłoszenia" />
    </div>
  );
};
