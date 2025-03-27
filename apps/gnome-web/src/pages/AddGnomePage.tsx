import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const AddGnomePage = () => {
  return (
    <div>
      <Navbar />
      <BgElement roundedBr="15px" roundedBl="15px" />
      <a href="/admin">
        <img
          src="../src/images/Back.svg"
          alt="wróć"
          className="ml-[40px] mt-[10px]"
        />
      </a>
      <div className=" ml-[40px] mt-[10px]">
        <LinkButton
          to="/admin/infoadd"
          label="Dodaj"
          width="200px"
          height="50px"
        />
      </div>
    </div>
  );
};
