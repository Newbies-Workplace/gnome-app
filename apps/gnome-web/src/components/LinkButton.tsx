import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  label: string;
};

export const LinkButton: React.FC<LinkButtonProps> = ({ to, label }) => {
  return (
    <div>
      <Link to={to}>
        <button className="bg-[#1E201E] text-[#757A75] rounded-full px-12 py-10 border-none cursor-pointer m-2">
          {label}
        </button>
      </Link>
    </div>
  );
};
