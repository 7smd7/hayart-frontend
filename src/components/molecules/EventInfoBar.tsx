/**
 * EventInfoBar Molecule
 * Quick info bar with date, time, location, price
 */

interface EventInfoBarProps {
    dateRange?: string;
    timeRange?: string;
    location?: string;
    priceInfo?: string;
}

export function EventInfoBar({
    dateRange,
    timeRange,
    location,
    priceInfo,
}: EventInfoBarProps) {
    // Combine date and time if both exist, or just show dateRange if timeRange is empty
    const showCombinedDateTime = dateRange && !timeRange;

    return (
        <div className='border-y-4 border-black bg-black text-white'>
            <div className='max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-3 gap-6'>
                {showCombinedDateTime ? (
                    <div className='md:col-span-1'>
                        <div className='text-xs font-mono uppercase mb-1 opacity-60'>
                            DATE & TIME
                        </div>
                        <div className='text-lg font-bold uppercase'>
                            {dateRange}
                        </div>
                    </div>
                ) : (
                    <>
                        {dateRange && (
                            <div>
                                <div className='text-xs font-mono uppercase mb-1 opacity-60'>
                                    DATE
                                </div>
                                <div className='text-lg font-bold uppercase'>
                                    {dateRange}
                                </div>
                            </div>
                        )}
                        {timeRange && (
                            <div>
                                <div className='text-xs font-mono uppercase mb-1 opacity-60'>
                                    TIME
                                </div>
                                <div className='text-lg font-bold'>
                                    {timeRange}
                                </div>
                            </div>
                        )}
                    </>
                )}
                {location && (
                    <div>
                        <div className='text-xs font-mono uppercase mb-1 opacity-60'>
                            LOCATION
                        </div>
                        <div className='text-lg font-bold'>{location}</div>
                    </div>
                )}
                {priceInfo && (
                    <div>
                        <div className='text-xs font-mono uppercase mb-1 opacity-60'>
                            ENTRY
                        </div>
                        <div className='text-lg font-bold'>{priceInfo}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
