import { IsUUID } from "class-validator";

export class SendFriendRequest {
  @IsUUID()
  friendId: string;
}
