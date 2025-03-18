import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class userUpdate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  pictureUrl: string;
}
