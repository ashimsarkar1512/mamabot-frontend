"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import ReduxProvider from "@/providers/ReduxProvider";
import AuthSync from "@/components/auth/AuthSync";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={false}
        disableTransitionOnChange
      >
        <ReduxProvider>
          <AuthSync />
          {children}
        </ReduxProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
