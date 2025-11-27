/**
 * Homepage
 * Thin orchestration layer - delegates to services and components
 */

import { getPosts, getEvents, getHeroEvents } from "@/services";
import { HeroSlider, NewsSection, CalendarSection } from "@/components";

export default async function Home() {
    const [heroEvents, latestNews, upcomingEvents] = await Promise.all([
        getHeroEvents(5),
        getPosts(3),
        getEvents(20),
    ]);

    return (
        <>
            <HeroSlider events={heroEvents} />
            <div className='mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-20'>
                <NewsSection posts={latestNews} />
                <CalendarSection events={upcomingEvents} />
            </div>
        </>
    );
}
