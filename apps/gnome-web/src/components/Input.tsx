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
        "bg-[#ffffff] text-[#B3B3B3] w-[500px] h-[50px] rounded-[10px] pl-[25px]",
        className,
      )}
      placeholder={placeholder}
      type={cn("text", type)}
    ></input>
  );
};
