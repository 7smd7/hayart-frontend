/**
 * Date Utilities
 * Pure functions for date formatting and manipulation
 */

export interface FormattedCalendarDate {
    month: string;
    dayLabel: string;
    time: string;
}

/**
 * Formats ISO date string for calendar display
 * Parses without timezone conversion to maintain original date/time
 * @param isoString - ISO 8601 date string (e.g., "2024-01-15T19:00:00")
 * @returns Object with formatted month, dayLabel, and time
 */
export function formatCalendarDate(
    isoString: string | null | undefined
): FormattedCalendarDate {
    if (!isoString) {
        return { month: "", dayLabel: "", time: "" };
    }

    // Parse ISO string without timezone conversion
    const [datePart, timePart] = isoString.split("T");
    if (!datePart) {
        return { month: "", dayLabel: "", time: "" };
    }

    const [year, month, day] = datePart.split("-").map(Number);
    if (!year || !month || !day) {
        return { month: "", dayLabel: "", time: "" };
    }

    // Create date in local timezone to avoid conversion
    const date = new Date(year, month - 1, day);
    if (Number.isNaN(date.getTime())) {
        return { month: "", dayLabel: "", time: "" };
    }

    const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
    })
        .format(date)
        .toUpperCase();

    const dayNum = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
        date
    );
    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" })
        .format(date)
        .toUpperCase();

    // Extract time directly from ISO string without timezone conversion
    let time = "";
    if (timePart) {
        const [hours, minutes] = timePart.split(":").map(Number);
        if (hours !== undefined && minutes !== undefined) {
            time = `${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}`;
        }
    }

    return {
        month: monthName,
        dayLabel: `${dayNum}, ${weekday}`,
        time,
    };
}

/**
 * Formats a date for blog post display
 * @param isoString - ISO 8601 date string
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatPostDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Formats date range for event display
 * @param start - Start date ISO string
 * @param end - End date ISO string
 * @returns Formatted date range (e.g., "15 JAN — 20 JAN")
 */
export function formatDateRange(
    start: string | null | undefined,
    end: string | null | undefined
): string {
    if (!start) return "";

    const [startDatePart] = start.split("T");
    const [endDatePart] = end?.split("T") || [];

    if (!startDatePart) return "";

    const [startYear, startMonth, startDay] = startDatePart
        .split("-")
        .map(Number);
    if (!startYear || !startMonth || !startDay) return "";

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const startFormatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
    })
        .format(startDate)
        .toUpperCase();

    if (!endDatePart) return startFormatted;

    const [endYear, endMonth, endDay] = endDatePart.split("-").map(Number);
    if (!endYear || !endMonth || !endDay) return startFormatted;

    const endDate = new Date(endYear, endMonth - 1, endDay);
    const endFormatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
    })
        .format(endDate)
        .toUpperCase();

    return `${startFormatted} — ${endFormatted}`;
}

/**
 * Formats time range for event display
 * @param start - Start date ISO string with time
 * @param end - End date ISO string with time
 * @returns Formatted time range (e.g., "19:00 — 22:00")
 */
export function formatTimeRange(
    start: string | null | undefined,
    end: string | null | undefined
): string {
    const extractTime = (isoString: string | null | undefined) => {
        if (!isoString) return "";
        const [, timePart] = isoString.split("T");
        if (!timePart) return "";
        const [hours, minutes] = timePart.split(":").map(Number);
        if (hours !== undefined && minutes !== undefined) {
            return `${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}`;
        }
        return "";
    };

    const startTime = extractTime(start);
    const endTime = extractTime(end);

    if (!startTime) return "";
    if (!endTime) return startTime;

    return `${startTime} — ${endTime}`;
}

/**
 * Formats datetime range for event display
 * For cards: "12:00 — 09:00 NOV 28" (if different dates)
 * For detail page: "12:00 NOV 25 — 09:00 NOV 28"
 * @param start - Start datetime ISO string
 * @param end - End datetime ISO string
 * @param format - "card" or "detail"
 * @returns Formatted datetime range
 */
export function formatDateTimeRange(
    start: string | null | undefined,
    end: string | null | undefined,
    format: "card" | "detail" = "card"
): string {
    if (!start) return "";

    const [startDatePart, startTimePart] = start.split("T");
    if (!startDatePart || !startTimePart) return "";

    const [startYear, startMonth, startDay] = startDatePart
        .split("-")
        .map(Number);
    if (!startYear || !startMonth || !startDay) return "";

    const [startHours, startMinutes] = startTimePart.split(":").map(Number);
    if (startHours === undefined || startMinutes === undefined) return "";

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const startTime = `${String(startHours).padStart(2, "0")}:${String(
        startMinutes
    ).padStart(2, "0")}`;
    const startDateFormatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
    })
        .format(startDate)
        .toUpperCase();

    if (!end) {
        return format === "card"
            ? `${startTime} ${startDateFormatted}`
            : `${startTime} ${startDateFormatted}`;
    }

    const [endDatePart, endTimePart] = end.split("T");
    if (!endDatePart || !endTimePart) {
        return format === "card"
            ? `${startTime} ${startDateFormatted}`
            : `${startTime} ${startDateFormatted}`;
    }

    const [endYear, endMonth, endDay] = endDatePart.split("-").map(Number);
    if (!endYear || !endMonth || !endDay) {
        return format === "card"
            ? `${startTime} ${startDateFormatted}`
            : `${startTime} ${startDateFormatted}`;
    }

    const [endHours, endMinutes] = endTimePart.split(":").map(Number);
    if (endHours === undefined || endMinutes === undefined) {
        return format === "card"
            ? `${startTime} ${startDateFormatted}`
            : `${startTime} ${startDateFormatted}`;
    }

    const endDate = new Date(endYear, endMonth - 1, endDay);
    const endTime = `${String(endHours).padStart(2, "0")}:${String(
        endMinutes
    ).padStart(2, "0")}`;
    const endDateFormatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
    })
        .format(endDate)
        .toUpperCase();

    // Check if same day
    const sameDay = startDatePart === endDatePart;

    if (format === "card") {
        // Card format: "12:00 — 09:00 NOV 28" or "12:00 NOV 25 — NOV 28"
        if (sameDay) {
            return `${startTime} — ${endTime} ${startDateFormatted}`;
        } else {
            return `${startTime} ${startDateFormatted} — ${endDateFormatted}`;
        }
    } else {
        // Detail format: "12:00 NOV 25 — 09:00 NOV 28"
        if (sameDay) {
            return `${startTime} — ${endTime} ${startDateFormatted}`;
        } else {
            return `${startTime} ${startDateFormatted} — ${endTime} ${endDateFormatted}`;
        }
    }
}
