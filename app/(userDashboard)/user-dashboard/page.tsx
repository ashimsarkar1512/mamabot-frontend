import UserHomeDashboard from "@/components/User/UserHome/UserHomeDash";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mamabot - User Dashboard",
  description:
    "Your personalized AI assistant for pregnancy and parenting support.",
};

export default function UserDashboard() {
  return (
    <div className="bg-[#F2F4F8]">
      <UserHomeDashboard />
    </div>
  );
}
