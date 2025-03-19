import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";

export const AddGnomePage = () => {
  return (
    <div>
      <Navbar />
      <h1>Dodawanie krasnala</h1>
      <LinkButton to="/admin" label="Powrót" />
      <LinkButton to="/admin/infoadd" label="Dodaj" />
    </div>
  );
};
