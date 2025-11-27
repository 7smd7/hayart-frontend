/**
 * Event Service
 * Handles all event-related data fetching
 */

import { gql } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo-client";
import type { Event, EventDetail } from "@/types";

interface GetEventsResponse {
    events: {
        nodes: Event[];
    };
}

interface GetEventBySlugResponse {
    event: EventDetail | null;
}

export const GET_EVENTS_QUERY = gql`
    query GetEvents($first: Int = 20) {
        events(first: $first) {
            nodes {
                title
                slug
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                eventTypes {
                    nodes {
                        name
                    }
                }
                eventDetails {
                    startDateTime
                    endDateTime
                    location
                    priceInfo
                }
            }
        }
    }
`;

export const GET_EVENT_BY_SLUG_QUERY = gql`
    query GetEventBySlug($slug: ID!) {
        event(id: $slug, idType: SLUG) {
            title
            content
            featuredImage {
                node {
                    sourceUrl
                }
            }
            eventTypes {
                nodes {
                    name
                }
            }
            eventDetails {
                startDateTime
                endDateTime
                location
                priceInfo
            }
        }
    }
`;

export async function getEvents(first: number = 20): Promise<Event[]> {
    const client = createApolloClient();
    const { data } = await client.query<GetEventsResponse>({
        query: GET_EVENTS_QUERY,
        variables: { first },
    });

    return data?.events?.nodes ?? [];
}

export async function getEventBySlug(
    slug: string
): Promise<EventDetail | null> {
    const client = createApolloClient();
    const { data } = await client.query<GetEventBySlugResponse>({
        query: GET_EVENT_BY_SLUG_QUERY,
        variables: { slug },
    });

    return data?.event ?? null;
}

export const GET_HERO_EVENTS_QUERY = gql`
    query GetHeroEvents($first: Int = 5) {
        events(first: $first, where: { orderby: { field: DATE, order: ASC } }) {
            nodes {
                title
                slug
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                eventDetails {
                    startDateTime
                    endDateTime
                    location
                }
            }
        }
    }
`;

export async function getHeroEvents(first: number = 5): Promise<Event[]> {
    const client = createApolloClient();
    const { data } = await client.query<GetEventsResponse>({
        query: GET_HERO_EVENTS_QUERY,
        variables: { first },
    });

    const events = data?.events?.nodes ?? [];

    // Filter for upcoming events and sort by startDateTime
    const now = new Date();
    return events
        .filter((event) => {
            const startDate = event.eventDetails?.startDateTime;
            return startDate && new Date(startDate) >= now;
        })
        .sort((a, b) => {
            const dateA = new Date(
                a.eventDetails?.startDateTime || ""
            ).getTime();
            const dateB = new Date(
                b.eventDetails?.startDateTime || ""
            ).getTime();
            return dateA - dateB;
        })
        .slice(0, first);
}
