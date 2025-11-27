/**
 * Event Detail Page
 * Thin orchestration layer - delegates to services and components
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/services";
import {
    formatDateRange,
    formatDateTimeRange,
    generateDescription,
} from "@/utils";
import {
    EventHeader,
    EventInfoBar,
    EventContent,
    EventFooter,
} from "@/components";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        return {
            title: "Event Not Found",
        };
    }

    const dateRange = formatDateRange(
        event.eventDetails?.startDateTime,
        event.eventDetails?.endDateTime
    );
    const location = event.eventDetails?.location;
    const eventDetails = `${dateRange}${location ? ` at ${location}` : ""}`;

    const description = generateDescription(
        event.content,
        undefined,
        `${eventDetails}. Discover events at HayArt Cultural Centre.`
    );

    return {
        title: event.title ?? "Untitled Event",
        description,
        openGraph: {
            type: "article",
        },
        other: {
            "og:image:width": "1200",
            "og:image:height": "630",
            "og:image:type": "image/png",
        },
    };
}

export default async function EventPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    const eventTypes =
        event.eventTypes?.nodes
            ?.map((node) => node?.name)
            .filter((name): name is string => Boolean(name)) ?? [];

    const dateTimeRange = formatDateTimeRange(
        event.eventDetails?.startDateTime,
        event.eventDetails?.endDateTime,
        "detail"
    );

    return (
        <>
            <EventHeader
                title={event.title ?? "Untitled Event"}
                imageUrl={event.featuredImage?.node?.sourceUrl ?? undefined}
            />
            <EventInfoBar
                dateRange={dateTimeRange}
                timeRange=''
                location={event.eventDetails?.location ?? undefined}
                priceInfo={event.eventDetails?.priceInfo ?? undefined}
            />
            <EventContent content={event.content} eventTypes={eventTypes} />
            <EventFooter />
        </>
    );
}
