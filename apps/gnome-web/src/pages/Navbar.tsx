import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { href: "/", img: "../src/images/Home.png", text: "Strona Główna" },
    { href: "/gnomes/test", img: "../src/images/gnome.png", text: "Lista" },
    { href: "/report", img: "../src/images/Zglos.png", text: "Zgłoś" },
    { href: "/log", img: "../src/images/Login.png", text: "Logowanie" },
    { href: "/logadmin", img: "../src/images/Admin.png", text: "Admin" },
  ];

  return (
    <header className={"flex w-screen h-100 flex-row"}>
      {links.map((link, index) => {
        const isActive = location.pathname === link.href;
        return (
          <section
            key={index}
            tabIndex={isActive ? 0 : -1}
            className={`linki p-4 flex items-center justify-center w-1/5 h-16 ${
              isActive ? "bg-yellow-500" : "bg-gray-800"
            }`}
          >
            <img src={link.img} alt="" className="h-8 w-8 mr-2" />
            <a href={link.href} className="underline text-white">
              {link.text}
            </a>
          </section>
        );
      })}
    </header>
  );
};

export default Navbar;
