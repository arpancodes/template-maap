"use client";
import HowItWorks from "@/components/landing/howItWorks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Quote = { quote: string; author: string };
const quotes: Quote[] = [
  {
    quote:
      "Until you value yourself, you will not value your time. Until you value your time, you will not do anything with it.",
    author: "M. Scott Peck",
  },
  {
    quote: "I must govern the clock, not be governed by it.",
    author: "Golda Meir",
  },
  {
    quote:
      "Your greatest asset is your earning ability. Your greatest resource is your time.",
    author: "Brian Tracy",
  },
  {
    quote:
      "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
    author: "Abraham Lincoln",
  },
  {
    quote: "You can only manage time if you track it right.",
    author: "Anonymous",
  },
  {
    quote: "We must use time as a tool, not as a couch.",
    author: "John F. Kennedy",
  },
  {
    quote: "Time you enjoy wasting is not wasted time.",
    author: "Marthe Troly-Curtin",
  },
];

const howItWorksSteps = [
  {
    step: "✅ Log",
    desc: "Every time you complete an activity, record it in Time Logger. Whether it’s a big milestone or a small task, celebrate the things you did.",
    highlights: ["Quick and easy to log activities.", "Works in real-time."],
  },
  {
    step: "🤔 Reflect",
    desc: "Step back and review your day with the help of AI.",
    highlights: [
      "Get personalized daily summaries.",
      "Spot patterns and highlights.",
      "Discover areas for improvement.",
    ],
  },
  {
    step: "💡 Improve",
    desc: "Turn insights into action.",
    highlights: [
      "Build better habits with daily or weekly retrospection.",
      "Set goals based on your real-life activity trends.",
    ],
  },
];

export default function Home() {
  const [quote, setQuote] = useState<Quote>(
    quotes[Math.floor(Math.random() * quotes.length)],
  );
  const [fade, setFade] = useState(true); // Transition state

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setFade(true); // Start fade-in
      }, 500); // Match with animation duration
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <section className="mb-10">
        <div className="font-black text-center h-[50vh] flex flex-col justify-center items-center gap-1">
          <h1 className="text-xl">Take control of your time with</h1>
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-900 inline-block text-transparent bg-clip-text w-fit text-5xl md:text-7xl">
            TIME LOGGER
          </h1>
          <p className="font-thin opacity-50 text-sm ">
            No signing in required!
          </p>
          <Button className="mt-4" asChild>
            <Link href="/log">
              <ScrollText /> Start Logging
            </Link>
          </Button>
        </div>
        <figure className="max-w-screen-md mx-auto text-center">
          <svg
            className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p
              className={`text-2xl italic font-medium text-gray-900 dark:text-white transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
                }`}
            >
              {quote.quote}
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
              <cite
                className={`pe-3 font-medium text-gray-900 dark:text-white transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"
                  }`}
              >
                - {quote.author}
              </cite>
            </div>
          </figcaption>
        </figure>
      </section>
      <Separator className="w-5/6 mx-auto" />
      <section className="w-5/6 mx-auto mt-10">
        <h2 className="font-black text-3xl text-center ">How it works</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            {howItWorksSteps.map((step, idx) => (
              <HowItWorks {...step} key={idx} />
            ))}
          </div>
          <Image
            src="/logs.png"
            height={1000}
            width={400}
            alt="Logs screenshot"
          />
        </div>
      </section>
      <Separator className="w-5/6 mx-auto" />
      <section className="w-5/6 mx-auto py-10 min-h-64 flex gap-10 flex-col items-center justify-start">
        <h2 className="font-black text-3xl text-center">
          Features you&apos;ll love
        </h2>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">📱 PWA Convenience:</span> Access Time
            Logger like an app—no downloads required.
          </li>
          <li>
            <span className="font-bold">🔒 Privacy First:</span> Your data is
            stored locally on your device for total security.
          </li>
          <li>
            <span className="font-bold">🛡️ No Signups, No Hassle: </span>Start
            using Time Logger immediately.
          </li>
        </ul>
      </section>
      <Separator className="w-5/6 mx-auto" />
      <section className="w-5/6 mx-auto py-10 min-h-64 flex gap-10 flex-col items-center justify-start">
        <h2 className="font-black text-3xl text-center">Who is it for?</h2>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">Productivity Seekers:</span> Want to
            measure your days by what you achieve? This is for you.
          </li>
          <li>
            <span className="font-bold">Habit Builders:</span> Reflect on trends
            and make intentional changes.
          </li>
          <li>
            <span className="font-bold">Time Managers: </span>Understand where
            your time goes, and take control.
          </li>
        </ul>
      </section>
      <Separator className="w-5/6 mx-auto" />
      <section className="w-5/6 mx-auto py-10 min-h-64 flex gap-10 flex-col items-center justify-start">
        <h2 className="font-black text-3xl text-center">
          Ready to Own Your Day?
        </h2>
        <div className="flex flex-col justify-center items-center gap-4">
          <p>
            Start logging what you do, reflecting on your day, and improving
            your life.
          </p>
          <p className="font-bold">Do → Reflect → Improve!</p>
          <div className="flex gap-2 items-center">
            <Button asChild>
              <Link href="/log">📌 Try Time Logger Now</Link>
            </Button>
            <span>– It’s free, private, and all yours.</span>
          </div>
          <p className="italic">
            Your days are worth tracking. Let’s make every one of them count.
          </p>
        </div>
      </section>
      <footer className="border-grid border-t py-6 ">
        <div className="container-wrapper">
          <div className="container py-4 mx-auto">
            <div className="text-balance text-center text-sm leading-loose text-muted-foreground">
              Built by{" "}
              <a
                href="https://instagram.com/arpancodes"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                @arpancodes
              </a>
              .
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
