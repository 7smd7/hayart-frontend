/**
 * Post Types
 * Centralized type definitions for WordPress posts
 */

export interface FeaturedImage {
    node?: {
        sourceUrl?: string | null;
    } | null;
}

export interface Post {
    title: string | null;
    slug: string;
    excerpt?: string | null;
    featuredImage?: FeaturedImage;
}

export interface PostDetail extends Post {
    content: string;
    date: string;
}
