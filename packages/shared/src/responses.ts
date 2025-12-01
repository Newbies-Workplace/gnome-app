export interface UserResponse {
  id: string;
  email: string;
  name: string;
  pictureUrl: string;
  inviteCode: string;
}

export interface UserFriendResponse {
  id: string;
  name: string;
  pictureUrl: string;
  gnomeInteractions: InteractionResponse[];
  achievements: UserAchievementResponse[];
  inviteCode: string;
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
  districtId?: number | null;
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
  districtId?: number | null;
  nearest: GnomeResponse[];
}

export interface InteractionResponse {
  id: string;
  gnomeId: string;
  userId: string;
  interactionDate: Date;
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

export interface FriendShipResponse {
  id: string;
  senderId: string;
  receiverId: string;
}

export interface FriendResponse {
  id: string;
  name: string;
  avatar: string | null;
  interactions: number;
}

export interface TeamMembersResponse {
  userId: string;
}

export interface TeamResponse {
  id: string;
  leader: string;
  members: TeamMembersResponse[];
}

export interface DistrictsResponse {
  id: number;
  name: string;
}
export interface BuildingResponse {
  id: string;
  gnomeCount: number;
  health: number;
  latitude: number;
  longitude: number;
  districtId: number;
  type: string;
  createdAt: Date;
  ownerId: string;

export interface AchievementDataResponse {
  id: string;
  name: string;
  description: string;
  users: number;
}

export interface UserAchievementResponse {
  achievementId: string;
  earnedAt: Date;
}
