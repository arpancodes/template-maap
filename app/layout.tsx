import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import { Instagram } from "lucide-react";
import BuyMeACoffee from "@/components/BuyMeACoffee";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEMPLATE",
  description: "TEMPLATE",
  openGraph: {
    title: "TEMPLATE",
    images: "/ss.png",
    description: "TEMPLATE",
    url: "https://TEMPLATE.arpancodes.io/",
    siteName: "TEMPLATE",
  },
  keywords: [],
  twitter: {
    card: "summary_large_image",
    site: "@arpancodes",
    title: "TEMPLATE",
    description: "TEMPLATE",
    images: "/ss.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex justify-between p-3">
            <a
              target="_blank"
              href="https://instagram.com/arpancodes"
              className="flex align-middle items-center justify-center gap-2 text-sm"
            >
              <Instagram />
              @arpancodes
            </a>
            <div className="flex gap-2 items-center">
              <BuyMeACoffee />
              <ModeToggle />
            </div>
          </div>
          <main className="px-3">{children}</main>
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.GA_ID || ""} />
      </body>
    </html>
  );
}
