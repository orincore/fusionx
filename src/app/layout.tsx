import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FusionX  Immersive Neon Events by GlitzFusion",
  description:
    "FusionX by GlitzFusion is a high-performance events IP that blends neon visuals, immersive sound, and interactive experiences across festivals, launches, and campus tours.",
  metadataBase: new URL("https://fusionx.glitzfusion.in"),
  icons: {
    // Use the FusionX black logo as the tab/icon image
    icon: "/logo-black.png",
    shortcut: "/logo-black.png",
    apple: "/logo-black.png",
  },
  openGraph: {
    title: "FusionX  Immersive Neon Events by GlitzFusion",
    description:
      "Discover upcoming FusionX experiences  neon nights, immersive theatre, campus IPs, and premium brand launches.",
    url: "https://fusionx.glitzfusion.in",
    siteName: "FusionX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="relative min-h-screen flex flex-col">
          {/* Fixed header at the top */}
          <Header />
          {/* Add top padding so content clears the fixed header on all pages */}
          <main className="flex-1 flex flex-col pt-24 md:pt-28 lg:pt-28">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
