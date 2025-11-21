import { Injectable } from "@nestjs/common";
import { CreateDistrict } from "@repo/shared/requests";
import { DistrictsResponse } from "@repo/shared/responses";
import { booleanPointInPolygon, point, polygon } from "@turf/turf";
import { PrismaService } from "@/db/prisma.service";

@Injectable()
export class DistrictsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findDistrict(id: number): Promise<DistrictsResponse> {
    const district = await this.prismaService.districts.findFirst({
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
    const districts = await this.prismaService.districts.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return districts;
  }

  async createDistricts(name: string, points: any = null) {
    const coords = JSON.stringify(points);
    const data = JSON.parse(coords);

    const xs = data.coordinates[0].map((p) => p[0]);
    const ys = data.coordinates[0].map((p) => p[1]);
    const bbox = {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };

    return this.prismaService.districts.create({
      data: {
        name,
        points,
        minX: bbox.minX,
        maxX: bbox.maxX,
        minY: bbox.minY,
        maxY: bbox.maxY,
      },
    });
  }

  async findPointInPolygon(pointXY: [number, number]) {
    const [x, y] = pointXY;
    const turfPoint = point(pointXY);
    const polygons = await this.prismaService.districts.findMany({
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
      const isInPolygon = booleanPointInPolygon(
        turfPoint,
        polygon(data.coordinates),
      );
      if (isInPolygon) {
        return polygons[i].id;
      }
    }
    return null;
  }
}
