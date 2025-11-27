/**
 * Social Icon Utility
 * Maps social media titles to their React Icons
 */

import { IconType } from "react-icons";
import {
    FaLinkedin,
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaTiktok,
    FaGithub,
    FaReddit,
    FaPinterest,
    FaSnapchat,
    FaTelegram,
    FaWhatsapp,
    FaDiscord,
    FaTwitch,
    FaMedium,
    FaBehance,
    FaDribbble,
    FaVimeo,
    FaSpotify,
    FaSoundcloud,
    FaPatreon,
    FaLink,
} from "react-icons/fa";
import { FaXTwitter, FaThreads, FaBluesky } from "react-icons/fa6";

export type SocialIconType =
    | "linkedin"
    | "facebook"
    | "instagram"
    | "twitter"
    | "x"
    | "youtube"
    | "tiktok"
    | "github"
    | "reddit"
    | "pinterest"
    | "snapchat"
    | "telegram"
    | "whatsapp"
    | "discord"
    | "twitch"
    | "medium"
    | "behance"
    | "dribbble"
    | "vimeo"
    | "spotify"
    | "soundcloud"
    | "patreon"
    | "threads"
    | "bluesky"
    | "default";

/**
 * Detects social media type from title
 * Case-insensitive matching
 */
export function detectSocialType(title: string): SocialIconType {
    const normalized = title.toLowerCase().trim();

    if (normalized.includes("linkedin")) return "linkedin";
    if (normalized.includes("facebook")) return "facebook";
    if (normalized.includes("instagram")) return "instagram";
    if (normalized.includes("twitter")) return "twitter";
    if (normalized === "x" || normalized.includes("x.com")) return "x";
    if (normalized.includes("youtube")) return "youtube";
    if (normalized.includes("tiktok")) return "tiktok";
    if (normalized.includes("github")) return "github";
    if (normalized.includes("reddit")) return "reddit";
    if (normalized.includes("pinterest")) return "pinterest";
    if (normalized.includes("snapchat")) return "snapchat";
    if (normalized.includes("telegram")) return "telegram";
    if (normalized.includes("whatsapp")) return "whatsapp";
    if (normalized.includes("discord")) return "discord";
    if (normalized.includes("twitch")) return "twitch";
    if (normalized.includes("medium")) return "medium";
    if (normalized.includes("behance")) return "behance";
    if (normalized.includes("dribbble")) return "dribbble";
    if (normalized.includes("vimeo")) return "vimeo";
    if (normalized.includes("spotify")) return "spotify";
    if (normalized.includes("soundcloud")) return "soundcloud";
    if (normalized.includes("patreon")) return "patreon";
    if (normalized.includes("threads")) return "threads";
    if (normalized.includes("bluesky")) return "bluesky";

    return "default";
}

/**
 * Social media icon components from React Icons
 */
export const SOCIAL_ICONS: Record<SocialIconType, IconType> = {
    linkedin: FaLinkedin,
    facebook: FaFacebook,
    instagram: FaInstagram,
    twitter: FaTwitter,
    x: FaXTwitter,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    github: FaGithub,
    reddit: FaReddit,
    pinterest: FaPinterest,
    snapchat: FaSnapchat,
    telegram: FaTelegram,
    whatsapp: FaWhatsapp,
    discord: FaDiscord,
    twitch: FaTwitch,
    medium: FaMedium,
    behance: FaBehance,
    dribbble: FaDribbble,
    vimeo: FaVimeo,
    spotify: FaSpotify,
    soundcloud: FaSoundcloud,
    patreon: FaPatreon,
    threads: FaThreads,
    bluesky: FaBluesky,
    default: FaLink,
};

/**
 * Gets the icon component for a social media platform
 */
export function getSocialIcon(title: string): IconType {
    const type = detectSocialType(title);
    return SOCIAL_ICONS[type];
}
