
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import ExploreScreen from "../screens/ExploreScreen";
import BookingsScreen from "../screens/BookingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

import type {
  TabParamList,
  Student,
  Booking,
} from "../types/navigation";

const Tab = createBottomTabNavigator<TabParamList>();

type MainTabsProps = {
  user: Student;
  favorites: string[];
  bookings: Booking[];
  toggleFavorite: (spaceId: string) => void;
  onLogout: () => void;
  onCancelBooking: (bookingId: string) => void;
  remindersEnabled: boolean;
  onToggleReminders: (enabled: boolean) => void;
};

export default function MainTabs({
  user,
  favorites,
  bookings,
  toggleFavorite,
  onLogout,
  onCancelBooking,
  remindersEnabled,
  onToggleReminders
}: MainTabsProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#1A1751",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#1A1751",
        tabBarInactiveTintColor: "#888888",
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Explore":
              iconName = "search-outline";
              break;
            case "Bookings":
              iconName = "calendar-outline";
              break;
            default:
              iconName = "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Explore"
        options={{ title: "Explore" }}
      >
        {(screenProps) => (
          <ExploreScreen
            {...screenProps}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Bookings"
        options={{
          title: "My Bookings",
          tabBarBadge:
            bookings.length > 0 ? bookings.length : undefined,
        }}
      >
        {() => (
          <BookingsScreen
            bookings={bookings}
            onCancelBooking={onCancelBooking}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{ title: "Profile" }}
      >
        {() => (
          <ProfileScreen
            user={user}
            bookingsCount={bookings.length}
            favoritesCount={favorites.length}
            remindersEnabled={remindersEnabled}
            onToggleReminders={onToggleReminders}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 10,
  },
  logout: {
    marginTop: 20,
    color: "#DC2626",
    fontWeight: "bold",
  },
});
