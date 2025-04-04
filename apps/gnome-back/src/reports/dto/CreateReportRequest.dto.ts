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

  @IsLatitude()
  @IsNotEmpty()
  latitude: string;

  @IsLongitude()
  @IsNotEmpty()
  longitude: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  reportAuthor: string;
}
