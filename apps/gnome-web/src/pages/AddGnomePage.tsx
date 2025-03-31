import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import { CircleTracker } from "../components/div_circle";

export const AddGnomePage = () => {
  return (
    <div>
      <Navbar />
      <CircleTracker className="" label="1" />
      <div className="flex flex-row items-center">
        <a href="/admin">
          <img src="../src/images/Back.svg" alt="Wróć" className="ml-10" />
        </a>
        <h1 className="text-[40px] text-center mx-auto">Dodawanie krasnala</h1>
      </div>
      <LinkButton
        to="/admin/infoadd"
        label="Dodaj"
        className=" ml-[50px] w-[200px] h-[50px] text-center text-[21px] text-[#757A75] bg-[#1E201E] rounded-[15px] flex items-center justify-center transition-all duration-200 hover:text-[22px] hover:bg-[#444444] hover:text-[#FFFFFF]"
      />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px]" />
    </div>
  );
};
