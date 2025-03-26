import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInteractionRequest {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @Type(() => Date)
  interactionDate: Date;

  @IsString()
  @IsNotEmpty()
  gnomeId: string;

  @IsString()
  @IsNotEmpty()
  userPicture: string;
}
