/**
 * Event Types
 * Centralized type definitions for events
 */

import type { FeaturedImage } from "./post";

export interface EventType {
    name: string | null;
}

export interface EventDetails {
    startDateTime?: string | null;
    endDateTime?: string | null;
    location?: string | null;
    priceInfo?: string | null;
}

export interface Event {
    title: string | null;
    slug: string;
    featuredImage?: FeaturedImage;
    eventTypes?: {
        nodes?: EventType[];
    } | null;
    eventDetails?: EventDetails | null;
}

export interface EventDetail extends Event {
    content: string;
}

export interface GroupedEvents {
    [dateKey: string]: Event[];
}
