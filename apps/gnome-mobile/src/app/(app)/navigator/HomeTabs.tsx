import {
  TabList,
  TabSlot,
  Tabs,
  TabTrigger,
  TabTriggerSlotProps,
} from "expo-router/ui";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { SvgProps } from "react-native-svg";
import NavFriendsIcon from "@/assets/icons/NavFriends.svg";
import NavHomeIcon from "@/assets/icons/NavHome.svg";
import NavMushroomIcon from "@/assets/icons/NavMushroom.svg";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const HomeTabs = () => {
  return (
    <Tabs>
      <TabSlot />

      <SafeAreaView
        edges={["bottom"]}
        className={"absolute bottom-0 left-0 w-full"}
      >
        <View
          className={
            "flex-row justify-between bg-background m-2 mx-4 p-2 rounded-3xl"
          }
        >
          <TabTrigger name={"Główna"} href={"/"} asChild>
            <TabButton Icon={NavHomeIcon}>Główna</TabButton>
          </TabTrigger>

          <TabTrigger name={"Kolekcja"} href={"/collection"} asChild>
            <TabButton Icon={NavMushroomIcon}>Kolekcja</TabButton>
          </TabTrigger>

          <TabTrigger name={"Znajomi"} href={"/friends"} asChild>
            <TabButton Icon={NavFriendsIcon}>Znajomi</TabButton>
          </TabTrigger>
        </View>
      </SafeAreaView>

      <TabList style={{ display: "none" }}>
        <TabTrigger name={"Główna"} href={"/"} />
        <TabTrigger name={"Kolekcja"} href={"/collection"} />
        <TabTrigger name={"Znajomi"} href={"/friends"} />
      </TabList>
    </Tabs>
  );
};

export type TabButtonProps = TabTriggerSlotProps & {
  Icon?: React.FC<SvgProps>;
};

function TabButton({ Icon, children, isFocused, ...props }: TabButtonProps) {
  return (
    <Pressable
      {...props}
      className={cn(
        "rounded-2xl p-2 gap-2 items-center bg-background w-1/3",
        isFocused && "bg-primary",
      )}
    >
      <View
        className={cn(
          "w-full flex-row gap-2 items-center justify-center",
          !isFocused && "w-full",
        )}
      >
        {/* @ts-ignore */}
        <Icon height={25} width={25} color={"#fff"} />

        {isFocused && (
          <Text className={"text-white font-bold"}>{children}</Text>
        )}
      </View>
    </Pressable>
  );
}

export default HomeTabs;
