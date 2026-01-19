"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    // Role-based redirection
    // Based on directory structure:
    // (adminDashboard)/admin-dashboard
    // (userDashboard)/user-dashboard
    
    // Check if role is admin (adjust case sensitivity if needed)
    const role = session.user.role?.toUpperCase();

    if (role === "ADMIN") {
      router.replace("/admin-dashboard");
    } else if (role === "USER") {
      router.replace("/user-dashboard");
    } else {
      // Default fallback if role is unknown or moderator
      // Assuming moderator might go to moderator-dashboard based on directory listing
      if (role === "MODERATOR") {
         router.replace("/moderator-dashboard"); 
      } else {
         router.replace("/user-dashboard");
      }
    }
  }, [session, status, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-gray-500">Please wait while we take you to your dashboard.</p>
      </div>
    </div>
  );
}
