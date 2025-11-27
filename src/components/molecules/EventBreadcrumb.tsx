/**
 * EventBreadcrumb Molecule
 * Navigation breadcrumb for event pages
 */

import Link from "next/link";

interface EventBreadcrumbProps {
    eventTypes?: string[];
}

export function EventBreadcrumb({ eventTypes }: EventBreadcrumbProps) {
    return (
        <div className='border-b border-black'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between'>
                <Link
                    href='/'
                    className='text-xs font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-2 group'
                >
                    <span className='group-hover:-translate-x-1 transition-transform'>
                        ←
                    </span>
                    BACK TO AGENDA
                </Link>
                {eventTypes && eventTypes.length > 0 && (
                    <span className='text-xs font-mono uppercase tracking-widest hidden sm:block'>
                        {eventTypes.join(" • ")}
                    </span>
                )}
            </div>
        </div>
    );
}
