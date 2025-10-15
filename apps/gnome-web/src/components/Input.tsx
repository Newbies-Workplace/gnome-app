import { cn } from "../lib/utils.ts";

type InputProps = {
  className?: string;
  placeholder?: string;
  type?: string;
};

export const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  type,
}) => {
  return (
    <input
      className={cn(
        "bg-[#ffffff] text-[#B3B3B3] min-w-75 w-[30%] h-[40px] sm:h-[45px] md:h-[50px] rounded-[10px] pl-[25px]",
        className,
      )}
      placeholder={placeholder}
      type={cn("text", type)}
    />
  );
};
// w-full sm:w-[400px] md:w-[500px]
