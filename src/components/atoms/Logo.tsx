/**
 * Logo Atom
 * HayArt brand logo with text - flexible for header/footer use
 */

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    showSubtitle?: boolean;
}

const sizeClasses = {
    sm: {
        container: "gap-2",
        logo: "h-6 w-auto",
        text: "text-xl sm:text-2xl",
        subtitle: "text-[10px]",
    },
    md: {
        container: "gap-2",
        logo: "h-7 sm:h-8 w-auto",
        text: "text-2xl sm:text-3xl",
        subtitle: "text-xs",
    },
    lg: {
        container: "gap-3",
        logo: "h-10 w-auto",
        text: "text-3xl sm:text-4xl",
        subtitle: "text-xs",
    },
};

export function Logo({ size = "sm", showSubtitle = false }: LogoProps) {
    const classes = sizeClasses[size];

    return (
        <div>
            <Link
                href='/'
                className={`inline-flex items-center ${classes.container} hover:opacity-80 transition-opacity`}
            >
                <Image
                    src='/logo.svg'
                    alt='HayArt Logo'
                    width={1032}
                    height={320}
                    className={classes.logo}
                />
                <span
                    className={`${classes.text} font-black uppercase tracking-tight`}
                >
                    HAYART
                </span>
            </Link>
            {showSubtitle && (
                <p
                    className={`${classes.subtitle} font-mono uppercase tracking-widest mt-1`}
                >
                    Cultural Centre
                </p>
            )}
        </div>
    );
}
