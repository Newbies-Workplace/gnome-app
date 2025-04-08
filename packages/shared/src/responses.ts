export interface UserResponse {
  id: string;
  email: string;
  name: string;
  pictureUrl: string;
}

export interface UserPatchResponse {
  id: string;
  name: string;
  pictureUrl: string;
}

export interface GoogleUserResponse {
  provider: string;
  providerId: string;
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
  role: [string];
}

export interface GnomeResponse {
  name: string;
  id: string;
  funFact: string;
  latitude: number;
  longitude: number;
  location: string;
  creationDate: Date;
  description: string;
  exists: boolean;
  pictureUrl: string;
}

export interface GnomeIdResponse {
  name: string;
  id: string;
  funFact: string;
  latitude: number;
  longitude: number;
  location: string;
  creationDate: Date;
  description: string;
  exists: boolean;
  pictureUrl?: string;
  nearest: GnomeResponse[];
}

export interface InteractionResponse {
  id: string;
  gnomeId: string;
  userId: string;
  interactionDate: Date;
  userPicture?: string;
}

export interface ReportResponse {
  id: string;
  gnomeName: string;
  pictureUrl?: string;
  latitude: number;
  longitude: number;
  location: string;
  reportAuthor: string;
}

export interface FriendSearchResponse {
  id: string;
  name: string;
  pictureUrl: string;
}

export type Status = "ACTIVE" | "PENDING";

export interface FriendsResponse {
  id: string;
  senderId: string;
  receiverId: string;
  status: Status;
}

export interface TeamMembersResponse {
  userId: string;
}

export interface TeamResponse {
  id: string;
  leader: string;
  members: TeamMembersResponse[];
}
