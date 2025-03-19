import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class UserUpdate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  pictureUrl: string;
}
