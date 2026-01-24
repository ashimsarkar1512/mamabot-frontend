import ReduxProvider from "@/redux/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Next JS 16 Template",
  description: "Authentication pages for the Next.js 16 template application",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
