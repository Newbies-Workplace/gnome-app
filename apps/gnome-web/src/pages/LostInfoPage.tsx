import { BgElement } from "../components/bg_element";
import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";

export const LostInfoPage = () => {
  return (
    <div>
      <Navbar />
      <BgElement className="rounded-b-[15px] rounded-l-[15px]" />
      <header className="text-[40px] text-center">
        Od ostatniego logowania zgłoszono 3 krasnali
      </header>
      <div className="flex flex-col justify-left mt-10 ml-10">
        <div className="flex flex-col justify-left text-left mt-5 ml-5">
          <LinkButton
            to="/admin/lostinfo/currentlost"
            label="Od ostatniego logowania zgłoszono 3 krasnali"
            className="w-[80%] h-[50px] text-[20px] text-[#757A75] bg-[#1E201E] rounded-[15px] transition-all duration-500 hover:text-[22px] hover:bg-[#444444] hover:text-[#FFFFFF]"
          />
        </div>
        <div className="flex flex-col justify-left text-left mt-5 ml-5">
          <LinkButton
            to="/admin/lostinfo/currentlost"
            label="Od ostatniego logowania zgłoszono 3 krasnali"
            className="w-[80%] h-[50px] text-[20px] text-[#757A75] bg-[#1E201E] rounded-[15px] transition-all duration-500 hover:text-[22px] hover:bg-[#444444] hover:text-[#FFFFFF]"
          />
        </div>
        <div className="flex flex-col justify-left text-left mt-5 ml-5">
          <LinkButton
            to="/admin/lostinfo/currentlost"
            label="Od ostatniego logowania zgłoszono 3 krasnali"
            className="w-[80%] h-[50px] text-[20px] text-[#757A75] bg-[#1E201E] rounded-[15px] transition-all duration-500 hover:text-[22px] hover:bg-[#444444] hover:text-[#FFFFFF]"
          />
        </div>
      </div>
    </div>
  );
};
