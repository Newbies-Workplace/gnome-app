import { Link } from "react-router-dom";
import { cn } from "../lib/utils.ts";

type LinkButtonProps = {
  to: string;
  label: string;
  className?: string;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  label,
  className,
}) => {
  return (
    <div>
      <Link to={to}>
        <button
          className={cn(
            "rounded-full border-none cursor-pointer m-2 w-40 h-12 flex items-center justify-center inline-flex",
            className,
          )}
        >
          {label}
        </button>
      </Link>
    </div>
  );
};
