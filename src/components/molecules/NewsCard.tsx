/**
 * NewsCard Molecule
 * Brutalist news card component for homepage
 */

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";

interface NewsCardProps {
    post: Post;
}

export function NewsCard({ post }: NewsCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className='group flex flex-col border-2 sm:border-4 border-black bg-white transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]'
        >
            <div className='relative aspect-video sm:h-48 bg-zinc-100 overflow-hidden'>
                {post.featuredImage?.node?.sourceUrl ? (
                    <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title ?? "Untitled"}
                        fill
                        className='object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                    />
                ) : (
                    <div className='flex h-full items-center justify-center text-xs sm:text-sm uppercase tracking-[0.3em]'>
                        No image
                    </div>
                )}
            </div>
            <div className='flex flex-1 flex-col gap-3 sm:gap-4 p-4 sm:p-6'>
                <h3 className='text-lg sm:text-xl md:text-2xl font-black uppercase leading-tight line-clamp-3'>
                    {post.title ?? "Untitled"}
                </h3>
                {post.excerpt && (
                    <div
                        className='text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3'
                        dangerouslySetInnerHTML={{
                            __html: post.excerpt,
                        }}
                    />
                )}
                <span className='mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] group-hover:gap-3 transition-all'>
                    Read More
                    <span className='group-hover:translate-x-1 transition-transform'>
                        →
                    </span>
                </span>
            </div>
        </Link>
    );
}
