/**
 * Settings Service
 * Handles WordPress site settings and configuration data
 */

import { gql } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo-client";
import { decodeHtmlEntities } from "@/utils";

interface GeneralSettings {
    title: string;
    description: string;
    url: string;
}

interface GetSettingsResponse {
    generalSettings: GeneralSettings;
}

export const GET_SETTINGS_QUERY = gql`
    query GetSettings {
        generalSettings {
            title
            description
            url
        }
    }
`;

export async function getSettings(): Promise<GeneralSettings> {
    const client = createApolloClient();
    const { data } = await client.query<GetSettingsResponse>({
        query: GET_SETTINGS_QUERY,
    });

    const settings = data?.generalSettings ?? {
        title: "HayArt Cultural Centre",
        description: "Contemporary art and cultural events in Armenia",
        url: "https://hayart.am",
    };

    return {
        title: decodeHtmlEntities(settings.title),
        description: decodeHtmlEntities(settings.description),
        url: settings.url,
    };
}
