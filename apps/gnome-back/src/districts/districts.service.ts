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

  async createDistricts(name: string, points: any) {
    const xs = points.coordinates.map;
  }
}
