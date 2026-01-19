"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import { setCredentials, clearUser } from "@/redux/features/slice/authSlice";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Map NextAuth session user to Redux User type
      // Handle both single role and role array
      let role: "ADMIN" | "MODERATOR" | "USER" = "USER";
      if (session.user.role) {
        if (Array.isArray(session.user.role)) {
          // If it's an array of roles, get the primary role based on priority
          const ROLE_PRIORITY = ["admin", "moderator", "user"];
          const primaryRole =
            ROLE_PRIORITY.find((r) => session.user.role.includes(r)) || "user";
          role = primaryRole.toUpperCase() as "ADMIN" | "MODERATOR" | "USER";
        } else {
          role = (
            session.user.role as "ADMIN" | "MODERATOR" | "USER"
          ).toUpperCase() as "ADMIN" | "MODERATOR" | "USER";
        }
      }

      dispatch(
        setCredentials({
          user: {
            _id: session.user.id,
            name: session.user.name || "",
            phone: session.user.email || "", // Use email as phone since NextAuth session doesn't have phone property
            roles: [role],
            email: session.user.email || "",
            createdAt: new Date().toISOString(), // Placeholder as session doesn't have this
            updatedAt: new Date().toISOString(), // Placeholder as session doesn't have this
          },
        })
      );
    } else if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [status, session, dispatch]);

  return null;
}
