import * as fs from "node:fs/promises";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "../src/db/prisma.service";
import { DistrictsService } from "../src/districts/districts.service";
import { MinioService } from "../src/minio/minio.service";

const prisma = new PrismaClient();
const prismaService = new PrismaService();
const configService = new ConfigService();
const minioService = new MinioService(configService);

function extractCoords(coords: number[][][]) {
  const flat = coords.flat();
  const xs = flat.map((p) => p[0]);
  const ys = flat.map((p) => p[1]);

  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

async function main() {
  await prismaService.$connect();
  const districtsService = new DistrictsService(prismaService);

  const json = await fs.readFile("./assets/GraniceOsiedli.geojson", "utf-8");
  const data = JSON.parse(json);

  let id = 1;
  for (const feat of data.features) {
    const name = feat.properties?.NAZWAOSIED;
    const geom = feat.geometry;
    const points = geom.coordinates;
    const bounds = extractCoords(points);

    try {
      await prisma.district.create({
        data: {
          id,
          name,
          points: points,
          minX: bounds.minX,
          maxX: bounds.maxX,
          minY: bounds.minY,
          maxY: bounds.maxY,
        },
      });
    } catch (_error) {}

    id++;
  }

  // DATY DO POPRAWKI (daty testowe)

  const gnomes = [
    {
      id: "a1f3c9b2-7d4e-4f3a-9b6c-12d34e56f789",
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
      pictureUrl: "http://localhost:9000/images/defaultGnomePictures/Kacuś.jpg",
    },
    {
      id: "b2e4d8c7-9a4b-4a5b-8c9d-2345ef6789ab",
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
      id: "c3d5e6f7-0b1c-4b6c-9eab-3456f7890abc",
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
      pictureUrl:
        "http://localhost:9000/images/defaultGnomePictures/Frugalek.jpg",
    },
    {
      id: "d4e6f7a8-1c2d-4c7d-8abc-4567890abcd1",
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
      id: "e5f7a8b9-2d3e-4d8e-9bcd-567890abcdef",
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
      id: "f6a8b9c0-3e4f-4e9f-8cde-67890abcdef1",
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
      id: "07a9b1c2-4f5a-4f0a-8def-7890abcdef12",
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
      id: "18b0c2d3-5a6b-4a1b-9abc-890abcdef123",
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
      id: "29c1d3e4-6b7c-4b2c-8bcd-90abcdef1234",
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
      id: "3ad2e4f5-7c8d-4c3d-8abc-abcdef123456",
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

  const files = ["Kacuś.jpg", "Frugalek.jpg"];
  for (const filename of files) {
    const file: Express.Multer.File = {
      originalname: filename,
      buffer: await fs.readFile(`./prisma/assets/${filename}`),
      mimetype: "image/jpeg",
    } as unknown as Express.Multer.File;

    await minioService.uploadFile(file, filename, "defaultGnomePictures");
  }

  for (const gnome of gnomes) {
    const districtId = await districtsService.findPointInPolygon([
      gnome.longitude,
      gnome.latitude,
    ]);
    await prisma.gnome.upsert({
      where: { id: gnome.id },
      update: {
        pictureUrl: gnome.pictureUrl || "",
        districtId: districtId,
      },
      create: {
        pictureUrl: gnome.pictureUrl || "",
        id: gnome.id,
        name: gnome.name,
        latitude: gnome.latitude,
        longitude: gnome.longitude,
        location: gnome.location,
        creationDate: gnome.creationDate,
        description: gnome.description,
        exists: gnome.exists,
        funFact: gnome.funFact,
        districtId: districtId,
      },
    });
  }

  const achievements = [
    {
      id: "gnomeCollect-1",
      name: "To jest ich więcej?",
      description:
        "Twoja podróż jako zbieracz krasnali dopiero się rozpoczęła.",
    },
    {
      id: "gnomeCollect-10",
      name: "Początkujący zbieracz",
      description:
        "Twoja podróż jako zbieracz krasnali dopiero się rozpoczęła.",
    },
    {
      id: "gnomeCollect-20",
      name: "Młodszy zbieracz",
      description: "Wygląda na to, że zaczynasz rozumieć o co w tym chodzi.",
    },
    {
      id: "gnomeCollect-50",
      name: "Doświadczony zbieracz",
      description:
        "Wygląda na to, że zaczynasz naprawdę doceniać rzadkość niektórych okazów.",
    },
    {
      id: "gnomeCollect-80",
      name: "Kolekcjoner krasnali",
      description:
        "Twoja kolekcja zaczyna budzić szaczunek. Niektórzy twierdzą, że czują twoją aurę z daleka.",
    },
    {
      id: "gnomeCollect-100",
      name: "Stary wyjadacz",
      description:
        "Wiesz o krasnalach więcej, niż powinno być możliwe. Powoli stajesz się legendą.",
    },
    {
      id: "gnomeCollect-150",
      name: "Mistrz zbieractwa krasnali",
      description:
        "Zbierasz takie okazy, o których inni tylko słyszeli w opowieściach przy ognisku.",
    },
    {
      id: "gnomeCollect-200",
      name: "Boski zbieracz",
      description:
        "Twoje imię krąży wśród zbieraczy jak mit. Niektórzy nie wierzą, że naprawdę istniejesz.",
    },
    {
      id: "gnomeCollect-all",
      name: "Legendarny zbieracz",
      description:
        "Twoje zbiory są tak imponujące, że bogowie zaczęli się zastanawiać, czy nie zabrać od ciebie kilku sztuk. Pora dotknąć trawy...",
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: {
        id: achievement.id,
      },
      update: {},
      create: {
        name: achievement.name,
        description: achievement.description,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await prismaService.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await prismaService.$disconnect();
    process.exit(1);
  });
