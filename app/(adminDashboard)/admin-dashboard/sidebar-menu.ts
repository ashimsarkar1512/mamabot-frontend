
import {
  Users,
  MessagesSquare,
  TriangleAlert,
  BellIcon,
  CalendarRange,
  AppleIcon,
  TrendingUp,
  BrainCircuit,
  MenuSquare,
} from "lucide-react";

export const adminSidebarMenu = [
  {
    label: "User Management",
    href: "/admin-dashboard/user-management",
    icon: Users,
  },
  {
    label: "Community Monitoring",
    href: "/admin-dashboard/community-monitoring",
    icon: MessagesSquare,
  },
  {
    label: "Reported Content",
    href: "/admin-dashboard/analytics",
    icon: TriangleAlert,
  },
  {
    label: "Announcements",
    href: "/admin-dashboard/settings",
    icon: BellIcon,
  },
  {
    label: "Weekly Pregnancy Content",
    href: "/admin-dashboard/pregnancy",
    icon: CalendarRange,
  },
  {
    label: "Diet & Hydration",
    href: "/admin-dashboard/diet",
    icon: AppleIcon,
  },
  {
    label: "Analytics",
    href: "/admin-dashboard/analytics-main",
    icon: TrendingUp,
  },
  {
    label: "AI Rules",
    href: "/admin-dashboard/ai-rules",
    icon: BrainCircuit,
  },
  {
    label: "Content Management",
    href: "/admin-dashboard/content",
    icon: MenuSquare,
  },
];
