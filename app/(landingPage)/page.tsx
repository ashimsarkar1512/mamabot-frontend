import ChatSection from "@/components/landing/home/ChatSection";
import HeroSection from "@/components/landing/home/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mamabot",
  description: "Welcome to your AI companion of pregnancy & motherhood.",
};

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <ChatSection/>
    </main>
  );
}
