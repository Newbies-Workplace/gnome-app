import { IsOptional, IsUUID } from "class-validator";

export class friendsDto {
  @IsUUID()
  @IsOptional()
  friendId: string;

  @IsUUID()
  @IsOptional()
  senderId: string;
}
