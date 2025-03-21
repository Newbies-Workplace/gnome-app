import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateReportRequest {
  @IsString()
  @IsNotEmpty()
  gnomeName: string;

  @IsUrl()
  @IsNotEmpty()
  pictureUrl: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  reportAuthor: string;
}
