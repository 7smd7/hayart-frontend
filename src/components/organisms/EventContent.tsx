/**
 * EventContent Organism
 * Event article content with type and prose
 */

interface EventContentProps {
    content: string;
    eventTypes?: string[];
}

export function EventContent({ content, eventTypes }: EventContentProps) {
    return (
        <main className='max-w-4xl mx-auto px-6 py-16'>
            {eventTypes && eventTypes.length > 0 && (
                <div className='text-xs font-bold tracking-widest uppercase mb-6 sm:hidden'>
                    {eventTypes.join(" • ")}
                </div>
            )}

            <article
                className='prose prose-lg md:prose-xl max-w-none 
                    prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b-2 prose-h2:border-black prose-h2:pb-2
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:leading-relaxed
                    prose-a:font-bold prose-a:underline prose-a:underline-offset-4 hover:prose-a:no-underline
                    prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6 prose-blockquote:italic'
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </main>
    );
}
