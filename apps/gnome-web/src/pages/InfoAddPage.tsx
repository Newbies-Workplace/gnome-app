import type React from "react";
import { LinkButton } from "../components/LinkButton";

const AddInfoPage: React.FC = () => {
  return (
    <div>
      <LinkButton to="/" label="Strona Główna" />
      <LinkButton to="/admin/addgnome" label="Dodaj kolejnego" />
    </div>
  );
};

export default AddInfoPage;
