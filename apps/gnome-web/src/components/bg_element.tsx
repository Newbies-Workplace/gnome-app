type BgElementProps = {
  roundedBr: string;
  roundedBl: string;
};

export const BgElement: React.FC<BgElementProps> = ({
  roundedBr,
  roundedBl,
}) => {
  return (
    <div
      className="ml-5 bg-[#333] w-49/50 h-45/50 absolute top-20 transform -z-1"
      style={{
        borderBottomRightRadius: roundedBr,
        borderBottomLeftRadius: roundedBl,
      }}
    />
  );
};
