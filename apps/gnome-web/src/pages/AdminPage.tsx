export const AdminPage = () => {
  return (
    <header
      className={"flex w-screen h-screen justify-center items-center flex-col"}
    >
      <p className="strona_glowna">
        <img src="../src/images/Home.png" />{" "}
        <a href="/admin" className={"underline"}>
          Strona Główna
        </a>
      </p>
      <p className="lista">
        <img src="../src/images/gnome.png" />{" "}
        <a href="/gnomes/test" className={"underline"}>
          Lista
        </a>
      </p>
      <p className="zglos">
        <img src="../src/images/Zglos.png" />{" "}
        <a href="/report" className={"underline"}>
          Zgłoś
        </a>
      </p>
      <p className="logowanie">
        <img src="../src/images/Login.png" />{" "}
        <a href="/log" className={"underline"}>
          Logowanie
        </a>
      </p>
      <p className="admin">
        <img src="../src/images/Admin.png" />{" "}
        <a href="/admin" className={"underline"}>
          Admin
        </a>
      </p>
    </header>
  );
};
