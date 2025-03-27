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
            `order-none cursor-pointer m-2 flex nline-flex`,
            className,
          )}
        >
          {label}
        </button>
      </Link>
    </div>
  );
};
