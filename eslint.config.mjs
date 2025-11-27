import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
    // Disable style linting for OG image files (inline styles are required)
    {
        files: [
            "**/opengraph-image.tsx",
            "**/twitter-image.tsx",
            "**/components/og/**/*.tsx",
        ],
        rules: {
            "@next/next/no-img-element": "off",
            "react/no-unknown-property": "off",
        },
    },
]);

export default eslintConfig;
