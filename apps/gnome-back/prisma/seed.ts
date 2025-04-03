import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // DATY DO POPRAWKI (daty testowe)

  const gnomes = [
    {
      id: "",
      name: "Kacuś",
      latitude: 51.11063127588679,
      longitude: 17.033377728360577,
      location: "Rynek 42-43, Wrocław",
      creationDate: "2022-07-06T00:00:00.000Z",
      description:
        "Mam na imię Kacuś i nie bez powodu! Uwielbiam dobrą zabawę w towarzystwie, nawet tych Dużych Ludzi. Co mnie sprowadziło do Wrocławia? Usłyszałem, że miasto słynie z wyśmienitych browarów i fantastycznych pubów, i wiecie co? To prawda!",
      exists: true,
      funFact:
        "Krążą plotki, że potrafi wypić więcej piwa niż niejeden Duży Człowiek. Podobno zna tajne przejścia między wrocławskimi pubami.",
    },
    {
      id: "",
      name: "Ogrodnik Wrocławski",
      latitude: 51.09712647932332,
      longitude: 17.034123867260472,
      location: "Tarasy Wroclavii",
      creationDate: "2021-09-27T00:00:00.000Z",
      description:
        "Krasnal Ogrodnik z Pasją to prawdziwy strażnik zieleni na tarasach galerii Wroclavia. Uzbrojony w wielkie nożyce, z precyzją przycina pobliskie krzewy, dbając o ich nienaganny wygląd.",
      exists: true,
      funFact:
        "Jego nożyce są magiczne. Mówi się, że potrafią przycinać krzewy w idealne kształty zwierząt, ale tylko w świetle księżyca.",
    },
    {
      id: "",
      name: "Frugalek",
      latitude: 51.122837162049635,
      longitude: 16.9914869064251,
      location: "Legnicka 49GA, Wrocław",
      creationDate: "2021-01-13T00:00:00.000Z",
      description:
        "Frugalek to prawdziwy strażnik innowacji i miłośnik dobrej zabawy. Gdy po raz pierwszy wsiadł na hulajnogę elektryczną, poczuł, jakby spełniło się jego największe marzenie. Od tej pory nigdzie się bez niej nie rusza.",
      exists: true,
      funFact:
        "Testował każdą hulajnogę we Wrocławiu, a niektórzy twierdzą, że ma swoją własną, niewidzialną dla ludzi, dzięki której zawsze jest pierwszy na miejscu.",
    },
    {
      id: "",
      name: "Piastosław I Złocisty",
      latitude: 51.116098426715645,
      longitude: 17.03752618397891,
      location: "Wyspa Słodowa",
      creationDate: "2022-07-11T00:00:00.000Z",
      description:
        "Piastosław nieprzypadkowo wybrał Wyspę Słodową na swoje miejsce zamieszkania. W otoczeniu pięknej przyrody i najsłynniejszych zabytków Wrocławia jego ulubiony lokalny trunek smakuje najlepiej.",
      exists: false,
      funFact:
        "Jego ulubiony trunek to tajemniczy Eliksir Piastowski. Legenda głosi, że kto go spróbuje, ten nigdy nie zapomni smaku Wrocławia.",
    },
    {
      id: "",
      name: "Hipoczyściel",
      latitude: 51.10647343755045,
      longitude: 17.072574621075326,
      location: "Wróblewskiego 1-5 (ZOO Wrocław)",
      creationDate: "2022-07-11T00:00:00.000Z",
      description:
        "Wrocławskie ZOO zyskało nowego mieszkańca. Krasnala! Jednak to nie o niego trzeba dbać, to on dba o innych. Szczególnie upodobał sobie hipopotamy, pilnując, by były czyste i zadbane.",
      exists: true,
      funFact:
        "Hipopotamy w zoo uwielbiają go tak bardzo, że czasem zapraszają go na kąpiele.",
    },
    {
      id: "",
      name: "Krasnal Spółdzielca",
      latitude: 51.09725064705496,
      longitude: 17.03056272854362,
      location: "Swobodna (Skwer Spółdzielców), Wrocław",
      creationDate: "2022-07-22T00:00:00.000Z",
      description:
        "Z torbą na zakupy przewieszoną przez ramię i kluczem w dłoni, jasno daje do zrozumienia, że jest tu zadomowiony.",
      exists: true,
      funFact:
        "Mówi się, że jego klucz pasuje do każdego zamka we Wrocławiu, ale tylko jeśli zna się tajne krasnalowe zaklęcia.",
    },
    {
      id: "",
      name: "Wyborcy",
      latitude: 51.05836634559732,
      longitude: 17.059513357879336,
      location: "Rada Osiedla Jagodno",
      creationDate: "2024-03-09T00:00:00.000Z",
      description: "Symbol demokracji i aktywności obywatelskiej.",
      exists: true,
      funFact:
        "Podobno każdy, kto go dotknie, poczuje nagłą chęć do działania na rzecz swojej społeczności.",
    },
    {
      id: "",
      name: "Ogorzałek i Opiłek",
      latitude: 51.11110709104292,
      longitude: 17.030365597979237,
      location: "Świętego Mikołaja 81, Wrocław",
      creationDate: "2022-07-11T00:00:00.000Z",
      description:
        "Te dwa krasnale przybrały zaskakujące i mylące ksywki. Najprawdopodobniej w obawie przed Strażą Miejską, żeby nie odkryła ich prawdziwego zajęcia. A czym się trudnią? Nie bacząc na zakazy, leją gorzałę i raczą się nią całkiem oficjalnie przy ulicy św. Mikołaja.",
      exists: true,
      funFact:
        "Plotki głoszą, że ich ulubiona gorzałka ma magiczne właściwości – kto jej spróbuje, nigdy nie zapomni tej nocy.",
    },
    {
      id: "",
      name: "Ikuś",
      latitude: 51.048281613103356,
      longitude: 16.95514228088844,
      location: "IKEA, Bielany Wrocławskie",
      creationDate: "2020-04-06T00:00:00.000Z",
      description:
        "Ikuś, pojawił się nagle. Usłyszawszy, że we Wrocławiu potrzeba handlowca-stratega, spakował manatki i wyruszył w drogę. Przybył na przedmieścia Wrocławia w październiku 2016 roku i od razu zdobył sympatię wszystkich.",
      exists: true,
      funFact:
        "Podobno zna wszystkie tajne skróty w IKEI i potrafi wyjść z niej w kilka minut – bez zgubienia się w labiryncie alejek.",
    },
    {
      id: "",
      name: "Pakuś",
      latitude: 51.03608819743249,
      longitude: 16.946498357986727,
      location: "Logistyczna 6 (Amazon), Bielany Wrocławskie",
      creationDate: "2020-04-07T00:00:00.000Z",
      description:
        "Pakuś to mistrz krasnalowej logistyki. Większość czasu spędza w pudełku pod budynkiem Amazon II w Bielanach Wrocławskich. Ze swojego „stanowiska na skale”, jak lubi je nazywać, bacznie nadzoruje dostawy paczek do klientów na całym świecie.",
      exists: true,
      funFact:
        "Niektórzy twierdzą, że to on odpowiada za to, że paczki czasem docierają szybciej, niż to możliwe. Czyżby krasnalowa magia?",
    },
  ];

  for (const gnome of gnomes) {
    await prisma.gnome.upsert({
      where: { id: gnome.id },
      update: {},
      create: {
        pictureUrl: "",
        id: crypto.randomUUID(),
        name: gnome.name,
        latitude: gnome.latitude,
        longitude: gnome.longitude,
        location: gnome.location,
        creationDate: gnome.creationDate,
        description: gnome.description,
        exists: gnome.exists,
        funFact: gnome.funFact,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
