import { ImageResponse } from "next/og";
import { getSettings } from "@/services";
import { OgImageCenteredLayout } from "@/components/og";

export const alt = "HayArt Cultural Centre";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    const settings = await getSettings();

    return new ImageResponse(
        (
            <OgImageCenteredLayout
                title={settings.title}
                subtitle={settings.description}
            />
        ),
        { ...size }
    );
}
