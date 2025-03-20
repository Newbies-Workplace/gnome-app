import Navbar from "../components/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="ml-5 bg-[#333] w-49/50 h-1800 rounded-tr-[15px] rounded-br-[350px] rounded-bl-[350px] absolute top-20  transform ">
        <h1>Witaj na stronie głównej!</h1>
      </div>
    </div>
  );
};
