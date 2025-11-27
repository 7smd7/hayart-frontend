/**
 * Dynamic Page Route
 * Catch-all route for WordPress pages
 */

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/services";
import { generateDescription } from "@/utils";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        return {
            title: "Page Not Found",
        };
    }

    const description = generateDescription(
        undefined,
        page.content,
        "Discover more at HayArt Cultural Centre"
    );

    const images = page.featuredImage?.node?.sourceUrl
        ? [
              {
                  url: page.featuredImage.node.sourceUrl,
                  width: 1920,
                  height: 1080,
                  alt: page.title ?? "Page image",
              },
          ]
        : [
              {
                  url: "/logo.svg",
                  width: 1032,
                  height: 320,
                  alt: "HayArt Cultural Centre",
              },
          ];

    return {
        title: page.title ?? "Untitled Page",
        description,
        openGraph: {
            title: page.title ?? "Untitled Page",
            description,
            type: "website",
            images,
        },
        twitter: {
            card: "summary_large_image",
            title: page.title ?? "Untitled Page",
            description,
            images: [images[0].url],
        },
    };
}

export default async function DynamicPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <article className='mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12'>
            {/* Featured Image */}
            {page.featuredImage?.node?.sourceUrl && (
                <div className='relative w-full h-[400px] sm:h-[500px] mb-8 border-4 border-black'>
                    <Image
                        src={page.featuredImage.node.sourceUrl}
                        alt={page.title ?? "Page image"}
                        fill
                        className='object-cover'
                        priority
                    />
                </div>
            )}

            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-none mb-8'>
                {page.title}
            </h1>
            <div
                className='wp-content'
                dangerouslySetInnerHTML={{ __html: page.content }}
            />
        </article>
    );
}
