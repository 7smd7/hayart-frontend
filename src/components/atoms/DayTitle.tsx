/**
 * DayTitle Atom
 * Calendar day heading component
 */

interface DayTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function DayTitle({ children, className = "" }: DayTitleProps) {
    return (
        <h4
            className={`text-xl sm:text-2xl md:text-3xl font-bold uppercase leading-none mb-4 sm:mb-6 pl-2 sm:pl-4 ${className}`}
        >
            {children}
        </h4>
    );
}
