import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const ACCESS_TOKEN_COOKIE_NAME = "access_token";
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

export default function LoginCallback() {
  const { handleTokens, init } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE_NAME);

    console.log("LoginCallback - accessToken:", accessToken);
    console.log("LoginCallback - refreshToken:", refreshToken);

    if (accessToken && refreshToken) {
      handleTokens(accessToken, refreshToken)
        .then(() => init())
        .then(() => {
          navigate("/admin");
        })
        .catch(console.error);
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Login Callback Page</div>;
}
