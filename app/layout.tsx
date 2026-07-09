import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "College of Engineering Poonjar, a Unit of IHRD, Government of Kerala",
    template: "%s | College of Engineering Poonjar, a Unit of IHRD, Government of Kerala",
  },
  description:
    "Official website of College of Engineering Poonjar, a Unit of IHRD, Government of Kerala — academics, admissions, placements, and campus life.",
  openGraph: {
    title: "College of Engineering Poonjar, a Unit of IHRD, Government of Kerala",
    description:
      "College of Engineering Poonjar, a Unit of IHRD, Government of Kerala — quality technical education in Kerala.",
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
    title: "College of Engineering Poonjar, a Unit of IHRD, Government of Kerala",
    description:
      "College of Engineering Poonjar, a Unit of IHRD, Government of Kerala — quality technical education in Kerala.",
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
  themeColor: "#0f0c29",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} min-h-screen min-w-0 font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
