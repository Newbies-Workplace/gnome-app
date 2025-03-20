import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Admin</h1>
      <LinkButton to="/admin/addgnome" label="Dodaj krasnala do bazy" />
      <LinkButton to="/admin/lostinfo" label="Sprawdź ostatnie zgłoszenia" />
      <BgElement roundedBr="15px" roundedBl="15px" />
    </div>
  );
};
