import { ImageResponse } from "next/og";
import { getEventBySlug } from "@/services";
import { formatDateRange } from "@/utils";
import { OgImageLayout } from "@/components/og";

export const alt = "Event";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        return new ImageResponse(
            <OgImageLayout badge='EVENT' title='Event Not Found' />,
            { ...size }
        );
    }

    const title = event.title ?? "Untitled Event";
    const dateRange = formatDateRange(
        event.eventDetails?.startDateTime,
        event.eventDetails?.endDateTime
    );
    const location = event.eventDetails?.location;
    const eventTypes =
        event.eventTypes?.nodes
            ?.map((node) => node?.name)
            .filter((name): name is string => Boolean(name)) ?? [];

    const subtitle = [
        dateRange ? `📅 ${dateRange}` : null,
        location ? `📍 ${location}` : null,
    ]
        .filter(Boolean)
        .join(" • ");

    return new ImageResponse(
        (
            <OgImageLayout
                badge={eventTypes[0] || "EVENT"}
                title={title}
                subtitle={subtitle || undefined}
            />
        ),
        { ...size }
    );
}
