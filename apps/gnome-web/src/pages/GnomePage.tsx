import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import InteractiveMapPicker from "../components/mapPicker/InternalMapPicker";

export const GnomePage = () => {
  return (
    <div>
      <Navbar />
      <BgElement className="rounded-[15px]" />
      <InteractiveMapPicker />
    </div>
  );
};
