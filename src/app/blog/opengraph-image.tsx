import { ImageResponse } from "next/og";
import { OgImageCenteredLayout } from "@/components/og";

export const alt = "News - HayArt Cultural Centre";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <OgImageCenteredLayout
                badge='NEWS'
                title='Latest News'
                subtitle='Stay updated with the latest from HayArt Cultural Centre'
            />
        ),
        { ...size }
    );
}
