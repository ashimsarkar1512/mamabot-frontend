import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Next JS 16 Template",
  description:
    "Explore our services offered through the Next.js 16 template with TypeScript and Tailwind CSS",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful features and services that our NextJS template
            provides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-card p-8 rounded-xl border border-border hover:border-primary transition-colors">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <div className="text-primary text-xl">⚡</div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Performance
            </h3>
            <p className="text-muted-foreground mb-4">
              Optimized for speed with automatic code splitting, image
              optimization, and server-side rendering.
            </p>
            <Button text="Learn More" variant="outline" size="sm" />
          </div>

          <div className="bg-card p-8 rounded-xl border border-border hover:border-primary transition-colors">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <div className="text-primary text-xl">📱</div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Responsive Design
            </h3>
            <p className="text-muted-foreground mb-4">
              Fully responsive layout that works seamlessly across all devices
              from mobile to desktop.
            </p>
            <Button text="Learn More" variant="outline" size="sm" />
          </div>

          <div className="bg-card p-8 rounded-xl border border-border hover:border-primary transition-colors">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <div className="text-primary text-xl">🔒</div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Security
            </h3>
            <p className="text-muted-foreground mb-4">
              Built with security best practices including automatic protection
              against common vulnerabilities.
            </p>
            <Button text="Learn More" variant="outline" size="sm" />
          </div>

          <div className="bg-card p-8 rounded-xl border border-border hover:border-primary transition-colors">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <div className="text-primary text-xl">🛠️</div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Developer Experience
            </h3>
            <p className="text-muted-foreground mb-4">
              Enhanced DX with TypeScript, hot reloading, and intuitive
              component architecture.
            </p>
            <Button text="Learn More" variant="outline" size="sm" />
          </div>

          <div className="bg-card p-8 rounded-xl border border-border hover:border-primary transition-colors">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <div className="text-primary text-xl">🎨</div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Customization
            </h3>
            <p className="text-muted-foreground mb-4">
              Highly customizable with theme variables and component
              architecture for easy modifications.
            </p>
            <Button text="Learn More" variant="outline" size="sm" />
          </div>

          <div className="bg-card p-8 rounded-xl border border-border hover:border-primary transition-colors">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <div className="text-primary text-xl">🚀</div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Deployment Ready
            </h3>
            <p className="text-muted-foreground mb-4">
              Optimized for deployment on Vercel, Netlify, and other hosting
              platforms with minimal configuration.
            </p>
            <Button text="Learn More" variant="outline" size="sm" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Start building your next project with our powerful and flexible
            NextJS template today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              text="Get Started Now"
              variant="common"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            />
            <Button
              text="View Demo"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
