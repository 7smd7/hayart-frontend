import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/services";
import { stripHtmlTags, truncateText } from "@/utils";
import { OgImageLayout } from "@/components/og";

export const alt = "Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return new ImageResponse(
            <OgImageLayout badge='NEWS' title='Post Not Found' />,
            { ...size }
        );
    }

    const title = post.title ?? "Untitled Post";
    const subtitle = post.excerpt
        ? truncateText(stripHtmlTags(post.excerpt), 120)
        : undefined;
    const metadata = new Date(post.date).toLocaleDateString();

    return new ImageResponse(
        (
            <OgImageLayout
                badge='NEWS'
                title={title}
                subtitle={subtitle}
                metadata={metadata}
            />
        ),
        { ...size }
    );
}
