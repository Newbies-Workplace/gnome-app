import { useLocation } from "react-router-dom";
import { cn } from "../lib/utils.ts";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { href: "/", img: "/Home.svg", text: "Strona Główna" },
    { href: "/gnomes/test", img: "/Gnome.svg", text: "Lista" },
    { href: "/report", img: "/Zglos.svg", text: "Zgłoś" },
    { href: "/admin/logadmin", img: "/Admin.svg", text: "Admin" },
  ];

  return (
    <header
      className={
        "ml-[1%] text-[#dadada] py-2 text-center h-24 w-[98%] flex flex-row justify-center items-center"
      }
    >
      {links.map((link, index) => {
        const isActive = location.pathname === link.href;
        return (
          <a
            href={link.href}
            className="w-1/4 h-full flex justify-center items-center no-underline"
          >
            <section
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className={cn(
                "w-full h-full flex justify-center items-center bg-[#444] text-[#dadada] rounded-t-[15px]",
                `${
                  isActive ||
                  (
                    link.href === "/admin/logadmin" &&
                      location.pathname.startsWith("/admin")
                  )
                    ? "bg-[#333]"
                    : "hover:bg-[#555]"
                }`,
              )}
            >
              <img src={link.img} alt="???" className="h-8 w-8 mr-2" />
              {link.text}
            </section>
          </a>
        );
      })}
    </header>
  );
};

export default Navbar;
