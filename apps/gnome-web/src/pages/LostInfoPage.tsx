import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const LostInfoPage = () => {
  return (
    <div>
      <Navbar />
      <BgElement roundedBr="15px" roundedBl="15px" />
      <h1>Od ostatniego logowania zgłoszono 3 krasnali</h1>
    </div>
  );
};
