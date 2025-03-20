import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";

export const LogAdminPage = () => {
  const LogButtonStyle: React.CSSProperties = {
    backgroundColor: "#1E201E",
    color: "#757A75",
    borderRadius: "50px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    margin: "10px",
  };
  return (
    <div>
      <Navbar />
      <h1>Zaloguj się jako administrator</h1>
      <LinkButton to="/admin" label="Zaloguj" />
    </div>
  );
};
