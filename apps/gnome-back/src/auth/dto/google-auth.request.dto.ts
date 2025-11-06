import { IsString } from "class-validator";

export class GoogleAuthRequest {
  @IsString()
  idToken: string;
}
