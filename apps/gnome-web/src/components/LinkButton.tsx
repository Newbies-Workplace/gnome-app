import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
  py: string;
  px: string;
  color?: string; // Optional background color
  textColor?: string; // Optional text color
  fWeight?: string;
  width?: string;
  height?: string;
  text?: string;
  rounded?: string;
  justify?: string;
  items?: string;
  padding?: string;
  margin?: string;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  label,
  px,
  py,
  color = "#1E201E", // Default background color
  textColor = "#757A75", // Default text color
  fWeight = "normal",
  width = "w-60",
  height = "h-40",
  text = "20px",
  rounded = "25px",
  justify = "center",
  items = "center",
}) => {
  return (
    <div>
      <Link to={to}>
        <button
          style={{
            padding: `${py}px ${px}px`,
            backgroundColor: color, // Use the background color prop
            color: textColor, // Use the text color prop
            fontWeight: fWeight,
            width: width,
            height: height,
            fontSize: text,
            borderRadius: rounded,
            justifyContent: justify,
            alignItems: items,
          }}
          className={`order-none cursor-pointer m-2 flex nline-flex`}
        >
          {label}
        </button>
      </Link>
    </div>
  );
};
