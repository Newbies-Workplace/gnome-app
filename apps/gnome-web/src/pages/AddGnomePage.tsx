import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import { CircleTracker } from "../components/div_circle";

export const AddGnomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row items-center">
        <LinkButton
          to="/admin"
          label="<"
          className="text-[40px] -mt-5 mr-auto absolute"
        />
        <h1 className="text-[60px] text-center mx-auto">Dodawanie krasnala</h1>
      </div>
      <CircleTracker className="" label="1" />
      <LinkButton to="/admin/infoadd" label="Dodaj" />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px]" />
    </div>
  );
};
