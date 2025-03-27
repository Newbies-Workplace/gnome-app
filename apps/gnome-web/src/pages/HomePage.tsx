import Navbar from "../components/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="ml-5 bg-[#333] w-[98%] h-[1800px] rounded-b-[350px] rounded-tr-[20px] absolute top-22 z-0">
        <div className="bg-[#272927] w-[100%] h-[350px] rounded-r-[150px] absolute z-1 flex flex-col justify-center items-start px-50 text-center">
          <div className="flex flex-row text-lg text-gray-300 text-[20px] ">
            <div>
              <p className="text-4xl font-bold text-white mb-4 mt-20 text-[40px]">
                Witaj w świecie Krasnali!
              </p>
              Wrocław pełen jest krasnali. Myślisz, że <br />
              je widziałeś wszystkie?
              <br />W każdym zakątku miasta kryją się małe, sprytne
              <br />
              istoty, które od lat bawią, zaskakują i… uciekają
              <br />
              przed Twoim wzrokiem. <br />
              <br />
              Tutaj dowiesz się, jak je znaleźć.
            </div>
            <img
              src="../src/images/Red_gnome.svg"
              alt="Red gnome"
              className="rounded-[20px] ml-25"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
