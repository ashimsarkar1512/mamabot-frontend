import Banner from "@/components/landing/home/Banner";
import { HeroSection } from "@/components/landing/home/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mamabot",
  description:
    "Welcome to our Next.js 16 template with TypeScript and Tailwind CSS",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
