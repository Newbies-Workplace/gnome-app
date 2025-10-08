import NavFriendsIcon from "@/assets/icons/NavFriends.svg";
import NavHomeIcon from "@/assets/icons/NavHome.svg";
import NavMushroomIcon from "@/assets/icons/NavMushroom.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Collection from "../(tabs)/collection";
import Friends from "../(tabs)/friends";
import Home from "../(tabs)/index";

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
          tabBarItemStyle: navigation.isFocused()
            ? styles.activeTab
            : styles.inactiveTab,
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
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    elevation: 0,
    position: "absolute",
    bottom: 10,
    marginHorizontal: 10,
    borderRadius: 20,

    backgroundColor: "#222",
    borderTopWidth: 0,
  },
  activeTab: {
    backgroundColor: "#D6484A",
    borderRadius: 12,
    margin: 8,
  },
  inactiveTab: {
    borderRadius: 12,
    margin: 8,
  },
});

export default HomeTabs;
