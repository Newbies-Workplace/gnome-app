import backgroundImage from "@/assets/images/background.png";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
