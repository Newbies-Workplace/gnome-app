import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { FriendsService } from "@/lib/api/Friends.service";

type Friend = {
  id: string;
  name: string;
  avatar: string | null;
};

interface FriendsStore {
  friends: Friend[];

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
