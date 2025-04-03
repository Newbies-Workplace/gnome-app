import { cn } from "../lib/utils.ts";

type BgElementProps = {
  className?: string;
};

export const BgElement: React.FC<BgElementProps> = ({ className }) => {
  return (
    <div
      className={cn(
        `ml-[1%] bg-[#333] 
        w-49/50 
        h-45/50
        top-22 transform absolute -z-1 
        transition-all duration-500 ease-in-out`, // Smooth transition
        className,
      )}
    />
  );
};
