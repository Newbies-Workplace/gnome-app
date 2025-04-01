import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../components/LinkButton";
import Navbar from "../components/Navbar";
import { BgElement } from "../components/bg_element";
import { axiosInstance } from "../lib/api/axios";

export const LogAdminPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        // Send the Google token to the backend
        const response = await axiosInstance.post("/auth/google", {
          idToken: tokenResponse.code, // Use the access_token as idToken
        });

        // Handle the response from the backend
        const { access_token, user } = response.data;
        console.log("Logged in user:", user);

        // Store the access token (e.g., in localStorage or a global state)
        localStorage.setItem("access_token", access_token);

        // Navigate to the admin page
        navigate("/admin");
      } catch (error) {
        console.error("Error logging in with Google:", error);
        alert("Failed to log in. Please try again.");
      }
    },
    onError: () => {
      console.error("Google login failed!");
      alert("Google login failed. Please try again.");
    },
  });
  return (
    <div className="justify-center items-center flex flex-col">
      <Navbar />
      <BgElement className="rounded-b-[15px] rounded-tl-[15px]" />
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
          <div className="flex justify-center items-center">
            <button onClick={handleGoogleLogin}>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_"G"_logo.svg'
                alt="Login by Google"
                className="h-10 w-10 ml-2"
              />
            </button>
          </div>
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
            className="w-40 h-10 bg-[#D6484A]"
          />
        </div>
      </div>
    </div>
  );
};
