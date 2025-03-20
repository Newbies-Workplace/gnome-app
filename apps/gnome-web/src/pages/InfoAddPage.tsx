import type React from "react";
import { LinkButton } from "../components/LinkButton";
import { BgElement } from "../components/bg_element";

const AddInfoPage: React.FC = () => {
  return (
    <div>
      <LinkButton to="/admin" label="Admin" />
      <LinkButton to="/admin/addgnome" label="Dodaj kolejnego" />
      <BgElement roundedBr="15px" roundedBl="15px" />
    </div>
  );
};

export default AddInfoPage;
