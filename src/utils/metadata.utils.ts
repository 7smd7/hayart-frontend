/**
 * Metadata Utilities
 * Helper functions for generating metadata across the application
 */

/**
 * Decodes HTML entities (e.g., &quot; → ", &amp; → &)
 * Essential for WordPress content that may contain encoded characters
 */
export function decodeHtmlEntities(text: string): string {
    const entities: Record<string, string> = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#039;": "'",
        "&#39;": "'",
        "&apos;": "'",
        "&nbsp;": " ",
    };

    return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

/**
 * Strips HTML tags from a string and decodes HTML entities
 * Used for cleaning WordPress excerpts and content
 */
export function stripHtmlTags(html: string): string {
    const stripped = html.replace(/<[^>]*>/g, "").trim();
    return decodeHtmlEntities(stripped);
}

/**
 * Truncates text to a specific length with ellipsis
 * Useful for meta descriptions
 */
export function truncateText(text: string, maxLength: number = 160): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
}

/**
 * Generates a meta description from content
 * Strips HTML and truncates to optimal length for SEO
 */
export function generateDescription(
    excerpt?: string | null,
    content?: string,
    fallback: string = ""
): string {
    if (excerpt) {
        const cleaned = stripHtmlTags(excerpt);
        return truncateText(cleaned, 160);
    }

    if (content) {
        const cleaned = stripHtmlTags(content);
        return truncateText(cleaned, 160);
    }

    return fallback;
}

/**
 * Gets absolute URL for images and paths
 * Ensures URLs are properly formatted for OG images
 */
export function getAbsoluteUrl(
    path: string,
    baseUrl: string = "https://hayart.am"
): string {
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
