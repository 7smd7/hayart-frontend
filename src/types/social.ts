/**
 * Social Links Type
 * Type definitions for social media links
 */

export interface SocialLink {
    title: string;
    socialDetails: {
        socialUrl: string;
        order?: number | null;
    };
}
