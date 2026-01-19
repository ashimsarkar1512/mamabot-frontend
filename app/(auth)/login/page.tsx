"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { useLoginMutation } from "@/redux/features/api/auth/authApi";
import { useAuth } from "@/hooks/useAuth";
import Toast from "@/components/ui/Toast";
import { getRedirectPath } from "@/lib/role-utils";
import { z } from "zod";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
  });

  const [login, { isLoading }] = useLoginMutation();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/");
  }

  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "success"
  ) => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const closeToast = () => {
    setToast({
      ...toast,
      isVisible: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate inputs using Zod
    try {
      loginSchema.parse({ email, password });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const firstError = validationError.errors[0];
        setError(firstError?.message || "Validation error");
        showToast(firstError?.message || "Validation error", "error");
        return;
      }
    }

    try {
      // Call the login mutation using RTK Query to get user data including roles
      const result = await login({ email, password }).unwrap();

      // Use NextAuth to trigger session update
      // This will call our /api/auth/[...nextauth]/route.ts which connects to our backend API
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.ok) {
        // Successful login, redirect based on user role priority
        const redirectPath = result.user.roles
          ? getRedirectPath(result.user.roles)
          : "/user-dashboard";
        router.push(redirectPath);

        // Show success toast
        showToast("Login successful!", "success");
      } else {
        setError(signInResult?.error || "Login failed");
        showToast(signInResult?.error || "Login failed", "error");
      }
    } catch (err: unknown) {
      const errorObj = err as { data?: { message?: string }; message?: string };
      const errorMessage =
        errorObj.data?.message || errorObj.message || "Login failed";
      setError(errorMessage);
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-xl border border-border">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-background border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Button
              text={isLoading ? "Signing in..." : "Sign in"}
              variant="primary"
              className="w-full"
              onClick={handleSubmit}
            />
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don{"'"}t have an account?{" "}
            <a
              href="/register"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}
