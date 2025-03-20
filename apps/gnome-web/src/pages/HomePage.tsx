import Navbar from "../components/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="ml-5 bg-[#333] w-49/50 h-1800 rounded-br-[350px] rounded-bl-[350px] absolute top-20  transform -z-1">
        <h1>Witaj na stronie głównej!</h1>
      </div>
    </div>
  );
};
