
import React, { useLayoutEffect } from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../types/navigation";

import { spaces } from "../data/spaces";

import OccupancyBar from "../components/OccupancyBar";

type SpaceDetailsScreenProps =
  NativeStackScreenProps<RootStackParamList, "SpaceDetails"> & {
    favorites: string[];
    toggleFavorite: (spaceId: string) => void;
  };

export default function SpaceDetailsScreen({
  route,
  navigation,
  favorites,
  toggleFavorite,
}: SpaceDetailsScreenProps) {
  const { spaceId } = route.params;

  const space = spaces.find((item) => item.id === spaceId);

  const isFavorite = favorites.includes(spaceId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Space Details",
      headerRight: () =>
        space ? (
          <Pressable
            onPress={() => toggleFavorite(space.id)}
            style={styles.headerFavorite}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={25}
              color={isFavorite ? "#FF6B81" : "#FFFFFF"}
            />
          </Pressable>
        ) : null,
    });
  }, [navigation, space, isFavorite, toggleFavorite]);

  if (!space) {
    return (
      <View style={styles.notFoundContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={55}
          color="#999999"
        />

        <Text style={styles.notFoundTitle}>
          Study Space Not Found
        </Text>

        <Text style={styles.notFoundText}>
          This study space may no longer be available.
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const availableSeats = space.seats - space.occupied;

  const availableSlots = space.slots.filter(
    (slot) => !space.bookedSlots.includes(slot)
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Placeholder image */}
      <View style={styles.imagePlaceholder}>
        <Ionicons
          name="business-outline"
          size={65}
          color="#7777A8"
        />
        <Text style={styles.imageText}>
          StudySpot Space Preview
        </Text>
      </View>

      {/* Basic information */}
      <View style={styles.section}>
        <View style={styles.titleRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.spaceName}>
              {space.name}
            </Text>

            <Text style={styles.location}>
              {space.building} • {space.floor}
            </Text>
          </View>

          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>
              {space.type}
            </Text>
          </View>
        </View>
      </View>

      {/* Occupancy */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>
          Live Occupancy
        </Text>

        <OccupancyBar
          occupied={space.occupied}
          seats={space.seats}
        />

        <Text style={styles.availableText}>
          {availableSeats} seats currently available
        </Text>
      </View>

      {/* Amenities */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>
          Amenities
        </Text>

        <View style={styles.amenitiesContainer}>
          {space.amenities.map((amenity) => (
            <View
              key={amenity}
              style={styles.amenityChip}
            >
              <Ionicons
                name="checkmark-circle"
                size={15}
                color="#16803D"
              />

              <Text style={styles.amenityText}>
                {amenity}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>
          About This Space
        </Text>

        <Text style={styles.description}>
          {space.description}
        </Text>
      </View>

      {/* Available slots */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>
          Available Booking Slots
        </Text>

        {availableSlots.length > 0 ? (
          <View style={styles.slotsContainer}>
            {availableSlots.map((slot) => (
              <View
                key={slot}
                style={styles.slotChip}
              >
                <Ionicons
                  name="time-outline"
                  size={15}
                  color="#1A1751"
                />

                <Text style={styles.slotText}>
                  {slot}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noSlotsText}>
            No available booking slots at the moment.
          </Text>
        )}
      </View>

      {/* Booking button */}
      <Pressable
        style={[
          styles.bookButton,
          availableSlots.length === 0 && styles.disabledButton,
        ]}
        disabled={availableSlots.length === 0}
        onPress={() =>
          navigation.navigate("Booking", { spaceId: space.id })
        }
      >
        <Text style={styles.bookButtonText}>
          Book This Space
        </Text>

        <Ionicons
          name="arrow-forward"
          size={19}
          color="#FFFFFF"
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },
  content: {
    padding: 18,
    paddingBottom: 35,
  },
  imagePlaceholder: {
    height: 190,
    backgroundColor: "#E8E8F4",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },
  imageText: {
    color: "#7777A8",
    fontSize: 12,
    marginTop: 10,
  },
  section: {
    marginBottom: 22,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  spaceName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A1751",
  },
  location: {
    fontSize: 13,
    color: "#777777",
    marginTop: 6,
  },
  typeBadge: {
    backgroundColor: "#E8E8F4",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  typeText: {
    color: "#1A1751",
    fontSize: 11,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 14,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#EEEEF2",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 12,
  },
  availableText: {
    color: "#16803D",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 10,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },
  amenityChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1E1E8",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 6,
  },
  amenityText: {
    color: "#444444",
    fontSize: 12,
  },
  description: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 22,
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },
  slotChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DAD8EF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  slotText: {
    color: "#1A1751",
    fontSize: 12,
    fontWeight: "600",
  },
  noSlotsText: {
    color: "#888888",
    fontSize: 13,
  },
  bookButton: {
    backgroundColor: "#1A1751",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  disabledButton: {
    backgroundColor: "#999999",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  headerFavorite: {
    padding: 8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#F7F7FA",
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1751",
    marginTop: 15,
  },
  notFoundText: {
    color: "#777777",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#1A1751",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
