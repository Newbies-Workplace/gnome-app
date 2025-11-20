import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex items-center justify-center">
      <button className="bg-red-700 text-white text-2xl font-Afacad px-6 py-3 rounded-4xl hover:opacity-90 transition flex items-center gap-2">
        <Link to="/" className="text-white">
          back to HomePage
        </Link>
      </button>
    </div>
  );
}

export default Login;
