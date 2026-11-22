
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./navigation/RootNavigator";

import type {
  Student,
  Booking,
} from "./types/navigation";

export default function App() {
  const [user, setUser] = useState<Student | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  const handleLogin = (student: Student) => {
    setUser(student);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleToggleReminders = (enabled: boolean) => {
    setRemindersEnabled(enabled);
  };

  const handleConfirmBooking = (booking: Booking) => {
    setBookings((previous) => [...previous, booking]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((previous) =>
      previous.filter((booking) => booking.id !== bookingId)
    );
  };

  const toggleFavorite = (spaceId: string) => {
    setFavorites((previous) =>
      previous.includes(spaceId)
        ? previous.filter((id) => id !== spaceId)
        : [...previous, spaceId]
    );
  };

  return (
    <NavigationContainer>
      <RootNavigator
        user={user}
        favorites={favorites}
        bookings={bookings}
        toggleFavorite={toggleFavorite}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onConfirmBooking={handleConfirmBooking}
        onCancelBooking={handleCancelBooking}
        remindersEnabled={remindersEnabled}
        onToggleReminders={handleToggleReminders}
      />
    </NavigationContainer>
  );
}
