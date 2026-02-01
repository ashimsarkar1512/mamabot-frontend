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

export interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  actionLabel?: string;
  icon?: string;
  isToggle?: boolean;
  defaultEnabled?: boolean;
  variant?: "button" | "toggle" | "checkbox";
}

export const privacySettings: PrivacySetting[] = [
  
  {
    id: "analytics-cookies",
    title: "Analytics & Cookies",
    description: "Enable/disable anonymous usage tracking",
    isToggle: true,
    defaultEnabled: true,
    variant: "toggle",
  },
  
  {
    id: "two-factor-auth",
    title: "Two-Factor Authentication",
    description: "Add extra login protection",
    actionLabel: "Enable",
    variant: "button",
  },
];

export interface SmartPersonalizationSetting {
  id: string;
  category: string;
  title: string;
  description: string;
  defaultEnabled?: boolean;
  type?: "toggle" | "radio";
  options?: string[];
}

export const smartPersonalizationSettings: SmartPersonalizationSetting[] = [
  {
    id: "pregnancy-motherhood",
    category: "Context Awareness",
    title: "Pregnancy / Motherhood Context",
    description: "Auto-detect stage for smarter replies",
    defaultEnabled: true,
    type: "toggle",
  },
  {
    id: "activity-awareness",
    category: "Activity Tracking",
    title: "Activity Awareness",
    description: "Use logged health data to refine recommendations",
    defaultEnabled: true,
    type: "toggle",
  },
  {
    id: "personalized-nutrition",
    category: "Nutrition",
    title: "Personalized Nutrition",
    description: "Allow AI to suggest meals based on logs",
    defaultEnabled: true,
    type: "toggle",
  },
  {
    id: "reminder-style",
    category: "Notifications",
    title: "Reminder Style",
    description: "Choose your notification tone",
    defaultEnabled: true,
    type: "radio",
    options: ["Normal", "Calm"],
  },
  {
    id: "mood-emotional",
    category: "Mental Health",
    title: "Mood & Emotional Tracking",
    description: "Enable AI to track and reflect your moods",
    defaultEnabled: true,
    type: "toggle",
  },
  {
    id: "voice-feedback",
    category: "Voice Features",
    title: "Voice Feedback",
    description: "Enable soft spoken voice replies (future support)",
    defaultEnabled: true,
    type: "toggle",
  },
];

export interface SubscriptionItem {
  id: string;
  title: string;
  value?: string;
  description?: string;
  actionLabel?: string;
  actionVariant?: "primary" | "secondary" | "danger" | "outline" | "text" | "upgrade";
  icon?: string;
  isHighlighted?: boolean;
}

export const subscriptionItems: SubscriptionItem[] = [
  {
    id: "current-plan",
    title: "Current Plan",
    value: "Free",
    actionLabel: "Upgrade Plan",
     actionVariant: "upgrade",
    isHighlighted: true,
  },
 
  {
    id: "payment-method",
    title: "Payment Method",
    value: "Visa****4213",
    actionLabel: "Update",
    actionVariant: "outline",
  },
  {
    id: "device-management",
    title: "Device Management",
    description: "Manage logged-in devices",
    actionLabel: "View Devices",
    actionVariant: "outline",
    icon: "MonitorSmartphone",
  },

  {
    id: "billing-history",
    title: "Billing History",
    description: "View past payments",
    actionLabel: "View Invoices",
    actionVariant: "outline",
    icon: "Download",
  },
  {
    id: "app-version",
    title: "App Version",
    value: "1.2.3",
  },
];
