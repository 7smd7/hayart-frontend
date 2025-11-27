/**
 * Events Section Layout
 * Adds breadcrumb navigation to events archive and detail pages
 */

import Link from "next/link";

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className='border-b border-black'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3'>
                    <Link
                        href='/'
                        className='text-xs font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-2 group'
                    >
                        <span className='group-hover:-translate-x-1 transition-transform'>
                            ←
                        </span>
                        BACK TO HOME
                    </Link>
                </div>
            </div>
            {children}
        </>
    );
}
