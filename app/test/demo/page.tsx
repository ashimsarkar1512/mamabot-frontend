import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo - Next JS 16 Template",
  description: "Demo page for the Next.js 16 template application",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            NextJS 16 Template Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the features of our updated template with consistent theming
            and components
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-card p-8 rounded-xl border border-border">
            <div className="bg-gradient-to-r from-primary to-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary-foreground text-xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Consistent Theming
            </h3>
            <p className="text-muted-foreground mb-4">
              All components use CSS variables from global theme for consistent
              look and feel.
            </p>
            <Link href="/about" className="text-primary hover:underline">
              Learn more →
            </Link>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border">
            <div className="bg-gradient-to-r from-primary to-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary-foreground text-xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Responsive Design
            </h3>
            <p className="text-muted-foreground mb-4">
              Fully responsive layout that adapts to all screen sizes and
              devices.
            </p>
            <Link href="/services" className="text-primary hover:underline">
              Explore services →
            </Link>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border">
            <div className="bg-gradient-to-r from-primary to-accent w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary-foreground text-xl">⚙️</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Modern Components
            </h3>
            <p className="text-muted-foreground mb-4">
              Pre-built, customizable components for rapid development.
            </p>
            <Link href="/contact" className="text-primary hover:underline">
              Contact us →
            </Link>
          </div>
        </div>

        <div className="bg-muted rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-6">
            Button Variants Showcase
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button text="Primary" variant="primary" />
            <Button text="Secondary" variant="secondary" />
            <Button text="Outline" variant="outline" />
            <Button text="Ghost" variant="ghost" />
            <Button text="Common" variant="common" />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-12 border border-border">
          <h2 className="text-3xl font-bold text-foreground text-center mb-6">
            Template Overview
          </h2>
          <div className="prose prose-gray max-w-none">
            <h3 className="text-xl font-semibold text-foreground">
              Global CSS Updates:
            </h3>
            <ul className="text-muted-foreground list-disc pl-6 space-y-2">
              <li>Comprehensive theme variables for consistent styling</li>
              <li>Light and dark mode support</li>
              <li>Accessibility-focused color palette</li>
              <li>CSS animations and transitions</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8">
              Component Updates:
            </h3>
            <ul className="text-muted-foreground list-disc pl-6 space-y-2">
              <li>Navbar with updated routing and styling</li>
              <li>Banner with relevant content and call-to-action</li>
              <li>Footer with consistent branding and navigation</li>
              <li>Button component with icon support and theme consistency</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8">
              Route Pages:
            </h3>
            <ul className="text-muted-foreground list-disc pl-6 space-y-2">
              <li>About page with template information</li>
              <li>Services page showcasing features</li>
              <li>Contact page with form and information</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button text="Get Started" href="/" variant="primary" />
            <Button
              text="View Source"
              href="https://github.com"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
