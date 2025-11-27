/**
 * Blog Post Page
 * Thin orchestration layer - delegates to services and components
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/services";
import { formatPostDate, generateDescription } from "@/utils";
import { PostHeader, PostContent } from "@/components";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    const description = generateDescription(
        post.excerpt,
        post.content,
        "Read this article on HayArt Cultural Centre"
    );

    return {
        title: post.title ?? "Untitled Post",
        description,
        openGraph: {
            type: "article",
            publishedTime: post.date,
        },
        other: {
            "og:image:width": "1200",
            "og:image:height": "630",
            "og:image:type": "image/png",
        },
    };
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = formatPostDate(post.date);

    return (
        <>
            <PostHeader
                title={post.title ?? "Untitled"}
                imageUrl={post.featuredImage?.node?.sourceUrl ?? undefined}
            />
            <PostContent
                title={post.title ?? "Untitled"}
                date={post.date}
                formattedDate={formattedDate}
                content={post.content}
            />
        </>
    );
}
