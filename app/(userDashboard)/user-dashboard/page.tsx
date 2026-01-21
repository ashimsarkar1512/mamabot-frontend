import UserHomeDashboard from "@/components/User/UserHome/UserHomeDash";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard - Next JS 16 Template",
  description: "User dashboard for the Next.js 16 template application",
};

export default function UserDashboard() {
  return (
   <UserHomeDashboard/>
  );
}
