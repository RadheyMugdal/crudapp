import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "@/components/providers";
import "../index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Posts CRUD App",
    template: "%s | Posts CRUD App",
  },
  description: "A simple CRUD app built with Next.js 13, TypeScript, and Tailwind CSS",
  keywords: ["CRUD", "posts", "blog", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Developer" }],
  creator: "Developer",
  publisher: "Developer",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    siteName: "Posts CRUD App",
    title: "Posts CRUD App",
    description: "A simple CRUD app built with Next.js 13, TypeScript, and Tailwind CSS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posts CRUD App",
    description: "A simple CRUD app built with Next.js 13, TypeScript, and Tailwind CSS",
    creator: "@developer",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
