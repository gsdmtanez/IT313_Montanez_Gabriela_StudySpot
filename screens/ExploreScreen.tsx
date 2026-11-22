
import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  SectionList,
  StyleSheet,
  useWindowDimensions,
  Keyboard,
} from "react-native";

import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { spaces } from "../data/spaces";
import type { StudySpace } from "../data/spaces";

import type {
  TabParamList,
  RootStackParamList,
} from "../types/navigation";

import SpaceCard from "../components/SpaceCard";
import FilterChip from "../components/FilterChip";

type ExploreScreenProps =
  BottomTabScreenProps<TabParamList, "Explore">;

type FilterType = "All" | "Quiet" | "Group" | "Open now" | "Favorites";

type SpaceSection = {
  title: string;
  data: StudySpace[][];
};

type ExploreExtraProps = {
  favorites: string[];
  toggleFavorite: (spaceId: string) => void;
};

type ExploreProps = ExploreScreenProps & ExploreExtraProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 25,
    flexGrow: 1,
  },
  intro: {
    marginTop: 20,
    marginBottom: 18,
  },
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#1A1751",
  },
  subtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E1E1E8",
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 15,
  },
  searchIcon: {
    fontSize: 24,
    color: "#777777",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#222222",
  },
  clearButton: {
    color: "#777777",
    fontSize: 17,
    padding: 5,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  bestMatch: {
    backgroundColor: "#EEEEF8",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DAD8EF",
    padding: 16,
    marginBottom: 22,
  },
  bestMatchHeading: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },
  bestMatchIcon: {
    fontSize: 18,
    color: "#1A1751",
    marginRight: 7,
  },
  bestMatchLabel: {
    color: "#1A1751",
    fontWeight: "bold",
    fontSize: 11,
    letterSpacing: 0.6,
  },
  bestMatchName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 5,
  },
  bestMatchLocation: {
    color: "#666666",
    fontSize: 12,
  },
  bestMatchOccupancy: {
    color: "#16803D",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 9,
  },
  bestMatchAction: {
    color: "#1A1751",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 12,
  },
  noMatch: {
    padding: 14,
    backgroundColor: "#F0F0F5",
    borderRadius: 12,
    marginBottom: 20,
  },
  noMatchText: {
    fontSize: 12,
    color: "#666666",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 12,
    marginTop: 5,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },
  cardWrapper: {
    flex: 1,
    minWidth: 0,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 30,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1751",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 12,
    color: "#777777",
    marginTop: 7,
    textAlign: "center",
  },
});

export default function ExploreScreen({
  navigation,
  favorites = [],
  toggleFavorite = () => {},
}: ExploreProps) {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>("All");

  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const columns = isWide ? 2 : 1;

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const matchesSearch =
        space.name.toLowerCase().includes(search.toLowerCase()) ||
        space.building.toLowerCase().includes(search.toLowerCase()) ||
        space.type.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        selectedFilter === "All" ||
        (selectedFilter === "Quiet" && space.type === "Quiet") ||
        (selectedFilter === "Group" && space.type === "Group") ||
        (selectedFilter === "Open now" &&
          space.occupied < space.seats) ||
        (selectedFilter === "Favorites" &&
          favorites.includes(space.id));

      return matchesSearch && matchesFilter;
    });
  }, [search, selectedFilter, favorites]);

  const bestMatch = useMemo(() => {
    const candidates = filteredSpaces.filter((space) => {
      const hasAvailableSeats = space.occupied < space.seats;

      const hasAvailableSlot = space.slots.some(
        (slot) => !space.bookedSlots.includes(slot)
      );

      return (
        space.type === "Quiet" &&
        hasAvailableSeats &&
        hasAvailableSlot
      );
    });

    return candidates.sort(
      (a, b) =>
        a.occupied / a.seats - b.occupied / b.seats
    )[0];
  }, [filteredSpaces]);

  const sections = useMemo(() => {
    const groupedSpaces: Record<string, StudySpace[]> = {};

    filteredSpaces.forEach((space) => {
      if (!groupedSpaces[space.building]) {
        groupedSpaces[space.building] = [];
      }

      groupedSpaces[space.building].push(space);
    });

    return Object.entries(groupedSpaces).map(
      ([building, buildingSpaces]): SpaceSection => {
        const rows: StudySpace[][] = [];

        for (
          let i = 0;
          i < buildingSpaces.length;
          i += columns
        ) {
          rows.push(buildingSpaces.slice(i, i + columns));
        }

        return {
          title: building,
          data: rows,
        };
      }
    );
  }, [filteredSpaces, columns]);

  const openDetails = (spaceId: string) => {
    Keyboard.dismiss();

    const rootNavigation =
      navigation.getParent<
        NativeStackNavigationProp<RootStackParamList>
      >();

    rootNavigation?.navigate("SpaceDetails", {
      spaceId,
    });
  };

  const renderHeader = () => (
    <View>
      <View style={styles.intro}>
        <Text style={styles.heading}>Find Your Study Spot</Text>
        <Text style={styles.subtitle}>
          Discover a space that matches your study needs.
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search spaces or buildings..."
          placeholderTextColor="#999999"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Text style={styles.clearButton}>✕</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.filterRow}>
        {(["All", "Quiet", "Group", "Open now", "Favorites"] as FilterType[]).map(
          (filter) => (
            <FilterChip
              key={filter}
              label={filter}
              selected={selectedFilter === filter}
              onPress={() => setSelectedFilter(filter)}
            />
          )
        )}
      </View>

      {bestMatch ? (
        <Pressable
          style={styles.bestMatch}
          onPress={() => openDetails(bestMatch.id)}
        >
          <View style={styles.bestMatchHeading}>
            <Text style={styles.bestMatchIcon}>✦</Text>
            <Text style={styles.bestMatchLabel}>
              BEST MATCH RIGHT NOW
            </Text>
          </View>

          <Text style={styles.bestMatchName}>
            {bestMatch.name}
          </Text>

          <Text style={styles.bestMatchLocation}>
            {bestMatch.building} • {bestMatch.floor}
          </Text>

          <Text style={styles.bestMatchOccupancy}>
            {bestMatch.seats - bestMatch.occupied} seats available
          </Text>

          <Text style={styles.bestMatchAction}>
            View space details →
          </Text>
        </Pressable>
      ) : (
        <View style={styles.noMatch}>
          <Text style={styles.noMatchText}>
            No quiet study space currently matches your filters.
            Try changing your search or filter.
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(row) =>
          row.map((space) => space.id).join("-")
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>
            {section.title}
          </Text>
        )}
        renderItem={({ item: row }) => (
          <View style={styles.cardRow}>
            {row.map((space) => (
              <View
                key={space.id}
                style={styles.cardWrapper}
              >
                <SpaceCard
                  space={space}
                  isFavorite={favorites.includes(space.id)}
                  onToggleFavorite={() =>
                    toggleFavorite(space.id)
                  }
                  onPress={() => openDetails(space.id)}
                />
              </View>
            ))}

            {isWide && row.length === 1 && (
              <View style={styles.cardWrapper} />
            )}
          </View>
        )}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No study spaces found
            </Text>
            <Text style={styles.emptySubtitle}>
              Try another keyword or select a different filter.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
