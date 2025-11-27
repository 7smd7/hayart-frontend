/**
 * Hero Slider Component
 * Full-width brutalist carousel showcasing upcoming events
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Event } from "@/types";
import { formatDateRange } from "@/utils";

interface HeroSliderProps {
    events: Event[];
}

export function HeroSlider({ events }: HeroSliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false }),
    ]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    if (!events.length) return null;

    return (
        <div className='relative w-full h-[600px] bg-black overflow-hidden'>
            <div className='overflow-hidden h-full' ref={emblaRef}>
                <div className='flex h-full'>
                    {events.map((event) => {
                        const dateRange = formatDateRange(
                            event.eventDetails?.startDateTime,
                            event.eventDetails?.endDateTime
                        );
                        const location = event.eventDetails?.location;
                        const label = [dateRange, location]
                            .filter(Boolean)
                            .join(" • ");

                        return (
                            <div
                                key={event.slug}
                                className='relative flex-[0_0_100%] min-w-0 h-full'
                            >
                                {/* Background Image */}
                                {event.featuredImage?.node?.sourceUrl && (
                                    <div className='absolute inset-0'>
                                        <Image
                                            src={
                                                event.featuredImage.node
                                                    .sourceUrl
                                            }
                                            alt={event.title ?? "Event"}
                                            fill
                                            className='object-cover'
                                            priority
                                        />
                                        {/* Dark overlay */}
                                        <div className='absolute inset-0 bg-black/40' />
                                    </div>
                                )}

                                {/* Content */}
                                <Link
                                    href={`/event/${event.slug}`}
                                    className='relative flex flex-col items-center justify-center h-full px-4 sm:px-8 text-center group'
                                >
                                    {/* Event Title */}
                                    <h1 className='text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white leading-none tracking-tight mb-6 max-w-5xl transition-transform group-hover:scale-105'>
                                        {event.title}
                                    </h1>

                                    {/* Date & Location Pill */}
                                    {label && (
                                        <div className='inline-block px-6 py-3 bg-white text-black font-bold text-sm sm:text-base uppercase tracking-wide rounded-full border-4 border-black'>
                                            {label}
                                        </div>
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={scrollPrev}
                className='absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors z-10'
                aria-label='Previous slide'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                    strokeLinecap='square'
                    className='w-6 h-6'
                >
                    <polyline points='15 18 9 12 15 6' />
                </svg>
            </button>

            <button
                onClick={scrollNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors z-10'
                aria-label='Next slide'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                    strokeLinecap='square'
                    className='w-6 h-6'
                >
                    <polyline points='9 18 15 12 9 6' />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10'>
                {events.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-3 h-3 border-2 border-white transition-all ${
                            index === selectedIndex
                                ? "bg-white scale-125"
                                : "bg-transparent hover:bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
