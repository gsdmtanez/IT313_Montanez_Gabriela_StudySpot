import React from "react";
import { View, Text, StyleSheet } from "react-native";

type OccupancyBarProps = {
    occupied: number;
    seats: number;
};

export default function OccupancyBar({
    occupied,
    seats,
}:   OccupancyBarProps) {
    const percentage =
        seats > 0 ? Math.round((occupied / seats) * 100) : 0;

    const barWidth = Math.min(100, Math.max(0, percentage));

    const barColor =
        percentage < 50
          ? "#16A34A"
          : percentage <= 80
          ? "#D99A18"
          : "#DC2626";
    return (
        <View style={styles.container}>
            <View style={styles.labelRow}>
                <Text style={styles.label}>Occupancy</Text>
                <Text style={[styles.percentage, { color: barColor }]}>
                    {percentage}% full
                </Text>
            </View>

            <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    {
                        width: `${barWidth}%`,
                        backgroundColor: barColor,
                    },
                  ]}
                />
            </View>

            <Text style={styles.seats}>
                {occupied} of {seats} seats occupied
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 6,
    },
    labelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: 12,
        color: "#666666",
    },
    percentage: {
        fontSize: 12,
        fontWeight: "bold",
    },
    track: {
        height: 8,
        backgroundColor: "#E5E7EB",
        borderRadius: 10,
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        borderRadius: 10,
    },
    seats: {
        fontSize: 11,
        color: "#777777",
    },
});