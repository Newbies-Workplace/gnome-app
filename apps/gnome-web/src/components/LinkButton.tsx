import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
  py: string;
  px: string;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  label,
  px,
  py,
}) => {
  return (
    <div>
      <Link to={to}>
        <button
          style={{ padding: `${py}px ${px}px` }}
          className="bg-[#1E201E] text-[#757A75] rounded-full border-none cursor-pointer m-2 w-40 h-12 flex items-center justify-center inline-flex"
        >
          {label}
        </button>
      </Link>
    </div>
  );
};
