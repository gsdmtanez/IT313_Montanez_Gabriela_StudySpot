import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Platform,
} from "react-native";

import { StudySpace } from "../data/spaces";
import OccupancyBar from "./OccupancyBar";

type SpaceCardProps = {
    space: StudySpace;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onPress: () => void;
};

export default function SpaceCard({
    space,
    isFavorite,
    onToggleFavorite,
    onPress,
}:   SpaceCardProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.name}>{space.name}</Text>
                    <Text style={styles.floor}>
                        {space.floor}
                    </Text>
                </View>

                <Pressable
                    onPress={onToggleFavorite}
                    hitSlop={10}
                    style={styles.favoriteButton}
                >
                    <Text style={styles.heart}>
                        {isFavorite ? "❤︎⁠" : "♡"}
                    </Text>
                </Pressable>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>
                        {space.type}
                    </Text>
                </View>

                <Text style={styles.seatCount}>
                    {space.seats} seats
                </Text>
            </View>

                <OccupancyBar
                    occupied={space.occupied}
                    seats={space.seats}
                />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#EEEEF2",
        ...Platform.select({
            ios: {
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 5,
            },
            android: {
                elevation: 3,
            },
            default: {},
        }),
    },
    pressed: {
        opacity: 0.85,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    titleContainer: {
        flex: 1,
        marginRight: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1A1751",
    },
    floor: {
        fontSize: 12,
        color: "#777777",
        marginTop: 4,
    },
    favoriteButton: {
        padding: 4,
    },
    heart: {
        fontSize: 25,
        color: "#DC2626",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 14,
    },
    typeBadge: {
        backgroundColor: "#EEEEF8",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    typeText: {
        color: "#1A1751",
        fontSize: 11,
        fontWeight: 600,
    },
    seatCount: {
        color:" #666666",
        fontSize: 12, 
    },
});