// app/page.tsx
"use client"; // Mark as client component for interactivity

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "../components/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Manage Your AI Prompts <span className="text-primary">Effortlessly</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">Store, organize, and access your favorite AI prompts in one place. Boost your productivity with quick access to your best prompts.</p>

            <Button
              asChild
              size="lg"
            >
              <Link
                href="/prompts"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Get Started
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
