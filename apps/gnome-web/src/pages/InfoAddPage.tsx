import type React from "react";
import { LinkButton } from "../components/LinkButton";

const AddInfoPage: React.FC = () => {
  return (
    <div className="justify-center items-center flex flex-col mt-70">
      <img src="../src/images/Check_circle.svg" alt="checked" />
      <p className="text-[35px] text-center mt-8">
        Dane o nowym krasnoludzie zostały <br /> wprowadzone do bazy.
      </p>
      <div className="flex justify-center">
        <LinkButton to="/admin" label="Admin" />
        <LinkButton to="/admin/addgnome" label="Dodaj kolejnego" />
      </div>

      <div className="bg-[#333] w-49/50 h-48/50 rounded-br-[15px] rounded-bl-[15px] rounded-tr-[15px] rounded-tl-[15px] absolute top-5 mb-5  transform -z-1"></div>
    </div>
  );
};

export default AddInfoPage;
