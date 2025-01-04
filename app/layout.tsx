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
  title: "Time Logger | Your Personal Productivity Tracker",
  description:
    "Time Logger helps you track your daily activities in real time. Reflect on your day, uncover patterns, and improve your habits. Private, secure, and free to use.",
  openGraph: {
    title: "Time Logger | Your Personal Productivity Tracker",
    images: "/ss.png",
    description:
      'Time Logger is your "to-did" app for tracking daily activities. Log what you do, reflect on your journey, and grow. No signups, no downloads—just your real-time journal for better time management.',
    url: "https://timelogger.arpancodes.io/",
    siteName: "Time Logger",
  },
  keywords: [
    "Time Logger",
    "productivity tracker",
    "real-time journal",
    "activity tracker",
    "habit tracker",
    "personal improvement",
    "self-improvement tool",
    "daily activity log",
    "time management app",
    "no signup app",
    "secure journal",
    "free productivity app",
    "PWA time tracker",
  ],
  twitter: {
    card: "summary_large_image",
    site: "@arpancodes",
    title: "Time Logger | Your Personal Productivity Tracker",
    description:
      "Log your achievements, reflect with AI-powered insights, and improve your habits. Time Logger is free, secure, and completely private. Start owning your day today!",
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
