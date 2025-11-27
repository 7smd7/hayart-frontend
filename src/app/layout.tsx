import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { getSocialLinks, getSettings } from "@/services";
import { SocialLink, Logo } from "@/components";
import "@/styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSettings();

    return {
        metadataBase: new URL(settings.url || "https://hayart.am"),
        title: {
            default: settings.title,
            template: `%s | ${settings.title}`,
        },
        description: settings.description,
        keywords: [
            "contemporary art",
            "Armenia",
            "cultural events",
            "art center",
            "exhibitions",
            "printmaking",
            "photography",
        ],
        authors: [{ name: settings.title }],
        creator: settings.title,
        publisher: settings.title,
        icons: {
            icon: "/favicon.svg",
            shortcut: "/favicon.svg",
            apple: "/favicon.svg",
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: settings.url,
            siteName: settings.title,
            title: settings.title,
            description: settings.description,
        },
        twitter: {
            card: "summary_large_image",
            title: settings.title,
            description: settings.description,
        },
        // Additional metadata for better WhatsApp/Telegram/social media previews
        other: {
            "og:image:width": "1200",
            "og:image:height": "630",
            "og:image:type": "image/png",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const socialLinks = await getSocialLinks();

    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
            >
                {/* Header */}
                <header className='sticky top-0 z-50 bg-white border-b-4 border-black'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between'>
                        <Logo size='sm' />
                        <nav className='flex items-center gap-4 sm:gap-6 text-xs font-bold uppercase tracking-widest'>
                            <Link href='/' className='hover:underline'>
                                HOME
                            </Link>
                            <Link
                                href='/about-us'
                                className='hover:underline hidden lg:block'
                            >
                                ABOUT
                            </Link>
                            <Link
                                href='/blog'
                                className='hover:underline hidden sm:block'
                            >
                                NEWS
                            </Link>
                            <Link
                                href='/event'
                                className='hover:underline hidden sm:block'
                            >
                                EVENTS
                            </Link>
                            <Link
                                href='/visit'
                                className='hover:underline hidden lg:block'
                            >
                                VISIT
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className='min-h-screen bg-white'>{children}</main>

                {/* Footer */}
                <footer className='border-t-4 border-black bg-white'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12'>
                        <div className='flex flex-col gap-8'>
                            {/* Top Row: Branding and Social Links */}
                            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6'>
                                <Logo size='md' showSubtitle />

                                {/* Social Links */}
                                {socialLinks.length > 0 && (
                                    <div>
                                        <p className='text-xs font-mono uppercase tracking-widest mb-3'>
                                            Follow Us
                                        </p>
                                        <div className='flex flex-wrap gap-3'>
                                            {socialLinks.map((social) => (
                                                <SocialLink
                                                    key={social.title}
                                                    title={social.title}
                                                    url={
                                                        social.socialDetails
                                                            .socialUrl
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Row: Footer Links & Copyright */}
                            <div className='border-t border-black pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                                <nav className='flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest'>
                                    <Link
                                        href='/about-us'
                                        className='hover:underline'
                                    >
                                        About Us
                                    </Link>
                                    <Link
                                        href='/history'
                                        className='hover:underline'
                                    >
                                        History
                                    </Link>
                                    <Link
                                        href='/visit'
                                        className='hover:underline'
                                    >
                                        Visit
                                    </Link>
                                    <Link
                                        href='/contact'
                                        className='hover:underline'
                                    >
                                        Contact
                                    </Link>
                                </nav>
                                <p className='text-xs font-mono uppercase tracking-widest'>
                                    © {new Date().getFullYear()} All rights
                                    reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
