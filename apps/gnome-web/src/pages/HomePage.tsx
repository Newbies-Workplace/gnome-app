import Navbar from "../components/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="ml-5 bg-[#333] w-49/50 h-1800 rounded-br-[350px] rounded-bl-[350px] absolute top-20  transform -z-1">
        <h1>Witaj na stronie głównej!</h1>
      </div>
      {/* <div className="bg-[#6B2826] w-50 h-50 rounded-full text-center justify-center mt-30 ml-20">hahaha</div> */}
      {/* <div className="bg-[#213844] w-30 h-30 rounded-full text-center justify-center -mt-60 ml-10">hahaha</div> */}
    </div>
  );
};
