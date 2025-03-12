import { useState } from "react";

export const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      className={"flex w-screen h-screen justify-center items-center flex-col"}
    >
      <button
        className={
          "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        }
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>

      <p>
        Go to gnomes page{" "}
        <a href="/gnomes/test" className={"underline"}>
          here
        </a>
      </p>
      <p>
        Go to report page{" "}
        <a href="/report" className={"underline"}>
          here
        </a>
      </p>
    </div>
  );
};
