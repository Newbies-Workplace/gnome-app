import PlaceHolder from "@/assets/images/placeholder.png";
import { Item } from "@/components/ui/item";

function GnomesList() {
  return (
    <Item className="w-full h-20 rounded-4xl bg-primary-gray hover:bg-white/10 transition p-4">
      <div className="flex w-full h-full items-center text-left text-white font-Afacad">
        <img
          src={PlaceHolder}
          alt="gnome"
          className="w-16 h-16 object-cover rounded flex-shrink-0"
        />
        <div className="flex flex-col ml-4 h-16 justify-center flex-1">
          <div className="text-white font-bold text-lg leading-tight">
            Movemenciak
          </div>
          <div className="text-gray-300 text-sm leading-tight">Psie pole</div>
        </div>
      </div>
    </Item>
  );
}

export default GnomesList;
