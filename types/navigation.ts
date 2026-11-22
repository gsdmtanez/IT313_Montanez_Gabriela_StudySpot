import { spaces } from "../data/spaces";

export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    SpaceDetails: {
        spaceId: string;
    };
    Booking: {
        spaceId: string;
    };
};

export type TabParamList = {
    Explore: undefined;
    Bookings: undefined;
    Profile: undefined;
};

export type Student = {
    fullName: string;
    section: string;
};

export type Booking = {
    id: string;
    spaceId: string;
    date: string;
    slot: string;
    groupSize: number;
    purpose: string;
};

