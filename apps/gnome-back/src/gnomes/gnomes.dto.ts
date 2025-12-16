import { GnomeInteraction, UserResource } from "@prisma/client";

export type GnomeInteractionCreateResult = {
  interaction: GnomeInteraction;
  _metadata: {
    userResources: UserResource;
    gatheredResources: {
      berries?: number;
      stones?: number;
      sticks?: number;
    };
  };
};
