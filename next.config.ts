import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "hayart-backend.local",
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
