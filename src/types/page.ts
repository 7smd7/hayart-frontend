/**
 * Page Types
 * Centralized type definitions for WordPress pages
 */

import type { FeaturedImage } from "./post";

export interface Page {
    title: string | null;
    slug: string;
    content: string;
    featuredImage?: FeaturedImage;
}
