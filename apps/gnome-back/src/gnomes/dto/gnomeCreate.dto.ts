import { Type } from "class-transformer";
import {
  IsDate,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateGnomeRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  creationDate: Date;

  @IsString()
  funFact: string;
}
