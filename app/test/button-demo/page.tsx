"use client";

import { Button } from "@/components/ui/Button";
import { Heart, Star, ArrowRight, Download, Menu } from "lucide-react";
import Link from "next/link";

export default function ButtonDemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Button Component Demo</h1>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Basic Buttons with Icons
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button text="Like" icon={<Heart size={18} />} variant="primary" />
            <Button text="Star" icon={<Star size={18} />} variant="secondary" />
            <Button
              text="Download"
              icon={<Download size={18} />}
              variant="outline"
            />
            <Button text="Menu" icon={<Menu size={18} />} variant="ghost" />
            <Button
              text="Get Started"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              variant="common"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">
            Buttons with Icons on Right
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              text="Next"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              variant="primary"
            />
            <Button
              text="Submit"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              variant="secondary"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              text="Small"
              icon={<Heart size={16} />}
              size="sm"
              variant="primary"
            />
            <Button
              text="Medium"
              icon={<Heart size={18} />}
              size="md"
              variant="primary"
            />
            <Button
              text="Large"
              icon={<Heart size={20} />}
              size="lg"
              variant="primary"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Link Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              text="Home"
              href="/"
              icon={<Heart size={18} />}
              variant="primary"
            />
            <Button
              text="Admin Dashboard"
              href="/(adminDashboard)/admin-dashboard"
              icon={<Menu size={18} />}
              variant="secondary"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Buttons without Icons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button text="Simple Button" variant="primary" />
            <Button text="Secondary" variant="secondary" />
            <Button text="Ghost" variant="ghost" />
            <Button text="Outline" variant="outline" />
            <Button text="Common" variant="common" />
          </div>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
