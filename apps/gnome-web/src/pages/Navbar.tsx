import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { href: "/", img: "../src/images/Home.png", text: "Strona Główna" },
    { href: "/gnomes/test", img: "../src/images/gnome.png", text: "Lista" },
    { href: "/report", img: "../src/images/Zglos.png", text: "Zgłoś" },
    { href: "/log", img: "../src/images/Login.png", text: "Logowanie" },
    { href: "/admin", img: "../src/images/Admin.png", text: "Admin" },
  ];

  return (
    <header className={"flex w-screen h-100 flex-row"}>
      {links.map((link, index) => {
        const isActive = location.pathname === link.href;
        return (
          <a href={link.href} className="link-section">
            <section
              key={index}
              className={`nav-section ${isActive ? "active" : ""}`}
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
