import { Type } from "class-transformer";
import {
  IsDate,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
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

export class AddFriendRequest {
  @Matches(/^[0-9]{16}$/)
  inviteCode!: string;
}

export class DeleteFriend {
  @IsUUID()
  friendId!: string;
}
