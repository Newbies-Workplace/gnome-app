import { randomUUID } from "node:crypto";
import axios from "axios";
import { convert } from "html-to-text";
import { Command, CommandRunner } from "nest-commander";
import { PrismaService } from "@/db/prisma.service";
import { DistrictsService } from "@/districts/districts.service";
import { StorageDirectory, StorageService } from "@/storage/storage.service";

function sanitizeDescription(html: string): string {
  if (!html) return "";
  return convert(html, {
    wordwrap: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "img", format: "skip" },
    ],
  }).trim();
}

async function downloadImage(
  imageUrl: string,
  gnomeId: string,
  storageService: StorageService,
): Promise<string | null> {
  const extension = imageUrl.split(".").pop();

  const response = await axios
    .get(imageUrl, { responseType: "arraybuffer" })
    .catch((e) => {
      console.error("failed to get image buffer", e);
      throw e;
    });

  const imageBuffer = Buffer.from(response.data);
  const contentType = response.headers["content-type"] || "image/jpeg";

  const file: Express.Multer.File = {
    fieldname: "image",
    originalname: `${gnomeId}.${extension}`,
    encoding: "7bit",
    mimetype: contentType,
    buffer: imageBuffer,
    size: imageBuffer.length,
    stream: null as any,
    destination: "",
    filename: `${gnomeId}.${extension}`,
    path: "",
  };

  const uploadedFile = await storageService.uploadFile(
    file,
    `${gnomeId}.${extension}`,
    StorageDirectory.GNOME_IMAGES,
  );
  return uploadedFile.path;
}

@Command({ name: "seed:remote", options: { isDefault: false } })
export class SeedRemoteCommand extends CommandRunner {
  constructor(
    private readonly storageService: StorageService,
    private readonly districtsService: DistrictsService,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }

  async run(inputs: string[], options: Record<string, any>) {
    console.log({ inputs, options });

    const allGnomes = await axios
      .get(
        "https://visitwroclaw.eu/wp-json/custom/v1/attractions?ptype=dwarves",
      )
      .then((res) => res.data)
      .catch(console.error);

    console.log(`found ${allGnomes.length} gnomes`);

    for (const g of allGnomes) {
      console.log(`getting remote gnome ${g.id}`);
      const newGnomeId = randomUUID();

      const gnome = await axios
        .get(`https://visitwroclaw.eu/wp-json/custom/v1/attractions/${g.id}`)
        .then((res) => res.data)
        .catch(console.error);

      const lat = Number(gnome.lat);
      const lng = Number(gnome.lng);
      if (lat === 0 && lng === 0) {
        console.log(
          `skipping gnome ${gnome.title} - invalid coordinates (0,0)`,
        );
        continue;
      }

      let picturePath: string | null = null;
      const imageUrl: string | null = gnome.image[0];
      if (imageUrl) {
        console.log("has image");
        picturePath = await downloadImage(
          imageUrl,
          newGnomeId,
          this.storageService,
        );
      }

      const districtId = await this.districtsService.findDistrictId([lng, lat]);
      const event = new Date(Date.now());
      await this.prismaService.gnome.create({
        data: {
          pictureUrl: picturePath,
          id: newGnomeId,
          name: gnome.title,
          latitude: lat,
          longitude: lng,
          location: gnome.address || "",
          creationDate: event.toISOString(),
          description: sanitizeDescription(gnome.description),
          exists: true,
          funFact: "",
          districtId: districtId,
        },
      });
    }
  }
}
