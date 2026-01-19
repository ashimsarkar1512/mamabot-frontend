import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tests - Next JS 16 Template",
  description: "Test pages for the Next.js 16 template application",
};

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
