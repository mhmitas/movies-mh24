import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistNoto = Noto_Sans({
  variable: "--font-geist-noto",
  subsets: ["latin"],
})

const geistOswald = Oswald({
  variable: "--font-geist-oswald",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'Movies MH24 | Discover & Filter Movies by Genre, Year, Country',
  description: 'Movies MH24 is your ultimate movie app to browse, filter, and discover films by genre, release year, and country. Fast, simple, and beautiful.',
  keywords: ["Movies MH24", "movie app", "movie filter", "genre movies"],
  metadataBase: new URL("https://moviesmh24.vercel.app"), // your actual domain here
  openGraph: {
    title: "Movies MH24",
    description: "Browse movies by genre, type, year, and more.",
    siteName: "Movies MH24",
    type: "website",
    url: "https://moviesmh24.vercel.app", // your real URL
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistNoto.variable} ${geistOswald.variable} antialiased dark`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
