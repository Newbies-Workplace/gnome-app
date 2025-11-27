import UsersList from "@/components/ui/admin/users-list";
import { Input } from "@/components/ui/input";

function UsersPanel() {
  return (
    <div className="overflow-y-auto flex flex-col h-full gap-2">
      <div className="text-center text-white text-3xl font-bold font-Afacad">
        Panel Użytkowników
      </div>
      <Input
        id="search-user"
        type="text"
        placeholder="Wyszukaj użytkownika..."
        className="text-white font-Afacad rounded-4xl bg-[#282B28] border-none outline-none"
      />
      <UsersList />
    </div>
  );
}

export default UsersPanel;
