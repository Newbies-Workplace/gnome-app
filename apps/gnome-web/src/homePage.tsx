import "./App.css";
import backgroundImage from "./assets/images/background.png";
import phoneImage from "./assets/images/phone.png";

function App() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/*Header*/}
      <div className="fixed top-0 left-0 w-full p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl">Krasnale</h1>
          <button className="bg-[#D6484A] text-white px-4 py-2 rounded hover:opacity-90 transition">
            Zaloguj się
          </button>
        </div>
        <div className="flex items-center mt-3">
          <div className="flex-grow border-t border-white" />
          <div className="mx-4 w-100" />
          <div className="flex-grow border-t border-white" />
        </div>
        {/*Sekcja 1*/}
        <div className="mt-4 mb-4">
          <h2 className="text-white text-5xl">
            Pobyt we Wrocławiu nie musi być nudny - odkrywaj krasnale i walcz o
            dominacje!
          </h2>
          <h4 className="text-gray-300 text-3xl">
            Dołącz do jednej z trzech drużyn, eksploruj swoją dzielnicę i buduj
            fortyfikacje, które inni bedą próbowali zniszczyć.
          </h4>
        </div>
        {/*Sekcja 2 */}
        <div className="mt-4 mb-4 flex flex-row items-center justify-center gap-10 sm:gap-20 md:gap-40 lg:gap-60">
          <div className="flex flex-col space-y-2">
            <img src={phoneImage} alt="phone" />
          </div>
          <div className="flex flex-col justify-between ml-4">
            <h1 className="text-white text-5xl">EKSPLORUJ WROCŁAW</h1>
            <h4 className="text-gray-300 text-3xl">
              Chodź sam lub ze znajomymi i odkrywaj różne krasnale!
            </h4>
          </div>
        </div>
        {/*Sekcja 5*/}
        <div className="mt-4 mb-4 flex flex-row items-center justify-center gap-10 sm:gap-20 md:gap-40 lg:gap-60">
          <div className="flex flex-col space-y-2">
            <h1 className="text-white text-5xl">RYWALIZUJ LOKALNIE</h1>
            <h4 className="text-gray-300 text-3xl">
              Wrocław staje się polem gry!
            </h4>
          </div>
          <div className="flex flex-col justify-between ml-4">
            <img src={phoneImage} alt="phone" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
