import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";

/**
 * Apollo client for Next.js App Router
 * - Server components / SSR: create a new instance per request (ssrMode: true)
 * - Client components: reuse a singleton
 *
 * Usage (Server component - App Router):
 *   import { createApolloClient } from '@/lib/apollo-client';
 *   const client = createApolloClient();
 *   const { data } = await client.query({ query: MY_QUERY });
 *
 * Usage (Client component or provider):
 *   import { ApolloProvider } from '@apollo/client';
 *   import { getApolloClient } from '@/lib/apollo-client';
 *   const client = getApolloClient(initialState);
 *
 * Example (server page):
 *   // app/page.tsx
 *   import { createApolloClient } from '@/lib/apollo-client';
 *   import { gql } from '@apollo/client';
 *
 *   export default async function Page() {
 *     const client = createApolloClient();
 *     const { data } = await client.query({ query: gql`query { hello }` });
 *     return <pre>{JSON.stringify(data)}</pre>;
 *   }
 *
 * Example (client provider):
 *   // app/providers/GlobalApolloProvider.tsx (client component)
 *   'use client';
 *   import { ApolloProvider } from '@apollo/client';
 *   import getApolloClient from '@/lib/apollo-client';
 *
 *   export default function GlobalApolloProvider({ children, initialState }) {
 *     const client = getApolloClient(initialState);
 *     return <ApolloProvider client={client}>{children}</ApolloProvider>;
 *   }
 *
 */

const GRAPHQL_URL =
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    "http://hayart-backend.local/graphql";

let apolloClient: ApolloClient | undefined;

export function createApolloClient(): ApolloClient {
    return new ApolloClient({
        // `ssrMode: true` enables certain SSR-only behaviors like
        // disabling forceFetch on the server and using `fetch` to make requests
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: GRAPHQL_URL,
            // If your backend uses cookies for auth, consider using 'include'
            credentials: "same-origin",
            fetch,
        }),
        cache: new InMemoryCache(),
    });
}

/**
 * Initialize or return an Apollo client instance.
 * For SSR (server components or API handlers) - call createApolloClient()
 * to get a new instance (fresh cache) per request.
 * For browsers, this will reuse a single client instance and optionally
 * hydrate the initial state into the cache.
 */
export function getApolloClient(initialState?: NormalizedCacheObject) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has pre-fetched initial state, hydrate it into the cache
    if (initialState) {
        const existingCache = _apolloClient.extract();
        // Merge existing cache into the incoming state (Object.assign to avoid TS spread type complaint)
        _apolloClient.cache.restore(
            Object.assign(
                {},
                existingCache as NormalizedCacheObject,
                initialState as NormalizedCacheObject
            )
        );
    }

    // For server-side rendering always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;

    // On the client, create singleton
    if (!apolloClient) apolloClient = _apolloClient;
    return apolloClient;
}

/**
 * Factory for server usage when you explicitly want a fresh client per request.
 * Example:
 *   const client = createApolloClient();
 */
// export a helper for clarity in usage
export function createApolloClientForSSR() {
    return createApolloClient();
}

export default getApolloClient;
