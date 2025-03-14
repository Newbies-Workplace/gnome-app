import { useParams } from "react-router";

export const GnomePage = () => {
  const { gnomeId } = useParams();

  return (
    <div>
      <header
        className={
          "flex w-screen h-screen justify-center items-center flex-col"
        }
      >
        <p className="strona_glowna">
          <img src="../src/images/Home.png" />{" "}
          <a href="/" className={"underline"}>
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
      </header>
      <h1>Gnomes, id: {gnomeId}</h1>
    </div>
  );
};
