/**
 * Reusable OG Image Template Component
 * Used across all opengraph-image.tsx files for consistency
 */

interface OgImageLayoutProps {
    badge?: string;
    title: string;
    subtitle?: string;
    metadata?: string;
    footer?: string;
}

export function OgImageLayout({
    badge,
    title,
    subtitle,
    metadata,
    footer = "HayArt Cultural Centre",
}: OgImageLayoutProps) {
    return (
        <div
            style={{
                background: "white",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "60px 80px",
                fontFamily: "sans-serif",
                justifyContent: badge || subtitle ? "flex-start" : "center",
            }}
        >
            {/* Badge */}
            {badge && (
                <div
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "white",
                        backgroundColor: "black",
                        padding: "8px 24px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: badge && !subtitle ? 60 : 0,
                    }}
                >
                    {badge}
                </div>
            )}

            {/* Title */}
            <div
                style={{
                    fontSize: title.length > 50 ? 64 : 72,
                    fontWeight: 900,
                    color: "black",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: badge ? 40 : 0,
                    marginBottom: subtitle || metadata ? 40 : 0,
                    textAlign: badge || subtitle ? "left" : "center",
                }}
            >
                {title}
            </div>

            {/* Subtitle/Description */}
            {subtitle && (
                <div
                    style={{
                        fontSize: 28,
                        color: "#666",
                        lineHeight: 1.4,
                        display: "flex",
                        marginTop: subtitle && !badge ? 40 : 0,
                    }}
                >
                    {subtitle}
                </div>
            )}

            {/* Metadata */}
            {metadata && (
                <div
                    style={{
                        fontSize: 24,
                        color: "#999",
                        marginTop: 30,
                        display: "flex",
                    }}
                >
                    {metadata}
                </div>
            )}

            {/* Footer */}
            <div
                style={{
                    fontSize: badge || subtitle ? 24 : 28,
                    color: "black",
                    marginTop: "auto",
                    display: "flex",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    borderTop: "4px solid black",
                    paddingTop: 30,
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <span>{footer}</span>
                {metadata && (
                    <span style={{ color: "#999", fontWeight: 400 }}>
                        {metadata}
                    </span>
                )}
            </div>
        </div>
    );
}

/**
 * Centered layout for simple pages (homepage, listing pages)
 */
export function OgImageCenteredLayout({
    badge,
    title,
    subtitle,
}: {
    badge?: string;
    title: string;
    subtitle?: string;
}) {
    return (
        <div
            style={{
                background: "white",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 80px",
                fontFamily: "sans-serif",
            }}
        >
            {badge && (
                <div
                    style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "white",
                        backgroundColor: "black",
                        padding: "8px 24px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 60,
                    }}
                >
                    {badge}
                </div>
            )}
            <div
                style={{
                    fontSize: 96,
                    fontWeight: 900,
                    color: "black",
                    textAlign: "center",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    marginBottom: subtitle ? 40 : 0,
                }}
            >
                {title}
            </div>
            {subtitle && (
                <div
                    style={{
                        fontSize: 36,
                        color: "#666",
                        textAlign: "center",
                        lineHeight: 1.4,
                    }}
                >
                    {subtitle}
                </div>
            )}
            <div
                style={{
                    fontSize: 28,
                    color: "black",
                    marginTop: 80,
                    fontWeight: 900,
                    textTransform: "uppercase",
                    borderTop: "4px solid black",
                    paddingTop: 30,
                }}
            >
                HayArt Cultural Centre
            </div>
        </div>
    );
}
