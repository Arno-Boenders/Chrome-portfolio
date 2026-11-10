import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeScript } from "@context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Phone status bar / browser chrome colour = the tab strip at the top of the page.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f3f4" },
    { media: "(prefers-color-scheme: dark)", color: "#303134" },
  ],
};

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the real domain when deploying, so share links get absolute image URLs.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/^/, 'https://') ?? 'http://localhost:3000'),
  openGraph: {
    type: "profile",
    siteName: "Arno Boenders",
    title: "Arno Boenders - Fullstack Developer",
    description: "Fullstack developer from Ghent, Belgium. React, Next.js, TypeScript, Node.js and PHP.",
    firstName: "Arno",
    lastName: "Boenders",
  },
  twitter: { card: "summary_large_image" },
  title: {
    default: "Arno Boenders - Fullstack Developer",
    template: "%s - Arno Boenders",
  },
  description:
    "Portfolio of Arno Boenders, a fullstack developer from Ghent, Belgium working with React, TypeScript, Next.js, Node.js and PHP.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-page focus:px-4 focus:py-3 focus:text-ink focus:shadow-md">
          Skip to results
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
