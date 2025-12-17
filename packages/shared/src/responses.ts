export interface UserResponse {
  id: string;
  email: string;
  name: string;
  pictureUrl: string;
  inviteCode: string;
  role: string;
  resources: {
    berries: number;
    stones: number;
    sticks: number;
  };
}

export interface UserUpdateInviteCodeResponse {
  inviteCode: string;
}

export interface FriendDetailsResponse {
  id: string;
  name: string;
  pictureUrl: string;
  inviteCode: string;
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
  pictureUrl?: string;
  districtId?: number | null;
}

export interface GnomeDetailsResponse extends GnomeResponse {
  nearest: GnomeResponse[];
}

export interface InteractionResponse {
  id: string;
  gnomeId: string;
  userId: string;
  interactionDate: Date;
}

export interface InteractionExtendedResponse extends InteractionResponse {
  gnome: GnomeResponse;
  _metadata: {
    userResources: {
      berries: number;
      stones: number;
      sticks: number;
    };
    gatheredResources: {
      berries?: number;
      stones?: number;
      sticks?: number;
    };
  };
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
}

export interface AchievementResponse {
  id: string;
  name: string;
  description: string;
}

export interface UserAchievementResponse {
  achievement: {
    id: string;
    name: string;
    description: string;
  };
  earnedAt: Date;
}

export interface BuildingInteractionResponse {
  userId: string;
  createdAt: Date;
  interactionType: string;
  amount: number;
}
