/**
 * PostHeader Molecule
 * Blog post header with featured image
 */

import Image from "next/image";

interface PostHeaderProps {
    title: string;
    imageUrl?: string;
}

export function PostHeader({ title, imageUrl }: PostHeaderProps) {
    return (
        <>
            {imageUrl && (
                <div className='w-full h-[60vh] bg-zinc-100 overflow-hidden border-b-8 border-black'>
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={1920}
                        height={1080}
                        className='w-full h-full object-cover grayscale'
                        priority
                    />
                </div>
            )}
        </>
    );
}
