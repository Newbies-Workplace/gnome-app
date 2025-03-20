import { IsUUID } from "class-validator";

export class AcceptFriendRequest {
  @IsUUID()
  senderId: string;
}
