import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const LogAdminPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Zaloguj się jako administrator</h1>
      <LinkButton to="/admin" label="Zaloguj" />
      <BgElement roundedBr="15px" roundedBl="15px" />
    </div>
  );
};
