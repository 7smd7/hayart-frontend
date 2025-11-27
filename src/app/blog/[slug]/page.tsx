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

    const images = post.featuredImage?.node?.sourceUrl
        ? [
              {
                  url: post.featuredImage.node.sourceUrl,
                  width: 1920,
                  height: 1080,
                  alt: post.title ?? "Blog post image",
              },
          ]
        : undefined;

    return {
        title: post.title ?? "Untitled Post",
        description,
        openGraph: {
            title: post.title ?? "Untitled Post",
            description,
            type: "article",
            publishedTime: post.date,
            images,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title ?? "Untitled Post",
            description,
            images: images ? [images[0].url] : undefined,
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
