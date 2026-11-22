
import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import MainTabs from "./MainTabs";
import SpaceDetailsScreen from "../screens/SpaceDetailsScreen";
import BookingScreen from "../screens/BookingScreen";

import type {
  RootStackParamList,
  Student,
  Booking,
} from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootNavigatorProps = {
  user: Student | null;
  favorites: string[];
  bookings: Booking[];
  toggleFavorite: (spaceId: string) => void;
  onLogin: (student: Student) => void;
  onLogout: () => void;
  onConfirmBooking: (booking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  remindersEnabled: boolean;
  onToggleReminders: (enabled: boolean) => void;
};

export default function RootNavigator({
  user,
  favorites,
  bookings,
  toggleFavorite,
  onLogin,
  onLogout,
  onConfirmBooking,
  onCancelBooking,
  remindersEnabled,
  onToggleReminders
}: RootNavigatorProps) {
  return (
    <Stack.Navigator>
      {user === null ? (
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
        >
          {() => <LoginScreen onLogin={onLogin} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            options={{
              headerShown: false,
            }}
          >
            {() => (
              <MainTabs
                user={user}
                favorites={favorites}
                bookings={bookings}
                toggleFavorite={toggleFavorite}
                onLogout={onLogout}
                onCancelBooking={onCancelBooking}
                remindersEnabled={remindersEnabled}
                onToggleReminders={onToggleReminders}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="SpaceDetails">
            {(screenProps) => (
              <SpaceDetailsScreen
                {...screenProps}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Booking"
            options={{
              title: "Book a Space",
              presentation: "modal",
            }}
          >
            {(screenProps) => (
              <BookingScreen
                {...screenProps}
                bookings={bookings}
                onConfirmBooking={onConfirmBooking}
              />
            )}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}
