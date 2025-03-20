import NavIcon, {
  NavHomeIcon,
  NavMushroomIcon,
  NavImageIcon,
  NavFriendsIcon,
} from "@/components/ui/navIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Collection from "../(tabs)/collection";
import Friends from "../(tabs)/friends";
import Image from "../(tabs)/gallery";
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
          tabBarItemStyle: navigation.isFocused() ? styles.activeTab : null,
        };
      }}
    >
      <Tab.Screen
        name="Główna"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <NavIcon
              color={focused ? "#FFF" : color}
              icon={NavHomeIcon}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Kolekcja"
        component={Collection}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <NavIcon
              color={focused ? "#FFF" : color}
              icon={NavMushroomIcon}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Znajomi"
        component={Friends}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <NavIcon
              color={focused ? "#FFF" : color}
              icon={NavFriendsIcon}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Zdjęcie"
        component={Image}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <NavIcon
              color={focused ? "#FFF" : color}
              icon={NavImageIcon}
              size={size}
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
