import { Injectable } from "@nestjs/common";
import { DistrictsResponse } from "@repo/shared/responses";
import { booleanPointInPolygon, point, polygon } from "@turf/turf";
import { PrismaService } from "@/db/prisma.service";

@Injectable()
export class DistrictsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findDistrict(id: number): Promise<DistrictsResponse> {
    const district = await this.prismaService.district.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return district;
  }
  async findManyDistricts(): Promise<DistrictsResponse[]> {
    const districts = await this.prismaService.district.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return districts;
  }

  async findDistrictId(pointXY: [number, number]): Promise<number | null> {
    const [x, y] = pointXY;
    const turfPoint = point(pointXY);
    const polygons = await this.prismaService.district.findMany({
      where: {
        minX: { lte: x },
        maxX: { gte: x },
        minY: { lte: y },
        maxY: { gte: y },
      },
    });
    if (polygons.length === 0) {
      return null;
    }
    for (let i = 0; i < polygons.length; i++) {
      const data = JSON.parse(JSON.stringify(polygons[i].points));
      const coords = data?.coordinates ?? data;

      const isInPolygon = booleanPointInPolygon(turfPoint, polygon(coords));
      if (isInPolygon) {
        return polygons[i].id;
      }
    }
    return null;
  }
}
