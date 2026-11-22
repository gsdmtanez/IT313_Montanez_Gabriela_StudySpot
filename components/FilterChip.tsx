import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type FilterChipProps = {
    label: string;
    selected: boolean;
    onPress: () => void;
};

export default function FilterChip({
    label,
    selected,
    onPress,
}:    FilterChipProps) {
    return (
        <Pressable
          onPress={onPress}
          style={[
            styles.chip,
            selected && styles.selectedChip,
          ]}
        >
            <Text
              style={[
                styles.text,
                selected && styles.selectedText,
              ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#F0F0F5",
        borderWidth: 1,
        borderColor: "#E0E0E8",
    },
    selectedChip: {
        backgroundColor: "#1A1751",
        borderColor: "#1A1751",
    },
    text: {
        color: "#444444",
        fontSize: 13,
        fontWeight: "500",
    },
    selectedText: {
        color: "#FFFFFF",
    },
});