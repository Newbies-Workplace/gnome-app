import { useAuthStore } from "@/store/useAuthStore";

// todo user powinien nie być nullem po refreshu
// todo user nie powinien miec dostep do tej strony jesli nie jest zalogowany (custom coomponent w routerze)

export default function AdminPage() {
  const { logout, user } = useAuthStore();

  return (
    <div className="bg-black w-screen h-screen text-white">
      <h2 className="text-white">Admin Page</h2>

      <h2>Zalogowano jako {JSON.stringify(user)}</h2>

      <button onClick={logout}>Wyloguj</button>
    </div>
  );
}
