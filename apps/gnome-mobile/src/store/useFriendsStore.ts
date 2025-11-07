import AsyncStorage from "@react-native-async-storage/async-storage";
import { FriendResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { FriendsService } from "@/lib/api/Friends.service";

interface FriendsStore {
  friends: FriendResponse[];

  fetchUserFriends: () => Promise<void>;
  addFriend: (inviteCode: string) => Promise<void>;
}

export const useFriendsStore = create<FriendsStore>()(
  persist(
    (set) => ({
      friends: [],

      fetchUserFriends: async () => {
        const friends = await FriendsService.findUserFriends();

        set({ friends });
      },

      addFriend: async (inviteCode) => {
        const newFriend = await FriendsService.addFriend(inviteCode);
        set((state) => ({ friends: [...state.friends, newFriend] }));
      },
    }),
    {
      name: "friends-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
