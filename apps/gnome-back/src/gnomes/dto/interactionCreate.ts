import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateInteractionRequest {
  @IsDate()
  @Type(() => Date)
  interactionDate: Date;

  @IsString()
  @IsNotEmpty()
  gnomeId: string;
}
