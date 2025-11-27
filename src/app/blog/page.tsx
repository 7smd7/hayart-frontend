/**
 * Blog Archive Page
 * Displays all blog posts
 */

import { getPosts } from "@/services";
import { NewsCard } from "@/components";
import { SectionTitle } from "@/components";

export default async function BlogPage() {
    const posts = await getPosts(100);

    return (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12'>
            <div className='border-b-4 border-black pb-4 mb-8 sm:mb-12'>
                <SectionTitle>All News & Articles</SectionTitle>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                {posts.length === 0 ? (
                    <p className='col-span-full text-center uppercase tracking-[0.3em] py-12'>
                        No posts yet
                    </p>
                ) : (
                    posts.map((post) => (
                        <NewsCard key={post.slug ?? "unknown"} post={post} />
                    ))
                )}
            </div>
        </div>
    );
}
