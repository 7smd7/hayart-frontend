/**
 * EventFooter Organism
 * Event footer CTA section
 */

import Link from "next/link";

export function EventFooter() {
    return (
        <footer className='border-t-4 border-black'>
            <div className='max-w-4xl mx-auto px-6 py-12 text-center'>
                <p className='text-sm font-mono uppercase tracking-widest mb-4'>
                    Interested in this event?
                </p>
                <Link
                    href='/'
                    className='inline-block px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:underline transition-colors'
                >
                    VIEW ALL EVENTS
                </Link>
            </div>
        </footer>
    );
}
