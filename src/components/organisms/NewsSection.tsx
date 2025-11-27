/**
 * NewsSection Organism
 * Complete news section with header and card grid
 */

import type { Post } from "@/types";
import { NewsCard } from "../molecules";
import { SectionTitle } from "../atoms";

interface NewsSectionProps {
    posts: Post[];
}

export function NewsSection({ posts }: NewsSectionProps) {
    return (
        <section>
            <SectionTitle
                className='border-b-4 border-black pb-4 mb-6 sm:mb-8'
                actionLabel='NEWS + ARCHIVE'
                actionHref='/blog'
            >
                Latest News
            </SectionTitle>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                {posts.length === 0 ? (
                    <p className='col-span-full text-center uppercase tracking-[0.3em] py-12'>
                        No news items yet
                    </p>
                ) : (
                    posts.map((post) => (
                        <NewsCard key={post.slug ?? "unknown"} post={post} />
                    ))
                )}
            </div>
        </section>
    );
}
