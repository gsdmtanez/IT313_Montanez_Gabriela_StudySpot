
import React from "react";

import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { Booking } from "../types/navigation";

import { spaces } from "../data/spaces";

type BookingsScreenProps = {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
};

export default function BookingsScreen({
  bookings,
  onCancelBooking,
}: BookingsScreenProps) {

  const confirmCancellation = (booking: Booking) => {
    const space = spaces.find(
      (item) => item.id === booking.spaceId
    );

    Alert.alert(
      "Cancel Booking",
      `Are you sure you want to cancel your booking for ${space?.name ?? "this study space"}?`,
      [
        {
          text: "Keep Booking",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => onCancelBooking(booking.id),
        },
      ]
    );
  };

  const renderBooking = ({ item }: { item: Booking }) => {
    const space = spaces.find(
      (space) => space.id === item.spaceId
    );

    return (
      <Pressable
        style={styles.bookingCard}
        onLongPress={() => confirmCancellation(item)}
        delayLongPress={600}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="book-outline"
              size={23}
              color="#1A1751"
            />
          </View>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Confirmed</Text>
          </View>
        </View>

        <Text style={styles.spaceName}>
          {space?.name ?? "Unknown Study Space"}
        </Text>

        <Text style={styles.location}>
          {space?.building ?? "Unknown Building"}
          {space ? ` • ${space.floor}` : ""}
        </Text>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Ionicons
            name="calendar-outline"
            size={17}
            color="#777777"
          />
          <Text style={styles.detailText}>
            {item.date}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons
            name="time-outline"
            size={17}
            color="#777777"
          />
          <Text style={styles.detailText}>
            {item.slot}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons
            name="people-outline"
            size={17}
            color="#777777"
          />
          <Text style={styles.detailText}>
            Group size: {item.groupSize}
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.purposeLabel}>
          Purpose
        </Text>

        <Text style={styles.purposeText}>
          {item.purpose}
        </Text>

        <Pressable
          style={styles.cancelButton}
          onPress={() => confirmCancellation(item)}
        >
          <Ionicons
            name="close-circle-outline"
            size={18}
            color="#DC2626"
          />
          <Text style={styles.cancelButtonText}>
            Cancel Booking
          </Text>
        </Pressable>

        <Text style={styles.longPressHint}>
          Tip: Long-press this booking to cancel it.
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My Bookings</Text>
        <Text style={styles.subtitle}>
          Manage your confirmed study space reservations.
        </Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBooking}
        contentContainerStyle={
          bookings.length === 0
            ? styles.emptyList
            : styles.listContent
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="calendar-outline"
              size={65}
              color="#B7B5CC"
            />

            <Text style={styles.emptyTitle}>
              No Bookings Yet
            </Text>

            <Text style={styles.emptySubtitle}>
              Your confirmed study space reservations will appear here.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },
  headingContainer: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1751",
  },
  subtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 17,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E9E9F0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#EEEEF8",
    justifyContent: "center",
    alignItems: "center",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EC",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#16803D",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#16803D",
  },
  spaceName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A1751",
  },
  location: {
    fontSize: 12,
    color: "#777777",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEF2",
    marginVertical: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  detailText: {
    fontSize: 13,
    color: "#555555",
  },
  purposeLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 5,
  },
  purposeText: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 19,
  },
  cancelButton: {
    marginTop: 17,
    borderWidth: 1,
    borderColor: "#F2CACA",
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
  cancelButtonText: {
    color: "#DC2626",
    fontWeight: "bold",
    fontSize: 13,
  },
  longPressHint: {
    color: "#999999",
    fontSize: 10,
    textAlign: "center",
    marginTop: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1A1751",
    marginTop: 17,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#888888",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },
});
