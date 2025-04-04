import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const AdminPage = () => {
  return (
    <div className="row">
      <Navbar />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px]" />
      <header className="text-[40px] text-center">
        Witaj, nazwa użytkownika!
      </header>
      <div className="flex flex-row justify-right gap-10 mt-10 ml-10 ">
        <LinkButton
          to="/admin/addgnome"
          label="Dodaj krasnala do bazy"
          className="w-[215px] h-[150px] text-center text-[21px] text-[#757A75] bg-[#1E201E] rounded-[15px] flex items-center justify-center  hover:bg-[#444444]
           hover:text-[#FFFFFF] hover:w-[230px] hover:h-[165px] hover:text-[23px] transition-all duration-500"
        />
        <LinkButton
          to="/admin/lostinfo"
          label="Sprawdź ostatnie zgłoszenia"
          className="w-[215px] h-[150px] text-center text-[21px] text-[#757A75] bg-[#1E201E] rounded-[15px] flex items-center justify-center  hover:bg-[#444444]
           hover:text-[#FFFFFF] hover:w-[230px] hover:h-[165px] hover:text-[23px] transition-all duration-500"
        />
        <LinkButton
          to="/admin/logadmin"
          label="Wyloguj się"
          className="w-[215px] h-[150px] text-center text-[21px] text-[#757A75] bg-[#1E201E] rounded-[15px] flex items-center justify-center  hover:bg-[#444444]
           hover:text-[#FFFFFF] hover:w-[230px] hover:h-[165px] hover:text-[23px] transition-all duration-500"
        />
      </div>
    </div>
  );
};
