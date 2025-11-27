import { ImageResponse } from "next/og";
import { getPageBySlug } from "@/services";
import { stripHtmlTags, truncateText } from "@/utils";
import { OgImageLayout } from "@/components/og";

export const alt = "Page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        return new ImageResponse(<OgImageLayout title='Page Not Found' />, {
            ...size,
        });
    }

    const title = page.title ?? "Untitled Page";
    const subtitle = page.content
        ? truncateText(stripHtmlTags(page.content), 150)
        : undefined;

    return new ImageResponse(
        <OgImageLayout title={title} subtitle={subtitle} />,
        { ...size }
    );
}
