/**
 * Page Service
 * Handles WordPress page data fetching
 */

import { gql } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo-client";
import type { Page } from "@/types";

interface GetPageBySlugResponse {
    page: Page | null;
}

export const GET_PAGE_BY_SLUG_QUERY = gql`
    query GetPageBySlug($slug: ID!) {
        page(id: $slug, idType: URI) {
            title
            slug
            content
            featuredImage {
                node {
                    sourceUrl
                }
            }
        }
    }
`;

export async function getPageBySlug(slug: string): Promise<Page | null> {
    const client = createApolloClient();
    const { data } = await client.query<GetPageBySlugResponse>({
        query: GET_PAGE_BY_SLUG_QUERY,
        variables: { slug },
    });

    return data?.page ?? null;
}
