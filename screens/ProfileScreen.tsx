
import React from "react";

import {
  View,
  Text,
  Switch,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type {
  Student,
} from "../types/navigation";

type ProfileScreenProps = {
  user: Student;
  bookingsCount: number;
  favoritesCount: number;
  remindersEnabled: boolean;
  onToggleReminders: (enabled: boolean) => void;
  onLogout: () => void;
};

export default function ProfileScreen({
  user,
  bookingsCount,
  favoritesCount,
  remindersEnabled,
  onToggleReminders,
  onLogout,
}: ProfileScreenProps) {

  const initials = user.fullName
    .trim()
    .split(/\s+/)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>

        <Text style={styles.name}>{user.fullName}</Text>

        <Text style={styles.section}>
          {user.section}
        </Text>

        <Text style={styles.subtitle}>
          StudySpot Student Profile
        </Text>
      </View>

      <Text style={styles.sectionHeading}>
        My Activity
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons
            name="calendar-outline"
            size={26}
            color="#1A1751"
          />

          <Text style={styles.statNumber}>
            {bookingsCount}
          </Text>

          <Text style={styles.statLabel}>
            Bookings
          </Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons
            name="heart-outline"
            size={26}
            color="#E05270"
          />

          <Text style={styles.statNumber}>
            {favoritesCount}
          </Text>

          <Text style={styles.statLabel}>
            Favorites
          </Text>
        </View>
      </View>

      <Text style={styles.sectionHeading}>
        Preferences
      </Text>

      <View style={styles.preferenceCard}>
        <View style={styles.preferenceIcon}>
          <Ionicons
            name="notifications-outline"
            size={23}
            color="#1A1751"
          />
        </View>

        <View style={styles.preferenceTextContainer}>
          <Text style={styles.preferenceTitle}>
            Booking Reminders
          </Text>

          <Text style={styles.preferenceSubtitle}>
            Enable or disable booking reminders.
          </Text>
        </View>

        <Switch
          value={remindersEnabled}
          onValueChange={onToggleReminders}
          trackColor={{
            false: "#CCCCCC",
            true: "#7771B8",
          }}
          thumbColor={
            remindersEnabled ? "#1A1751" : "#F4F4F4"
          }
        />
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={onLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#DC2626"
        />

        <Text style={styles.logoutText}>
          Log Out
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        StudySpot • Find your perfect study space.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  profileHeader: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#EEEEF2",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1A1751",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  initials: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1751",
    textAlign: "center",
  },
  section: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 11,
    color: "#999999",
    marginTop: 8,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 13,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEF2",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1751",
    marginTop: 9,
  },
  statLabel: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
  },
  preferenceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEEEF2",
    marginBottom: 25,
  },
  preferenceIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEEEF8",
    justifyContent: "center",
    alignItems: "center",
  },
  preferenceTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 5,
  },
  preferenceTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1A1751",
  },
  preferenceSubtitle: {
    fontSize: 11,
    color: "#888888",
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#F2CACA",
    borderRadius: 12,
    padding: 15,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DC2626",
  },
  footer: {
    fontSize: 11,
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 25,
  },
});
