import UserPlaceHolder from "@/assets/images/placeholder-user.png";
import { Item } from "@/components/ui/item";

function UsersList() {
  return (
    <Item className="w-full h-20 rounded-4xl bg-primary-gray hover:bg-white/10 transition p-4">
      <div className="flex w-full h-full items-center text-left text-white font-Afacad">
        <img
          src={UserPlaceHolder}
          alt="user"
          className="w-16 h-16 object-cover rounded flex-shrink-0"
        />
        <div className="flex flex-col ml-4 h-16 justify-center flex-1">
          <div className="text-white font-bold text-lg leading-tight">
            Jacek Wróbel
          </div>
        </div>
      </div>
    </Item>
  );
}

export default UsersList;
