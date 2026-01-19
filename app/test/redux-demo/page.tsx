"use client";

import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { setCredentials, logOut } from "@/redux/features/slice/authSlice";
import { toggleTheme } from "@/redux/features/slice/uiSlice";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useLoginMutation } from "@/redux/features/api/auth/authApi";



export default function ReduxDemoPage() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleCurrentTheme } = useTheme();
  const [login, { isLoading }] = useLoginMutation();

  const handleDemoLogin = () => {
    // Simulate a login with demo credentials
    dispatch(
      setCredentials({
        user: {
          _id: "demo-user-1",
          name: "Demo User",
          phone: "+1234567890",
          email: "demo@example.com",
          roles: ["USER"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
    );
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleApiLogin = async () => {
    try {
      await login({
        email: "demo@example.com",
        password: "password123",
      }).unwrap();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Redux Toolkit Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Professional state management with Redux Toolkit and RTK Query
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Authentication Demo */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Authentication State
            </h2>

            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">
                  Status:{" "}
                  <span
                    className={
                      isAuthenticated ? "text-green-600" : "text-red-600"
                    }
                  >
                    {isAuthenticated ? "Authenticated" : "Not Authenticated"}
                  </span>
                </p>

                {user && (
                  <div className="mt-2">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.phone}</p>
                    <p>Roles: {user.roles.join(", ")}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {!isAuthenticated ? (
                  <>
                    <Button
                      text={isLoading ? "Logging in..." : "Demo Login"}
                      onClick={handleDemoLogin}
                      variant="primary"
                      className="w-full"
                    />
                    <Button
                      text="API Login"
                      onClick={handleApiLogin}
                      variant="outline"
                      className="w-full"
                      disabled={isLoading}
                    />
                  </>
                ) : (
                  <Button
                    text="Logout"
                    onClick={handleLogout}
                    variant="secondary"
                    className="w-full"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Theme Demo */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              UI State Management
            </h2>

            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">
                  Current Theme: <span className="capitalize">{theme}</span>
                </p>
                <div
                  className={`mt-2 w-8 h-8 rounded-full ${
                    theme === "light" ? "bg-yellow-400" : "bg-gray-800"
                  }`}
                ></div>
              </div>

              <Button
                text={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
                onClick={toggleCurrentTheme}
                variant="primary"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* RTK Query Demo */}
        <div className="mt-12 bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            RTK Query API Integration
          </h2>

          <div className="bg-muted p-4 rounded-lg mb-4">
            <p className="font-medium">
              API Status:{" "}
              <span
                className={isLoading ? "text-yellow-600" : "text-green-600"}
              >
                {isLoading ? "Loading..." : "Ready"}
              </span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              RTK Query handles caching, invalidation, polling, and other data
              fetching concerns automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-semibold text-foreground mb-2">
                Automatic Caching
              </h3>
              <p className="text-sm text-muted-foreground">
                Responses are cached automatically, reducing redundant network
                requests.
              </p>
            </div>

            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-semibold text-foreground mb-2">
                Background Refetching
              </h3>
              <p className="text-sm text-muted-foreground">
                Data stays fresh with automatic background updates.
              </p>
            </div>

            <div className="bg-background p-4 rounded-lg border">
              <h3 className="font-semibold text-foreground mb-2">
                Request Deduplication
              </h3>
              <p className="text-sm text-muted-foreground">
                Identical requests are deduplicated automatically.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button text="Back to Home" href="/" variant="outline" />
        </div>
      </div>
    </div>
  );
}
