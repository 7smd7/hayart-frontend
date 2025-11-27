/**
 * EventCard Molecule
 * Brutalist event card component for calendar view
 */

import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types";
import { formatDateTimeRange } from "@/utils";

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    const dateTimeRange = formatDateTimeRange(
        event.eventDetails?.startDateTime,
        event.eventDetails?.endDateTime,
        "card"
    );
    const eventLocation = event.eventDetails?.location;
    const priceInfo = event.eventDetails?.priceInfo;
    const eventTypes =
        event.eventTypes?.nodes
            ?.map((node) => node?.name)
            .filter((name): name is string => Boolean(name)) ?? [];

    return (
        <Link
            href={`/event/${event.slug}`}
            className='group flex flex-col sm:flex-row border-2 border-black bg-white transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden'
        >
            {/* Image - Top on mobile, Right on desktop */}
            {event.featuredImage?.node?.sourceUrl && (
                <div className='relative aspect-video sm:aspect-auto sm:w-40 md:w-48 shrink-0 sm:order-2 sm:border-l-2 border-b-2 sm:border-b-0 border-black'>
                    <Image
                        src={event.featuredImage.node.sourceUrl}
                        alt={event.title ?? "Event image"}
                        fill
                        className='object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                    />
                </div>
            )}

            {/* Content */}
            <div className='p-4 sm:p-5 flex flex-col justify-between grow min-w-0 sm:order-1'>
                <div className='flex-1'>
                    <h5 className='text-base sm:text-lg md:text-xl font-bold uppercase leading-tight mb-2 line-clamp-2'>
                        {event.title ?? "Untitled Event"}
                    </h5>
                    {(eventTypes.length > 0 || eventLocation) && (
                        <p className='text-xs font-mono uppercase tracking-wide mb-3 line-clamp-1'>
                            {[...eventTypes, eventLocation]
                                .filter(Boolean)
                                .join(" • ")}
                        </p>
                    )}
                </div>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-bold border-t border-black pt-3 mt-3'>
                    {dateTimeRange && <span>{dateTimeRange}</span>}
                    {priceInfo && <span>{priceInfo}</span>}
                </div>
            </div>
        </Link>
    );
}
