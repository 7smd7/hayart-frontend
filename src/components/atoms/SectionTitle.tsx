/**
 * SectionTitle Atom
 * Brutalist section heading component with optional action link
 */

import Link from "next/link";

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
    actionLabel?: string;
    actionHref?: string;
}

export function SectionTitle({
    children,
    className = "",
    actionLabel,
    actionHref,
}: SectionTitleProps) {
    return (
        <div className={`flex items-baseline justify-between ${className}`}>
            <h2 className='text-4xl sm:text-5xl md:text-6xl font-black uppercase'>
                {children}
            </h2>
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className='text-xs sm:text-sm font-mono uppercase tracking-widest hover:underline hidden sm:block'
                >
                    {actionLabel} →
                </Link>
            )}
        </div>
    );
}
