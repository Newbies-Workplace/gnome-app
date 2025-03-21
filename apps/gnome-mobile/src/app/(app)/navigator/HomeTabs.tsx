import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Collection from "../(tabs)/collection";
import Friends from "../(tabs)/friends";
import Image from "../(tabs)/gallery";
import Home from "../(tabs)/index";

import NavFriendsIcon from "@/assets/icons/NavFriends.svg";
//Ikony do tabsów
import NavHomeIcon from "@/assets/icons/NavHome.svg";
import NavImageIcon from "@/assets/icons/NavImage.svg";
import NavMushroomIcon from "@/assets/icons/NavMushroom.svg";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        return {
          tabBarLabel: navigation.isFocused() ? route.name : "",
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelPosition: "beside-icon",
          tabBarActiveTintColor: "#FFFFFF",
          tabBarItemStyle: navigation.isFocused() ? styles.activeTab : null,
        };
      }}
    >
      <Tab.Screen
        name="Główna"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size = 25, focused }) => (
            <NavHomeIcon
              height={size}
              width={size}
              color={focused ? "#FFF" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Kolekcja"
        component={Collection}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size = 25, focused }) => (
            <NavMushroomIcon
              height={size}
              width={size}
              color={focused ? "#FFF" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Znajomi"
        component={Friends}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size = 25, focused }) => (
            <NavFriendsIcon
              height={size}
              width={size}
              color={focused ? "#FFF" : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Zdjęcie"
        component={Image}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size = 25, focused }) => (
            <NavImageIcon
              color={focused ? "#FFF" : color}
              height={size}
              width={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#222",
    borderTopWidth: 0,
  },

  activeTab: {
    backgroundColor: "#D6484A",
    borderRadius: 40,
    margin: 5,
  },
});

export default HomeTabs;
