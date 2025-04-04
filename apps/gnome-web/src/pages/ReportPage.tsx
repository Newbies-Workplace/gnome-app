import { FileInput } from "../components/FileInput";
import { Input } from "../components/Input";
import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import { CircleTracker } from "../components/div_circle";
import InteractiveMapPicker from "../components/mapPicker/InternalMapPicker";

export const ReportPage = () => {
  return (
    <div>
      <Navbar />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px] rounded-tr-[15px] sm:h-80/50 md:h-80/50 lg:h-80/50" />
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
      <div className="items-left justify-left flex flex-col ml-40 mt-10 ">
        <div className="flex flex-col justify-center gap-10">
          <div className="flex flex-col">
            <CircleTracker
              label="1"
              text="Wprowadź nazwę zaginionego krasnala"
              className="mt-0"
            />
            <Input type="text" placeholder="Nazwa" className="ml-[60px]" />
          </div>
        </div>
        <div>
          <CircleTracker
            label="2"
            text="Prześlij zdjęcie miejsca w którym krasnal się znajdował"
          />
          <FileInput />
        </div>
        <div>
          <CircleTracker
            label="3"
            text="Wskaż poprzednią lokalizacje krasnala:"
          />
          <div className=" h-[250px] w-[400px] ml-[60px]">
            <InteractiveMapPicker />
          </div>
        </div>
        <div className="flex flex-col">
          <CircleTracker
            label="4"
            text="Podaj dokładny adres, gdzie zabrakło krasnala: "
          />
          <Input type="text" placeholder="Adres" className="ml-[60px]" />
        </div>
        <div className="flex flex-col">
          <CircleTracker label="5" text="Podaj swoje imię i nazwisko" />
          <Input
            type="text"
            placeholder="Imię i nazwisko"
            className="ml-[60px]"
          />
          <div className="flex flex-row mt-10">
            <CircleTracker label="7" className="-mt-15" />
            <LinkButton
              to="/admin/infoadd"
              label="Zgłoś"
              className="w-[200px] h-[50px] ml-1 text-center text-[21px] text-[#fff] bg-[#D6484A] 
                rounded-[20px] flex items-center justify-center transition-all duration-200 hover:text-[22px] 
                hover:bg-[#D96466] hover:text-[#FFFFFF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
