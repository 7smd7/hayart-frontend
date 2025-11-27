/**
 * EventHeader Molecule
 * Event hero section with featured image and title
 */

import Image from "next/image";

interface EventHeaderProps {
    title: string;
    imageUrl?: string;
}

export function EventHeader({ title, imageUrl }: EventHeaderProps) {
    return (
        <header>
            {imageUrl ? (
                <div className='relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] bg-black overflow-hidden'>
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className='object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700'
                        priority
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />
                    <div className='absolute bottom-0 left-0 right-0 p-8 md:p-12'>
                        <div className='max-w-7xl mx-auto'>
                            <h1 className='text-4xl md:text-6xl lg:text-8xl font-black uppercase leading-[0.85] text-white'>
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='pt-12 px-6 max-w-7xl mx-auto'>
                    <h1 className='text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.85] mb-8'>
                        {title}
                    </h1>
                </div>
            )}
        </header>
    );
}
