import { cn } from "../lib/utils.ts";

type CircleProps = {
  className?: string;
  label?: string;
  text?: string;
};

export const CircleTracker: React.FC<CircleProps> = ({
  className,
  label,
  text,
}) => {
  return (
    <div className="flex flex-row items-center gap-2 mt-15 relative">
      <div
        className={cn(
          "w-[50px] h-[50px] rounded-full bg-[#1E201E] items-center text-center justify-center flex text-[21px] text-[#757A75]",
          className,
        )}
      >
        {label}
      </div>
      <div>
        <p className="text-[0,5rem] text-[#757A75]">{text}</p>
      </div>
    </div>
  );
};
