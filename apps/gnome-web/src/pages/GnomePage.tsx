import { useParams } from "react-router";

export const GnomePage = () => {
  const { gnomeId } = useParams();

  return (
    <div
      className={"flex w-screen h-screen justify-center items-center flex-col"}
    >
      <h1>Gnomes, id: {gnomeId}</h1>
      <p>Welcome to the Gnome Web App!</p>
    </div>
  );
};
