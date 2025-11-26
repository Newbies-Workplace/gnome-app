import PlaceHolder from "@/assets/images/placeholder.png";

function GnomesList() {
  return (
    <div className="flex flex-row w-full">
      <img src={PlaceHolder} alt="gnome" />
      <div className="flex flex-col justify-center flex-1 text-center">
        <div className="text-white font-bold text-xl">Movemenciak</div>
        <div className="text-gray-300 text-l">Psie pole</div>
      </div>
    </div>
  );
}

export default GnomesList;
