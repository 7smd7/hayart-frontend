/**
 * PostContent Organism
 * Blog post article content with title, date, and prose
 */

interface PostContentProps {
    title: string;
    date: string;
    formattedDate: string;
    content: string;
}

export function PostContent({
    title,
    date,
    formattedDate,
    content,
}: PostContentProps) {
    return (
        <article className='mx-auto max-w-4xl px-8 py-16'>
            <h1 className='text-6xl font-black uppercase mb-4 leading-tight border-b-4 border-black pb-6'>
                {title}
            </h1>

            <time
                dateTime={date}
                className='block text-sm font-bold uppercase tracking-widest mb-12'
            >
                {formattedDate}
            </time>

            <div
                className='prose prose-lg max-w-none font-serif leading-relaxed prose-headings:font-black prose-headings:uppercase prose-a:underline'
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </article>
    );
}
