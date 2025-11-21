import { Link } from "react-router-dom";
import logoGoogle from "@/assets/icons/google-logo.svg";
import backgroundImage from "@/assets/images/background.png";

export default function LoginPage() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative flex justify-center items-center min-h-screen p-4 ">
        <div className=" w-full max-w-4xl h-[70vh] rounded-4xl bg-black/40 shadow p-16 flex flex-col justify-between overflow-y-auto">
          <h1
            className="text-white text-shadow-lg/100 font-Afacad 
                    text-center text-[32px] sm:text-[64px] font-extrabold pb-8 sm:pb-16 pt-8 sm:pt-16"
          >
            ZALOGUJ SIĘ
          </h1>

          <form action="" className="space-y-4 sm:space-y-8 px-2 sm:px-16">
            <div>
              <input
                type="text"
                placeholder="Podaj login"
                className="border-2 border-white text-white rounded-4xl px-4 py-4 sm:px-8 sm:py-8 text-left w-full font-Afacad text-[16px] sm:text-[20px]"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Podaj hasło"
                className="border-2 border-white rounded-4xl px-4 py-4 sm:px-8 sm:py-8 text-left w-full text-white font-Afacad text-[20px]"
              />
            </div>
          </form>
          <div className="flex items-center pt-8 sm:pt-16 px-8 sm:px-16">
            <div className="flex-grow border-t border-white" />
            <div className="mx-16 w-10" />
            <div className="flex-grow border-t border-white" />
          </div>

          <div className="space-y-4 sm:space-y-8 pb-6 sm:pb-16 pt-8 sm:pt-16 px-2 sm:px-16 items-center">
            <h5 className="text-gray-300 text-center pb-2 text-[16px] sm:text-[20px]">
              Zaloguj się z
              <button
                onClick={() => {
                  window.location.href =
                    import.meta.env.VITE_PUBLIC_API_URL +
                    "/auth/google/redirect";
                }}
                type="button"
              >
                <img
                  className="inline-block w-6 h-6 ml-2"
                  src={logoGoogle}
                  alt="Google"
                />
              </button>
            </h5>

            <button
              className="text-white 
                              border-one rounded-4xl w-full px-4 py-4 sm:px-8 sm:py-8 bg-[#D6484A] 
                              font-Afacad text-[16px] sm:text-[24px] font-bold text-center"
            >
              <Link to="/admin" className="text-white">
                Zaloguj się
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
