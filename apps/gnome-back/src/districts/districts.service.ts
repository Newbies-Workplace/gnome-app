import { Injectable } from "@nestjs/common";
import { CreateDistrict } from "@repo/shared/requests";
import { DistrictsResponse } from "@repo/shared/responses";
import { PrismaService } from "@/db/prisma.service";

@Injectable()
export class DistrictsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findDistricts(id: number): Promise<DistrictsResponse> {
    const district = await this.prismaService.districts.findFirst({
      where: {
        id: id,
      },
    });
    return district;
  }

  async createDistricts(name: string, points: any = null) {
    const alabama = JSON.stringify(points);
    const coords = JSON.parse(alabama);

    const xs = coords.coordinates.map((p) => p[0]);
    const ys = coords.coordinates.map((p) => p[1]);
    console.log(xs);
    const bbox = {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };

    return this.prismaService.districts.create({
      data: {
        id: 11,
        name: name,
        points: points,
        bbox: bbox,
      },
    });
  }
}
