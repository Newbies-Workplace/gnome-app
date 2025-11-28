import { Link } from "react-router-dom";
import ClockIcon from "@/assets/icons/clock-icon.svg";
import BuildPlaceHolder from "@/assets/images/placeholder.png";
import { Item } from "@/components/ui/item";

function BuildsList() {
  return (
    <Item className="w-full h-20 rounded-4xl bg-primary-gray hover:bg-white/10 transition p-4">
      <Link to="1">
        <div className="flex w-full h-full items-center text-left text-white font-Afacad">
          <img
            src={BuildPlaceHolder}
            alt="user"
            className="w-16 h-16 object-cover rounded flex-shrink-0"
          />
          <div className="flex flex-col ml-4 h-16 justify-between flex-1">
            <div className="text-white font-bold text-lg leading-tight">
              Strażnicza
            </div>
            <div className="flex flex-row justify-end items-center">
              <img src={ClockIcon} alt="clock" className="w-4 h-4 mr-1" />
              <span className="text-gray-300 text-sm">15h</span>
            </div>
            <div className="text-gray-400 text-xs leading-tight">Autor</div>
          </div>
        </div>
      </Link>
    </Item>
  );
}

export default BuildsList;
