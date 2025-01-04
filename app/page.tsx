"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="mb-10">
        <div className="font-black text-center h-[50vh] flex flex-col justify-center items-center gap-1">
          <h1 className="text-xl">Take control of your MEME APPs with</h1>
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-900 inline-block text-transparent bg-clip-text w-fit text-5xl md:text-7xl">
            TEMPLATE
          </h1>
          <p className="font-thin opacity-50 text-sm ">
            No signing in required!
          </p>
          <Button className="mt-4" asChild>
            <Link href="">CTA</Link>
          </Button>
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
