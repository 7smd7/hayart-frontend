/**
 * Events Archive Page
 * Displays all events in calendar format
 */

import { getEvents } from "@/services";
import { CalendarSection } from "@/components";

export default async function EventsPage() {
    const events = await getEvents(100);

    return (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12'>
            <CalendarSection events={events} />
        </div>
    );
}
