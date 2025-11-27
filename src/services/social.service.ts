/**
 * Social Links Service
 * Handles social media links data fetching
 */

import { gql } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo-client";
import type { SocialLink } from "@/types";

interface GetSocialLinksResponse {
    socialLinks: {
        nodes: SocialLink[];
    };
}

export const GET_SOCIAL_LINKS_QUERY = gql`
    query GetSocialLinks($first: Int = 10) {
        socialLinks(first: $first) {
            nodes {
                title
                socialDetails {
                    socialUrl
                    order
                }
            }
        }
    }
`;

export async function getSocialLinks(
    first: number = 10
): Promise<SocialLink[]> {
    const client = createApolloClient();
    const { data } = await client.query<GetSocialLinksResponse>({
        query: GET_SOCIAL_LINKS_QUERY,
        variables: { first },
    });

    const links = data?.socialLinks?.nodes ?? [];

    // Filter out links with null/undefined order and sort by order
    return links
        .filter((link) => {
            const order = link.socialDetails?.order;
            return order !== null && order !== undefined;
        })
        .sort((a, b) => {
            const orderA = a.socialDetails?.order ?? 0;
            const orderB = b.socialDetails?.order ?? 0;
            return orderA - orderB;
        });
}
