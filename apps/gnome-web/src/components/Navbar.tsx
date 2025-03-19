import { useLocation } from "react-router-dom";
import { cn } from "../lib/utils.ts";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { href: "/", img: "../src/images/Home.png", text: "Strona Główna" },
    { href: "/gnomes/test", img: "../src/images/gnome.png", text: "Lista" },
    { href: "/report", img: "../src/images/Zglos.png", text: "Zgłoś" },
    { href: "/admin", img: "../src/images/Admin.png", text: "Admin" },
  ];

  return (
    <header
      className={
        "text-[#fff] py-2 text-center h-24 w-full flex flex-row justify-center items-center bg-[#333]"
      }
    >
      {links.map((link, index) => {
        const isActive = location.pathname === link.href;
        return (
          <a
            href={link.href}
            className="w-1/4 h-full flex justify-center items-center no-underline text-white;"
          >
            <section
              key={index}
              className={cn(
                `w-49/50 h-full flex justify-center items-center bg-[#444] text-[#fff] rounded-md`,
                `${isActive ? "bg-[#333];" : "hover:bg-[#555]"}`,
              )}
            >
              <img src={link.img} alt="" className="h-8 w-8 mr-2" />
              {link.text}
            </section>
          </a>
        );
      })}
    </header>
  );
};

export default Navbar;
