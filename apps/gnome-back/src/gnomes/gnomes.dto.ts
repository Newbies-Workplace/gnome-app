import { GnomeInteraction, UserResource } from "@/generated/prisma/client";

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
