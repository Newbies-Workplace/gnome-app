import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const COOKIE_NAME = "access_token";

export default function LoginCallback() {
  const { handleAccessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`),
    );
    const accessToken = match ? match[2] : null;

    if (accessToken) {
      handleAccessToken(accessToken).then(() => {
        // Optionally, redirect to the home page or another page after handling the token
        navigate("/admin");
      });
    } else {
      // No access token found, redirect to login page
      navigate("/login");
    }
  }, []);

  return <div>Login Callback Page (loader czy coś)</div>;
}
