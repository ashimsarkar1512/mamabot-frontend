"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import { setCredentials, logOut } from "@/redux/features/slice/authSlice";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        setCredentials({
          user: {
            _id: session.user.id || "",
            name: session.user.name || "",
            phone:
              (session.user as { phone?: string }).phone ||
              session.user.email ||
              "",
            email: session.user.email || "",
            roles: [
              session.user.role === "ADMIN" || session.user.role === "MODERATOR"
                ? (session.user.role as "ADMIN" | "MODERATOR")
                : "USER",
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })
      );
    } else {
      dispatch(logOut());
    }
  }, [status, session, dispatch]);

  return null;
}
