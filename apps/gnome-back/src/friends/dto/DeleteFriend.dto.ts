import { IsUUID } from "class-validator";

export class DeleteFriend {
  @IsUUID()
  friendId: string;
}
