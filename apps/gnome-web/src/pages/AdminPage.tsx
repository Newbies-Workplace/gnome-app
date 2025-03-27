import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const AdminPage = () => {
  return (
    <div className="row">
      <Navbar />
      <BgElement roundedBr="15px" roundedBl="15px" />
      <header className="text-[40px] text-center">
        Witaj, nazwa użytkownika!
      </header>
      <div className="flex flex-row justify-right gap-10 mt-10 ml-10">
        <LinkButton
          to="/admin/addgnome"
          label="Dodaj krasnala do bazy"
          width="200px"
          height="150px"
          text="20px"
        />
        <LinkButton
          to="/admin/lostinfo"
          label="Sprawdź ostatnie zgłoszenia"
          width="200px"
          height="150px"
          text="20px"
        />
        <LinkButton
          to="/admin/logadmin"
          label="Wyloguj się"
          width="200px"
          height="150px"
          text="20px"
        />
      </div>
    </div>
  );
};
