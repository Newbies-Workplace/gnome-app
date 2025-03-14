import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { href: "/", img: "../src/images/Home.png", text: "Strona Główna" },
    { href: "/gnomes/test", img: "../src/images/gnome.png", text: "Lista" },
    { href: "/report", img: "../src/images/Zglos.png", text: "Zgłoś" },
    { href: "/log", img: "../src/images/Login.png", text: "Logowanie" },
  ];

  return (
    <header className="flex w-screen h-100 justify-center items-center flex-row">
      {links.map((link, index) => (
        <p
          key={index}
          className={`linki p-4 flex items-center justify-center w-1/5 h-16 ${
            location.pathname.startsWith(link.href)
              ? "bg-yellow-500"
              : "bg-gray-800"
          }`}
        >
          <img src={link.img} alt="" className="h-8 w-8 mr-2" />
          <Link to={link.href} className="underline text-white">
            {link.text}
          </Link>
        </p>
      ))}
    </header>
  );
};

export default Navbar;
