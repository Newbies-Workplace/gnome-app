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
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  label,
  px,
  py,
  color = "#1E201E", // Default background color
  textColor = "#757A75", // Default text color
  fWeight = "normal",
  width = "w-40",
  height = "h-12",
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
          }}
          className="rounded-full border-none cursor-pointer m-2 w-40 h-12 flex items-center justify-center inline-flex"
        >
          {label}
        </button>
      </Link>
    </div>
  );
};
