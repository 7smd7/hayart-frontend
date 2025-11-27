import type { NextConfig } from "next";
import path from "path";

const backendUrl =
    process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    "http://hayart-backend.local/graphql";
const backendHostname = new URL(backendUrl).hostname;
const backendProtocol = new URL(backendUrl).protocol.replace(":", "") as
    | "http"
    | "https";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: backendProtocol,
                hostname: backendHostname,
                pathname: "/wp-content/uploads/**",
            },
        ],
        dangerouslyAllowSVG: true,
        unoptimized: process.env.NODE_ENV === "development",
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "src"),
        };
        return config;
    },
    turbopack: {
        resolveAlias: {
            "@": "./src",
        },
    },
};

export default nextConfig;
