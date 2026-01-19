import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Next JS 16 Template",
  description:
    "Get in touch with us through our Next.js 16 template with TypeScript and Tailwind CSS",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our NextJS template? We&#39;d love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-8">
              We&#39;re here to help you get started with our template and
              answer any questions you might have.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <div className="text-primary">✉️</div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">
                    support@nextjstemplate.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <div className="text-primary">🌐</div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Website</h3>
                  <p className="text-muted-foreground">
                    www.nextjstemplate.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <div className="text-primary">🏢</div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Send us a message
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <Button
                text="Send Message"
                variant="primary"
                className="w-full"
              />
            </form>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Before reaching out, you might find answers to common questions in
            our documentation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                How do I install the template?
              </h3>
              <p className="text-sm text-muted-foreground">
                Check our documentation for detailed installation instructions.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Is there support included?
              </h3>
              <p className="text-sm text-muted-foreground">
                Yes, we provide support for all our template users.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Can I customize the design?
              </h3>
              <p className="text-sm text-muted-foreground">
                Absolutely! The template is fully customizable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
