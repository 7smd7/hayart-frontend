/**
 * Event Utilities
 * Pure functions for event processing and grouping
 */

import type { Event } from "@/types";

/**
 * Groups events by their start date (day)
 * @param events - Array of events to group
 * @returns Record with date keys (YYYY-MM-DD) and event arrays
 */
export function groupEventsByStartDay(
    events: Event[]
): Record<string, Event[]> {
    return events.reduce<Record<string, Event[]>>((accumulator, event) => {
        const startISO = event.eventDetails?.startDateTime;
        if (!startISO) {
            return accumulator;
        }
        const dayKey = startISO.split("T")[0];
        if (!dayKey) {
            return accumulator;
        }
        if (!accumulator[dayKey]) {
            accumulator[dayKey] = [];
        }
        accumulator[dayKey].push(event);
        return accumulator;
    }, {});
}
