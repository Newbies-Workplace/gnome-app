import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
};

export const LinkButton: React.FC<LinkButtonProps> = ({ to, label }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#1E201E",
    color: "#757A75",
    borderRadius: "50px",
    padding: "60px 50px",
    border: "none",
    cursor: "pointer",
    margin: "10px",
  };
  return (
    <div>
      <Link to={to}>
        <button style={buttonStyle}>{label}</button>
      </Link>
    </div>
  );
};
