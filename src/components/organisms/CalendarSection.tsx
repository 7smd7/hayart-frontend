/**
 * CalendarSection Organism
 * Collapsible calendar with month labels and expandable days
 */

"use client";

import { useState, useMemo } from "react";
import type { Event } from "@/types";
import { formatCalendarDate, groupEventsByStartDay } from "@/utils";
import { EventCard } from "../molecules";
import { SectionTitle } from "../atoms";

interface CalendarSectionProps {
    events: Event[];
}

interface DayGroup {
    dateKey: string;
    month: string;
    dayLabel: string;
    events: Event[];
}

export function CalendarSection({ events }: CalendarSectionProps) {
    // Sort and group events
    const { groupedByMonth, allDays } = useMemo(() => {
        const sortedEvents = [...events].sort((a, b) => {
            const dateA = a.eventDetails?.startDateTime ?? "";
            const dateB = b.eventDetails?.startDateTime ?? "";
            return dateA.localeCompare(dateB);
        });

        const grouped = groupEventsByStartDay(sortedEvents);
        const sortedEntries = Object.entries(grouped).sort(([a], [b]) =>
            a.localeCompare(b)
        );

        const days: DayGroup[] = [];
        const byMonth: Record<string, DayGroup[]> = {};

        sortedEntries.forEach(([dateKey, dayEvents]) => {
            const firstEvent = dayEvents[0];
            const { month, dayLabel } = formatCalendarDate(
                firstEvent?.eventDetails?.startDateTime ?? `${dateKey}T00:00:00`
            );

            const dayGroup: DayGroup = {
                dateKey,
                month: month || "TBA",
                dayLabel: dayLabel || dateKey,
                events: dayEvents,
            };

            days.push(dayGroup);

            if (!byMonth[dayGroup.month]) {
                byMonth[dayGroup.month] = [];
            }
            byMonth[dayGroup.month].push(dayGroup);
        });

        return { groupedByMonth: byMonth, allDays: days };
    }, [events]);

    // Initialize with first day expanded
    const [expandedDays, setExpandedDays] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        if (allDays.length > 0) {
            initial.add(allDays[0].dateKey);
        }
        return initial;
    });

    const toggleDay = (dateKey: string) => {
        setExpandedDays((prev) => {
            const next = new Set(prev);
            if (next.has(dateKey)) {
                next.delete(dateKey);
            } else {
                next.add(dateKey);
            }
            return next;
        });
    };

    const months = Object.keys(groupedByMonth);

    return (
        <section>
            <SectionTitle
                className='mb-8 sm:mb-12 tracking-tighter'
                actionLabel='ALL EVENTS'
                actionHref='/event'
            >
                CALENDAR
            </SectionTitle>

            {months.length === 0 ? (
                <p className='text-center uppercase tracking-[0.3em] py-12'>
                    No upcoming events
                </p>
            ) : (
                <div className='border-t-4 border-black'>
                    {months.map((month, monthIndex) => (
                        <div
                            key={month}
                            className={`flex ${
                                monthIndex > 0 ? "border-t-4 border-black" : ""
                            }`}
                        >
                            {/* Month Label - Fixed left column */}
                            <div className='w-28 sm:w-36 md:w-44 shrink-0 border-r-2 border-black py-6 pr-4'>
                                <h3 className='text-lg sm:text-xl md:text-2xl font-black uppercase sticky top-24'>
                                    {month}
                                </h3>
                            </div>

                            {/* Days Column */}
                            <div className='flex-1 min-w-0'>
                                {groupedByMonth[month].map((day, dayIndex) => {
                                    const isExpanded = expandedDays.has(
                                        day.dateKey
                                    );

                                    return (
                                        <div
                                            key={day.dateKey}
                                            className={
                                                dayIndex > 0
                                                    ? "border-t-2 border-black"
                                                    : ""
                                            }
                                        >
                                            {/* Day Header - Clickable */}
                                            <button
                                                onClick={() =>
                                                    toggleDay(day.dateKey)
                                                }
                                                className='w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 hover:bg-gray-50 transition-colors text-left'
                                            >
                                                <h4 className='text-lg sm:text-xl md:text-2xl font-bold uppercase'>
                                                    {day.dayLabel}
                                                </h4>
                                                <span className='text-2xl sm:text-3xl font-light select-none'>
                                                    {isExpanded ? "↑" : "↓"}
                                                </span>
                                            </button>

                                            {/* Events - Collapsible */}
                                            {isExpanded && (
                                                <div className='px-4 sm:px-6 pb-6 grid gap-4 sm:grid-cols-2'>
                                                    {day.events.map((event) => (
                                                        <EventCard
                                                            key={
                                                                event.slug ??
                                                                day.dateKey
                                                            }
                                                            event={event}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
