export const settingsTabs = [
  "Personalization",
  "Notifications",
  "Privacy & Data",
  "Smart Personalization",
  "Subscription",
  "Help & Support",
];

// data/notificationsData.ts
export interface NotificationSetting {
  id: string;
  category: string;
  title: string;
  description: string;
  defaultEnabled?: boolean;
}

export const notificationSettings: NotificationSetting[] = [
  {
    id: "daily-insights",
    category: "Health & Wellness",
    title: "Daily pregnancy / postpartum insights",
    description: "",
    defaultEnabled: true,
  },
  {
    id: "recommendations",
    category: "Recommendations",
    title: "Product or article suggestions",
    description: "",
    defaultEnabled: true,
  },
  {
    id: "baby-movement",
    category: "Baby Movement & Recovery",
    title: "Kick count, contraction, or recovery reminders",
    description: "",
    defaultEnabled: false,
  },
  {
    id: "mindful-moments",
    category: "Mindful Moments",
    title: "Soft affirmations and wellness tips",
    description: "",
    defaultEnabled: false,
  },
  {
    id: "community",
    category: "Community",
    title: "Replies, likes, and mentions in groups",
    description: "",
    defaultEnabled: true,
  },
  {
    id: "announcements",
    category: "Announcements",
    title: "New features & updates",
    description: "",
    defaultEnabled: true,
  },
];
