import { DatePickerInput } from "../components/DatePickerInput";
import { FileInput } from "../components/FileInput";
import { Input } from "../components/Input";
import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import { CircleTracker } from "../components/div_circle";

export const AddGnomePage = () => {
  return (
    <div>
      <Navbar />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px] h-300" />
      <div>
        <a href="/admin">
          <img
            src="../src/images/Back.svg"
            alt="Wróć"
            className="ml-15 mt-5 absolute h-[30px] w-[30px]"
          />
        </a>
      </div>
      <h1 className="text-[40px] text-center mx-auto">Dodawanie krasnala</h1>
      <div className="items-left justify-left flex flex-col ml-30 mt-10 ">
        <div className="flex flex-col justify-center gap-10">
          <div className="flex flex-col">
            <CircleTracker label="1" text="Wprowadź nazwę krasnala" />
            <Input type="text" placeholder="Nazwa" className="ml-[50px]" />
          </div>
        </div>
        <div>
          <CircleTracker label="2" text="dodaj zdjęcie krasnala" />
          <FileInput />
        </div>
        <div className="flex flex-col">
          <CircleTracker label="3" text="Wybierz datę powstania krasnala" />
          <DatePickerInput
            className="ml-[50px]"
            onChange={(): void => {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div>
          <CircleTracker label="4" text="Opis" />
        </div>
        <div>
          <CircleTracker label="5" text="Wybierz lokalizację krasnala" />
        </div>
        <div className="flex flex-col">
          <CircleTracker label="6" text="Podaj dokładny adres krasnala" />
          <Input type="text" placeholder="Adres" className="ml-[50px]" />
        </div>
        <div className="flex flex-row">
          <CircleTracker label="7" />
          <div className="flex ml-10">
            <LinkButton
              to="/admin/infoadd"
              label="Dodaj"
              className=" ml-10 w-[200px] h-[50px] text-center text-[21px] text-[#fff] bg-[#D6484A] 
                rounded-[30px] flex items-center justify-center transition-all duration-200 hover:text-[22px] 
                hover:bg-[#D96466] hover:text-[#FFFFFF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
