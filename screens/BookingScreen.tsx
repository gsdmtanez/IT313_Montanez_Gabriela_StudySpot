
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList, Booking } from "../types/navigation";

import { spaces } from "../data/spaces";

type BookingScreenProps =
  NativeStackScreenProps<RootStackParamList, "Booking"> & {
    bookings: Booking[];
    onConfirmBooking: (booking: Booking) => void;
  };

export default function BookingScreen({
  route,
  navigation,
  bookings,
  onConfirmBooking,
}: BookingScreenProps) {
  const { spaceId } = route.params;

  const space = spaces.find((item) => item.id === spaceId);

  const [selectedSlot, setSelectedSlot] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [purpose, setPurpose] = useState("");

  if (!space) {
    return (
      <View style={styles.center}>
        <Text style={styles.heading}>Study Space Not Found</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const alreadyBookedSlots = [
    ...space.bookedSlots,
    ...bookings
      .filter((booking) => booking.spaceId === spaceId)
      .map((booking) => booking.slot),
  ];

  const availableSlots = space.slots.filter(
    (slot) => !alreadyBookedSlots.includes(slot)
  );

  const isSlotValid =
    selectedSlot !== "" &&
    availableSlots.includes(selectedSlot);

  const isGroupSizeValid =
    groupSize >= 1 && groupSize <= space.seats;

  const isPurposeValid = purpose.trim().length >= 10;

  const canConfirm =
    isSlotValid && isGroupSizeValid && isPurposeValid;

  const handleConfirm = () => {
    if (!canConfirm) return;

    const newBooking: Booking = {
      id: `${Date.now()}`,
      spaceId: space.id,
      date: new Date().toLocaleDateString(),
      slot: selectedSlot,
      groupSize,
      purpose: purpose.trim(),
    };

    onConfirmBooking(newBooking);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Book Your Study Spot</Text>

        <Text style={styles.spaceName}>{space.name}</Text>

        <Text style={styles.location}>
          {space.building} • {space.floor}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Select a Time Slot</Text>

          <View style={styles.slotsContainer}>
            {space.slots.map((slot) => {
              const isBooked = alreadyBookedSlots.includes(slot);
              const isSelected = selectedSlot === slot;

              return (
                <Pressable
                  key={slot}
                  disabled={isBooked}
                  onPress={() => setSelectedSlot(slot)}
                  style={[
                    styles.slotButton,
                    isSelected && styles.selectedSlot,
                    isBooked && styles.bookedSlot,
                  ]}
                >
                  <Text
                    style={[
                      styles.slotText,
                      isSelected && styles.selectedSlotText,
                      isBooked && styles.bookedSlotText,
                    ]}
                  >
                    {slot}
                  </Text>

                  {isBooked && (
                    <Text style={styles.bookedLabel}>Booked</Text>
                  )}
                </Pressable>
              );
            })}
          </View>

          {availableSlots.length === 0 && (
            <Text style={styles.errorText}>
              No available time slots for this space.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Group Size</Text>

          <Text style={styles.helperText}>
            Maximum capacity: {space.seats} people
          </Text>

          <View style={styles.stepper}>
            <Pressable
              style={[
                styles.stepperButton,
                groupSize <= 1 && styles.disabledStepper,
              ]}
              disabled={groupSize <= 1}
              onPress={() => setGroupSize((size) => size - 1)}
            >
              <Ionicons name="remove" size={22} color="#FFFFFF" />
            </Pressable>

            <Text style={styles.groupSize}>{groupSize}</Text>

            <Pressable
              style={[
                styles.stepperButton,
                groupSize >= space.seats && styles.disabledStepper,
              ]}
              disabled={groupSize >= space.seats}
              onPress={() => setGroupSize((size) => size + 1)}
            >
              <Ionicons name="add" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Purpose of Booking</Text>

          <TextInput
            style={styles.purposeInput}
            placeholder="Describe why you need this study space..."
            placeholderTextColor="#999999"
            value={purpose}
            onChangeText={setPurpose}
            multiline
            textAlignVertical="top"
          />

          <Text
            style={[
              styles.characterCount,
              purpose.trim().length < 10 && styles.errorText,
            ]}
          >
            {purpose.trim().length}/10 minimum characters
          </Text>

          {purpose.length > 0 && !isPurposeValid && (
            <Text style={styles.errorText}>
              Please enter at least 10 characters.
            </Text>
          )}
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <Text style={styles.summaryText}>
            Space: {space.name}
          </Text>
          <Text style={styles.summaryText}>
            Time: {selectedSlot || "Not selected"}
          </Text>
          <Text style={styles.summaryText}>
            Group size: {groupSize}
          </Text>
        </View>

        <Pressable
          style={[
            styles.confirmButton,
            !canConfirm && styles.disabledConfirm,
          ]}
          disabled={!canConfirm}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText}>Confirm Booking</Text>
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7FA",
  },
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 12,
  },
  spaceName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333333",
  },
  location: {
    color: "#777777",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 12,
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  slotButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DAD8EF",
    padding: 12,
    borderRadius: 10,
    minWidth: "45%",
    alignItems: "center",
  },
  selectedSlot: {
    backgroundColor: "#1A1751",
    borderColor: "#1A1751",
  },
  bookedSlot: {
    backgroundColor: "#E5E5E5",
    borderColor: "#CCCCCC",
  },
  slotText: {
    fontSize: 12,
    color: "#1A1751",
    fontWeight: "600",
  },
  selectedSlotText: {
    color: "#FFFFFF",
  },
  bookedSlotText: {
    color: "#999999",
    textDecorationLine: "line-through",
  },
  bookedLabel: {
    color: "#999999",
    fontSize: 10,
    marginTop: 4,
  },
  helperText: {
    color: "#777777",
    fontSize: 12,
    marginBottom: 12,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  stepperButton: {
    backgroundColor: "#1A1751",
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledStepper: {
    backgroundColor: "#AAAAAA",
  },
  groupSize: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1751",
  },
  purposeInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDEE5",
    borderRadius: 12,
    padding: 14,
    minHeight: 110,
    fontSize: 14,
    color: "#333333",
  },
  characterCount: {
    fontSize: 11,
    color: "#777777",
    marginTop: 7,
  },
  errorText: {
    color: "#DC2626",
  },
  summary: {
    backgroundColor: "#EEEEF8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 13,
    color: "#555555",
    marginTop: 5,
  },
  confirmButton: {
    backgroundColor: "#1A1751",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
  },
  disabledConfirm: {
    backgroundColor: "#AAAAAA",
  },
  confirmText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 14,
    alignItems: "center",
  },
  cancelText: {
    color: "#DC2626",
    fontWeight: "600",
  },
  backText: {
    color: "#1A1751",
    marginTop: 15,
  },
});
