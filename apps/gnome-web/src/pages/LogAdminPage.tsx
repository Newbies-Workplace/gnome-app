import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";

export const LogAdminPage = () => {
  return (
    <div className="justify-center items-center flex flex-col">
      <Navbar />
      <BgElement roundedBr="15px" roundedBl="15px" />
      <div className="bg-[#1E201E] w-2/5 h-4/5 absolute top-33 transform flex flex-col items-center justify-center rounded-[15px]">
        <p className="text-white text-[30px] mb-4 font-bold absolute top-20">
          Zaloguj się
        </p>
        <input
          type="text"
          placeholder="Login"
          className="bg-[#1E201E] border-2 border-[#FFF] text-white w-1/2 h-20 rounded-[15px] pl-3"
        />
        <br />
        <input
          type="password"
          placeholder="Hasło"
          className="bg-[#1E201E] border-2 border-[#FFF] text-white w-1/2 h-20 rounded-[15px] pl-3"
        />
        <br />
        <div className="flex flex-row w-17/32 justify-center gap-13">
          <hr className="w-2/5" />
          <hr className="w-2/5" />
        </div>
        <br />
        <div className="flex flex-row gap-25">
          <a href="" className="cursor-pointer">
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_"G"_logo.svg'
              alt="Google"
              className="h-10 w-10 mr-2"
            />
          </a>
          <a href="">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg"
              alt="Apple"
              className="h-10 w-9 mr-2"
            />
          </a>
        </div>
        <br />
        <div className="absolute bottom-20">
          <LinkButton
            to="/admin"
            label="Zaloguj"
            px="40"
            py="20"
            width="300px"
            height="50px"
            color="#D6484A"
            textColor="#fff"
            fWeight="Bold"
          />
        </div>
      </div>
    </div>
  );
};
