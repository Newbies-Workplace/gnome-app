import { Link } from "react-router-dom";
import loginIcon from "@/assets/icons/login.svg";
import backgroundImage from "@/assets/images/background.png";
import phoneImage from "@/assets/images/phone.png";
import teamBuildMap from "@/assets/images/teamBuildMap.png";
import teamMap from "@/assets/images/teamMap.png";

function HomePage() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full p-5 bg-transparent">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-5xl font-Afacad">Krasnal GO</h1>
        </div>

        <div className="flex items-center mt-3">
          <div className="flex-grow border-t border-white" />
          <div className="mx-4 w-100" />
          <div className="flex-grow border-t border-white" />
        </div>
      </div>

      <div className="overflow-y-auto px-5 pt-10 h-[calc(100vh-20px)]">
        <div className="mt-10 mb-20">
          <h2 className="text-white text-center text-6xl font-bold font-Afacad">
            Pobyt we Wrocławiu nie musi być nudny - odkrywaj krasnale i walcz o
            dominacje!
          </h2>
          <h4 className="text-gray-300 text-2xl mt-2 font-Afacad text-center">
            Dołącz do jednej z trzech drużyn, eksploruj swoją dzielnicę i buduj
            fortyfikacje, które inni będą próbowali zniszczyć.
          </h4>
        </div>

        <div className="mt-10 mb-20 flex flex-row items-center justify-center gap-10 sm:gap-20 md:gap-40 lg:gap-60">
          <div className="flex flex-col space-y-2 w-64 sm:w-72 md:w-80 lg:w-96">
            <img src={phoneImage} alt="phone" className="w-full h-auto" />
          </div>
          <div className="flex flex-col justify-between ml-4 max-w-xl">
            <h1 className="text-white text-6xl text-center font-bold font-Afacad">
              EKSPLORUJ WROCŁAW
            </h1>
            <h4 className="text-gray-300 text-center text-2xl mt-2 font-Afacad">
              Chodź sam lub ze znajomymi i odkrywaj różne krasnale!
            </h4>
          </div>
        </div>

        <div className="flex flex-col mt-10 mb-20 items-center">
          <h1 className="text-white text-6xl font-bold text-center font-Afacad">
            DOŁĄCZ DO DRUŻYNY
          </h1>
          <h4 className="text-gray-300 text-2xl mt-2 font-Afacad">
            Wybierz jedną z trzech frakcji i walcz o przewagę!
          </h4>
          <div className="flex flex-col space-y-2 mt-8 max-w-3xl">
            <img
              src={teamMap}
              alt="teamMap"
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>

        {/* Section 4 */}
        <div className="flex flex-col mt-10 mb-20 items-center">
          <h1 className="text-white text-6xl font-bold text-center font-Afacad">
            BUDUJ I WZMACNIAJ
          </h1>
          <h4 className="text-gray-300 text-2xl mt-2 font-Afacad">
            Stawiaj budowle, broń je przed atakami przeciwników!
          </h4>
          <div className="flex flex-col space-y-2 mt-8 max-w-3xl">
            <img
              src={teamBuildMap}
              alt="teamBuildMap"
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>

        {/* Section 5 */}
        <div className="mt-10 mb-20 flex flex-row items-center justify-center gap-10 sm:gap-20 md:gap-40 lg:gap-60">
          <div className="flex flex-col space-y-2 max-w-xl">
            <h1 className="text-white text-center text-6xl font-bold font-Afacad">
              RYWALIZUJ LOKALNIE
            </h1>
            <h4 className="text-gray-300 text-center text-2xl mt-2 font-Afacad">
              Wrocław staje się polem gry!
            </h4>
          </div>
          <div className="flex flex-col justify-between ml-4 w-64 sm:w-72 md:w-80 lg:w-96">
            <img src={phoneImage} alt="phone" className="w-full h-auto" />
          </div>
        </div>

        {/* Section 6 */}
        <div className="flex flex-col mt-10 mb-20 items-center">
          <h1 className="text-white text-6xl font-bold text-center font-Afacad">
            DLACZEGO WARTO?
          </h1>
          <ul className="text-white text-2xl mt-5 space-y-2 text-left font-Afacad">
            <li className="before:content-['->'] before:mr-2">
              <strong>Ruch i zabawa</strong> - gra zachęca do spacerów i
              aktywności
            </li>
            <li className="before:content-['->'] before:mr-2">
              <strong>Strategia i współpraca</strong> - razem z drużyną
              planujesz obronę i ataki
            </li>
            <li className="before:content-['->'] before:mr-2">
              <strong>Niekończąca się przygoda</strong> - wiele krasnali, wielka
              ilość wydarzeń, buduj, wzmacniaj i niszcz budowle, które nie stoją
              na zawsze!
            </li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="flex flex-col mt-10 mb-20 items-center">
          <h1 className="text-white text-6xl font-bold text-center font-Afacad">
            POBIERZ TERAZ!
          </h1>
          <h4 className="text-gray-300 text-2xl mt-2 font-Afacad">
            Gotowy na krasnalową przygodę we Wrocławiu? Pobierz aplikację i
            wybierz drużynę, zanim zrobią to inni!
          </h4>

          <div className="mt-6 mb-6 flex flex-row flex-wrap items-center justify-center gap-10 sm:gap-20 md:gap-40 lg:gap-40">
            <div className="flex flex-col space-y-2 w-64 sm:w-72 md:w-80 lg:w-96">
              <img src={phoneImage} alt="phone" className="w-full h-auto" />
            </div>
            <div className="flex flex-col space-y-2 w-64 sm:w-72 md:w-80 lg:w-96">
              <img src={phoneImage} alt="phone" className="w-full h-auto" />
            </div>
            <div className="flex flex-col space-y-2 w-64 sm:w-72 md:w-80 lg:w-96">
              <img src={phoneImage} alt="phone" className="w-full h-auto" />
            </div>
          </div>

          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-primary-color text-white text-2xl w-100 px-6 py-3 rounded-4xl hover:opacity-90 transition mt-10 mb-10 font-Afacad">
              Pobierz na Android
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
