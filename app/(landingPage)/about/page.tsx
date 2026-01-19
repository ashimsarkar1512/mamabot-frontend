import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Next JS 16 Template",
  description:
    "Learn more about our Next.js 16 template with TypeScript and Tailwind CSS",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About Our NextJS Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern, responsive template built with Next.js 16, TypeScript, and
            Tailwind CSS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Modern Development Stack
            </h2>
            <p className="text-muted-foreground mb-4">
              Our template leverages the latest technologies to provide you with
              a solid foundation for your next project. Built with Next.js 16,
              you get all the benefits of the latest React features, server
              components, and optimized performance.
            </p>
            <p className="text-muted-foreground mb-6">
              With TypeScript for type safety and Tailwind CSS for rapid
              styling, you can focus on building features instead of wrestling
              with CSS frameworks.
            </p>
            <Button text="Get Started" href="/" variant="primary" />
          </div>
          <div className="bg-muted rounded-xl p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary to-accent w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="text-primary-foreground text-2xl">⚛️</div>
              </div>
              <h3 className="font-semibold text-foreground">Next.js 16</h3>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Responsive Design
              </h3>
              <p className="text-muted-foreground">
                Fully responsive layout that works on all device sizes from
                mobile to desktop.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Type Safety
              </h3>
              <p className="text-muted-foreground">
                Built with TypeScript for enhanced developer experience and
                fewer runtime errors.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Performance Optimized
              </h3>
              <p className="text-muted-foreground">
                Optimized for performance with automatic code splitting and
                image optimization.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of developers who are already building amazing
            applications with our template.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button text="Download Template" variant="primary" />
            <Button text="View Documentation" variant="outline" />
          </div>
        </div>
      </div>
    </div>
  );
}
