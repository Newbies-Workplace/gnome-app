import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const LostInfoPage = () => {
  return (
    <div>
      <Navbar />
      <BgElement roundedBr="15px" roundedBl="15px" />
      <header className="text-[40px] text-center">
        Od ostatniego logowania zgłoszono 3 krasnali
      </header>
      <div className="flex flex-col justify-left text-left mt-5 ml-5">
        <LinkButton
          to="/admin/lostinfo/currentlost"
          label="Od ostatniego logowania zgłoszono 3 krasnali"
          className="W-[500px] H-[150px] text-[20px] text-[#757A75] bg-[#1E201E] rounded-[15px]"
        />
        <LinkButton
          to="/admin/lostinfo/currentlost"
          label="Od ostatniego logowania zgłoszono 3 krasnali"
          className="W-[500px] H-[150px] text-[20px] text-[#757A75] bg-[#1E201E] rounded-[15px]"
        />
        <LinkButton
          to="/admin/lostinfo/currentlost"
          label="Od ostatniego logowania zgłoszono 3 krasnali"
          className="W-[500px] H-[150px] text-[20px] text-[#757A75] bg-[#1E201E] rounded-[15px]"
        />
      </div>
    </div>
  );
};
