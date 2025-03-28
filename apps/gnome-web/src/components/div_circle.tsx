import { cn } from "../lib/utils.ts";

type CircleProps = {
  className?: string;
  label?: string;
};

export const CircleTracker: React.FC<CircleProps> = ({ className, label }) => {
  return (
    <div
      className={cn(
        "w-[50px] h-[50px] rounded-full bg-[#1E201E] items-center text-center",
        className,
      )}
    >
      {label}
    </div>
  );
};
