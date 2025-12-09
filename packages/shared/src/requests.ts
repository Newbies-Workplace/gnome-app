import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  isNotEmpty,
  Matches,
} from "class-validator";

export class UserUpdate {
  @IsString()
  @IsOptional()
  name?: string;
}

export class CreateReportRequest {
  @IsString()
  @IsNotEmpty()
  gnomeName!: string;

  @IsUrl()
  @IsNotEmpty()
  pictureUrl?: string;

  @IsLatitude()
  @IsNotEmpty()
  latitude!: number;

  @IsLongitude()
  @IsNotEmpty()
  longitude!: number;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  reportAuthor!: string;
}

export class CreateGnomeRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsLatitude()
  @IsNotEmpty()
  latitude!: number;

  @IsLongitude()
  @IsNotEmpty()
  longitude!: number;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDate()
  @Type(() => Date)
  creationDate!: Date;

  @IsString()
  funFact!: string;
}

export class CreateInteractionRequest {
  @IsDate()
  @Type(() => Date)
  interactionDate!: Date;

  @IsString()
  @IsNotEmpty()
  gnomeId!: string;
}

export class CreateUserAchievementRequest {
  @IsString()
  @IsNotEmpty()
  achievementId!: string;
}

export class AddFriendRequest {
  @Matches(/^[0-9]{16}$/)
  inviteCode!: string;
}

export class DeleteFriend {
  @IsUUID()
  friendId!: string;
}

export enum BuildingType {
  WATCHTOWER = "WATCHTOWER",
  MINE = "MINE",
}
export class CreateBuildingRequest {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  gnomeCount!: number;

  @Type(() => Number)
  @IsLatitude()
  @IsNotEmpty()
  latitude!: number;

  @Type(() => Number)
  @IsLongitude()
  @IsNotEmpty()
  longitude!: number;
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  districtId!: number;

  @IsEnum(BuildingType)
  @IsNotEmpty()
  type!: BuildingType;
}
export class EmpowerBuildingRequest {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  gnomeCount!: number;
}
export class AttackBuildingRequest {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  clicks!: number;
}

export class PaginationRequest {
  @Type(() => Number)
  page?: number;
}

export class SearchByNameReuqest {
  @Type(() => String)
  name?: string;
}

export type Team = "TEAM_YELLOW" | "TEAM_BLUE" | "TEAM_GREEN";

export class AssignTeam {
  @IsNotEmpty()
  team!: Team;
}

export class UpdateGnomeRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  funFact?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  creationDate!: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  exists?: boolean;
}

export type Action = "ATTACK" | "EMPOWER";

export class BuildingInteractionRequest {
  @IsNotEmpty()
  action!: Action;

  @IsNotEmpty()
  @IsString()
  buildingId!: string;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;
}
