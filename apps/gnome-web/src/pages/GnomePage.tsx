import { useParams } from "react-router";

export const GnomePage = () => {
  const { gnomeId } = useParams();

  return (
    <div>
      <h1>Gnomes, id: {gnomeId}</h1>
      <p>Welcome to the Gnome Web App!</p>
    </div>
  );
};
