/**
 * MonthTitle Atom
 * Calendar month heading component
 */

interface MonthTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function MonthTitle({ children, className = "" }: MonthTitleProps) {
    return (
        <h3
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none pt-8 sm:pt-12 pb-4 sm:pb-6 first:pt-0 ${className}`}
        >
            {children}
        </h3>
    );
}
