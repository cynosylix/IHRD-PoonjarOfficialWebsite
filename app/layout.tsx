import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "College of Engineering Poonjar",
    template: "%s | College of Engineering Poonjar",
  },
  description:
    "Official website of College of Engineering Poonjar — academics, admissions, placements, and campus life.",
  openGraph: {
    title: "College of Engineering Poonjar",
    description:
      "IHRD engineering college — quality technical education in Kerala.",
    type: "website",
    images: [
      {
        url: "/images/collageOutDoor-2.webp",
        width: 1920,
        height: 495,
        alt: "College of Engineering Poonjar campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "College of Engineering Poonjar",
    description:
      "IHRD engineering college — quality technical education in Kerala.",
    images: ["/images/collageOutDoor-2.webp"],
  },
  icons: {
    icon: [{ url: "/images/logo.webp", type: "image/webp" }],
    apple: [{ url: "/images/logo.webp", type: "image/webp" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000080",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen min-w-0 font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
