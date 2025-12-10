import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/organisms/Header";
import { ThemeProvider } from "../components/molecules/ThemeProvider";
import Footer from "../components/organisms/Footer";
import { Toaster } from "sonner";
import { SanityLive } from "@/sanity/live";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: "variable"
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400"]
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ]
}
export const metadata: Metadata = {
  title: "Jack Cox Portfolio",
  description: "Jack is a creative developer at New Genre, presenting a Next.js portfolio that highlights clean design, modern performance, and thoughtful digital craftsmanship across every project.",
  keywords: ['Full stack developer', 'React', 'Next.js'],
  creator: 'Jack Cox',
  themeColor: "#fff",
  openGraph: {
    title: "Jack Cox Portfolio",
    description: "Jack is a creative developer at New Genre, presenting a Next.js portfolio that highlights clean design, modern performance, and thoughtful digital craftsmanship across every project.",
    siteName: 'Jack Cox Developer Portfolio',
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jack Cox Portfolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased bg-orange-600`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main>
            {children}
            <Toaster position="bottom-right" richColors />
          </main>
          <Footer />
        </ThemeProvider>
        <SanityLive />
      </body>
    </html>
  );
}
