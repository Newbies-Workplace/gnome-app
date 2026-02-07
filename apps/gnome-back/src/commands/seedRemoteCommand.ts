import { randomUUID } from "node:crypto";
import axios from "axios";
import { Command, CommandRunner } from "nest-commander";
import { PrismaService } from "@/db/prisma.service";
import { DistrictsService } from "@/districts/districts.service";
import { StorageDirectory, StorageService } from "@/storage/storage.service";

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

      let picturePath = null;
      const imageUrl: string | null = gnome.image[0];
      if (imageUrl) {
        console.log("has image");
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
          originalname: `${newGnomeId}.${extension}`,
          encoding: "7bit",
          mimetype: contentType,
          buffer: imageBuffer,
          size: imageBuffer.length,
          stream: null as any,
          destination: "",
          filename: `${newGnomeId}.${extension}`,
          path: "",
        };

        const uploadedFile = await this.storageService.uploadFile(
          file,
          `${newGnomeId}.${extension}`,
          StorageDirectory.GNOME_IMAGES,
        );
        picturePath = uploadedFile.path;
      }

      const districtId = await this.districtsService.findDistrictId([
        Number(gnome.lng),
        Number(gnome.lat),
      ]);
      const event = new Date(Date.now());
      await this.prismaService.gnome.create({
        data: {
          pictureUrl: picturePath,
          id: newGnomeId,
          name: gnome.title,
          latitude: Number(gnome.lat),
          longitude: Number(gnome.lng),
          location: gnome.address || "",
          creationDate: event.toISOString(),
          description: gnome.description || "",
          exists: true,
          funFact: "",
          districtId: districtId,
        },
      });
    }
  }
}
