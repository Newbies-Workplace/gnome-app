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
          `rounded-full bg-[#1E201E] items-center text-center justify-center flex text-[#757A75]
          w-[30px] h-[30px] text-[18px] 
          sm:w-[30px] sm:h-[30px] sm:text-[18px] 
          md:w-[40px] md:h-[40px] md:text-[20px] 
          lg:w-[50px] lg:h-[50px] lg:text-[22px]`,
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
