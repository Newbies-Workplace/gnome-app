import { cn } from "../lib/utils.ts";

type BgElementProps = {
  className?: string;
};

export const BgElement: React.FC<BgElementProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "ml-5 bg-[#333] w-49/50 h-45/50 absolute top-22 transform -z-1",
        className,
      )}
    />
  );
};
