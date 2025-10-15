import type React from "react";
import { LinkButton } from "../components/LinkButton";

const AddInfoPage: React.FC = () => {
  return (
    <div className="justify-center items-center flex flex-col mt-70">
      <img src="/Check_circle.svg" alt="checked" />
      <p className="text-[35px] text-center mt-8">
        Dane o nowym krasnoludzie zostały <br /> wprowadzone do bazy.
      </p>
      <div className="flex justify-center">
        <LinkButton
          to="/admin"
          label="Admin"
          className="w-[200px] h-[50px] text-center text-[21px] text-[#757A75] bg-[#1E201E] rounded-[15px] flex items-center justify-center transition-all duration-200 hover:text-[22px] hover:bg-[#444444] hover:text-[#FFFFFF]"
        />
        <LinkButton
          to="/admin/addgnome"
          label="Dodaj kolejnego"
          className="w-[200px] h-[50px] text-center text-[21px] text-[#757A75] bg-[#1E201E] rounded-[15px] flex items-center justify-center transition-all duration-200 hover:text-[22px] hover:bg-[#444444] hover:text-[#FFFFFF]"
        />
      </div>

      <div className="bg-[#333] w-49/50 h-48/50 rounded-br-[15px] rounded-bl-[15px] rounded-tr-[15px] rounded-tl-[15px] absolute top-5 mb-5  transform -z-1" />
    </div>
  );
};

export default AddInfoPage;
