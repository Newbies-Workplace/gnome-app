import "./App.css";
import backgroundImage from "./assets/images/background-image.png";

function App() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-repeat overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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
      </div>
    </div>
  );
}

export default App;
