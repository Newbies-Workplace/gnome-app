import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const AddGnomePage = () => {
  return (
    <div>
      <Navbar />
      <h1>Dodawanie krasnala</h1>
      <LinkButton to="/admin" label="Powrót" />
      <LinkButton to="/admin/infoadd" label="Dodaj" />
      <BgElement roundedBr="15px" roundedBl="15px" />
    </div>
  );
};
