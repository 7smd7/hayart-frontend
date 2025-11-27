/**
 * SocialLink Atom
 * Brutalist social media link with icon
 */

import { getSocialIcon } from "@/utils";

interface SocialLinkProps {
    title: string;
    url: string;
}

export function SocialLink({ title, url }: SocialLinkProps) {
    const Icon = getSocialIcon(title);

    return (
        <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-center gap-2 border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors'
            aria-label={title}
        >
            <Icon className='w-5 h-5' aria-hidden='true' />
            <span className='text-xs font-bold uppercase tracking-wider'>
                {title}
            </span>
        </a>
    );
}
