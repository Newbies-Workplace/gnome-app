import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "@/assets/images/background.png";

export default function Privacy() {
  const [policyHtml, setPolicyHtml] = useState<string>("");

  useEffect(() => {
    fetch("/privacy-policy.html")
      .then((res) => res.text())
      .then(setPolicyHtml);
  }, []);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col overflow-y-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full p-5 bg-transparent sticky top-0 left-0">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-5xl font-Afacad">
            Polityka prywatności
          </h1>
          {/* Zaloguj button z icon */}
          <button className="bg-primary-gray text-white text-2xl font-Afacad px-6 py-3 rounded-4xl hover:opacity-90 transition flex items-center gap-2">
            <Link to="/" className="text-white">
              Główna
            </Link>
          </button>
        </div>

        <div className="flex items-center mt-3">
          <div className="flex-grow border-t border-white" />
          <div className="mx-4 w-100" />
          <div className="flex-grow border-t border-white" />
        </div>
      </div>

      <div className="flex flex-col m-8 bg-black/70 rounded-4xl">
        <div className="text-white text-Afacad p-8 h-full text-lg ">
          {/** biome-ignore lint/security/noDangerouslySetInnerHtml: loading static file from public */}
          <div dangerouslySetInnerHTML={{ __html: policyHtml }} />
        </div>
      </div>
    </div>
  );
}
