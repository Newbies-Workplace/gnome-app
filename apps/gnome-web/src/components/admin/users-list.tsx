import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Item } from "@/components/ui/item.tsx";
import { useUserStore } from "@/store/useUserStore";

function UsersList() {
  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!users || users.length === 0)
    return <p>Brak użytkowników do wyświetlenia</p>;

  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      {users.map((user) => (
        <Link to={`/admin/users/${user.id}`} key={user.id}>
          <Item className="hover:bg-white/10" size={"sm"}>
            <div className="flex w-full h-full items-center text-left text-white font-Afacad">
              <img
                src={user.pictureUrl}
                alt="userAvatar"
                className="w-16 h-16 object-cover rounded-4xl flex-shrink-0"
              />
              <div className="flex flex-col ml-4 h-16 justify-center flex-1">
                <div className="text-white font-bold text-lg leading-tight">
                  {user.name}
                </div>
              </div>
            </div>
          </Item>
        </Link>
      ))}
    </div>
  );
}

export default UsersList;
