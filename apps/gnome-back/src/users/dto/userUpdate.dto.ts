import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class UserUpdate {
  @IsString()
  @IsOptional()
  name: string;
}
