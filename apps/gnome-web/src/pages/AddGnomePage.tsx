import { Input } from "../components/Input";
import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import { CircleTracker } from "../components/div_circle";

export const AddGnomePage = () => {
  return (
    <div>
      <Navbar />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px]" />
      <div>
        <a href="/admin">
          <img
            src="../src/images/Back.svg"
            alt="Wróć"
            className="ml-10 mt-5 absolute"
          />
        </a>
      </div>
      <h1 className="text-[40px] text-center mx-auto">Dodawanie krasnala</h1>
      <div className="flex flex-col justify-center gap-10 mt-10 ml-10 ">
        <div className="flex flex-row">
          <CircleTracker label="1" />
          <div className="flex flex-col gap-0 ml-10">
            <p className="text-[0,5rem] text-[#757A75]">
              Wprowadź nazwę krasnala
            </p>
            <Input type="text" placeholder="Nazwa" />
          </div>
        </div>
        <div>
          <CircleTracker label="2" />
        </div>
        <div>
          <CircleTracker label="3" />
        </div>
        <div>
          <CircleTracker label="4" />
        </div>
        <div>
          <CircleTracker label="5" />
        </div>
        <div>
          <CircleTracker label="6" />
        </div>
        <div>
          <CircleTracker label="7" />
        </div>
        <LinkButton
          to="/admin/infoadd"
          label="Dodaj"
          className=" ml-[50px] w-[200px] h-[50px] text-center text-[21px] text-[#757A75] bg-[#1E201E] 
            rounded-[15px] flex items-center justify-center transition-all duration-200 hover:text-[22px] 
            hover:bg-[#444444] hover:text-[#FFFFFF]"
        />
      </div>
    </div>
  );
};
