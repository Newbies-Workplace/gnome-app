import Navbar from "../components/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="ml-5 bg-[#333] w-[98%] h-[1800px] rounded-br-[350px] rounded-bl-[350px] absolute top-22 z-0 rounded-tr-[15px]">
        <div className="bg-[#272927] w-[75%] h-[500px] rounded-r-[150px] absolute z-1 flex flex-col justify-center items-start px-50 text-center ">
          <div className="flex flex-row text-lg text-gray-300 text-[20px] ">
            <div>
              <p className="text-4xl font-bold text-white mb-4 -mt-2  text-[40px]">
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
              <div className="flex flex-row mt-7 ml-20">
                <a
                  href="/report"
                  className="text-[#D6484A] underline text-[17px]"
                >
                  Więcej informacji o krasnalach
                </a>
                <a href="/report">
                  <img
                    src="../src/images/SwimmingSuteGnome.svg"
                    alt="Wróć"
                    className="absolute h-[60px] w-[60px] -mt-3"
                  />
                </a>
              </div>
            </div>

            <img
              src="../src/images/Red_gnome.svg"
              alt="Red gnome"
              className="rounded-[80px] ml-40 w-100 h-100"
            />
          </div>
        </div>
        <div className="h-[1000px] z-1 flex flex-row absolute top-[500px]">
          <div className="w-[30%] h-[500px] z-1 justify-left text-left break-words ml-10 mt-80 text-[30px]">
            <label>
              Oto Krasnal GO! - gra, która pokaże Ci, jak mało wiesz o tych
              małych cwaniakach. Twoim zadaniem jest zbierać, odkrywać i
              kolekcjonować wrocławskie krasnale rozsiane po całym Wrocławiu.
              Każdy z nich ma swoją historię, a Ty możesz zostać ich mistrzem.
            </label>
          </div>
          <div className="z-1 items-right justify-right ml-auto -mr-6 -mt-40 flex">
            <img
              src="../src/images/Hand.svg"
              alt="Hand"
              className="w-260 h-260"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
