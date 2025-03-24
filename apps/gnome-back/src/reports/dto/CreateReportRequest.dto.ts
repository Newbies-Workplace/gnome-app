import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from "class-validator";

export class CreateReportRequest {
  @IsString()
  @IsNotEmpty()
  gnomeName: string;

  @IsUrl()
  @IsNotEmpty()
  pictureUrl: string;

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
  reportAuthor: string;
}
