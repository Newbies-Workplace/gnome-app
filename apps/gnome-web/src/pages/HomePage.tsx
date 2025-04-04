import Navbar from "../components/Navbar";

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="ml-[1%] bg-[#333] w-[98%] h-100/50 rounded-br-[350px] rounded-bl-[350px] absolute top-22 z-0 rounded-tr-[15px] overflow-hidden">
        <div className="bg-[#272927] w-[75%] h-[500px] rounded-r-[150px] absolute z-1 flex flex-col justify-center items-start text-center break-words">
          <div className="flex flex-row text-lg text-gray-300 text-[10px] mt-22">
            <div className="lg:w-[500px] max-h-[500px] overflow-hidden text-ellipsis absolute z-1 flex flex-col ml-[5%] items-start break-words">
              <p className="lg:text-3xl md:text-2xl sm:text-[20px] font-bold text-white mb-4 -mt-2 text-[15px]">
                Witaj w świecie Krasnali!
              </p>
              <div className="lg:text-[18px] md:text-[14px] sm:text-[12px] text-gray-300 font-normal break-words">
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
            </div>
            <div>
              <img
                src="../src/images/Red_gnome.svg"
                alt="Red gnome"
                className="ml-40 invisible lg:w-[80%] lg:h-[80%] lg:visible max-w-150"
              />
            </div>
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
