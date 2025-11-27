/**
 * Post Service
 * Handles all post-related data fetching
 */

import { gql } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo-client";
import type { Post, PostDetail } from "@/types";

interface GetPostsResponse {
    posts: {
        nodes: Post[];
    };
}

interface GetPostBySlugResponse {
    post: PostDetail | null;
}

export const GET_POSTS_QUERY = gql`
    query GetPosts($first: Int = 3) {
        posts(first: $first) {
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
            }
        }
    }
`;

export const GET_POST_BY_SLUG_QUERY = gql`
    query GetPostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            title
            content
            date
            featuredImage {
                node {
                    sourceUrl
                }
            }
        }
    }
`;

export async function getPosts(first: number = 3): Promise<Post[]> {
    const client = createApolloClient();
    const { data } = await client.query<GetPostsResponse>({
        query: GET_POSTS_QUERY,
        variables: { first },
    });

    return data?.posts?.nodes ?? [];
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
    const client = createApolloClient();
    const { data } = await client.query<GetPostBySlugResponse>({
        query: GET_POST_BY_SLUG_QUERY,
        variables: { slug },
    });

    return data?.post ?? null;
}
