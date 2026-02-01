import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const dynamicBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,

  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: [
    "User",
    "Products",
    "Profile",
    "Dashboard",
    "Hydration",
    "Movement",
    "Personalize",
    "NotificationSetting",
    "FeedingLogs",
    "RecoveryLogs",
    "PelvicExerciseLogs",
    "PainMovementLogs",
    "DiaperLog",
    "SleepTrackings",
    "IncisionHealingChecks",
    "AboutUs",
    "OurMission",
    "OurJourney",
    "Community",
    "Recommendations",
    "MotherWellnessLogs",
    "Notifications",
    "MovementRestrictions",
    "Articles",
    "PregnancyProducts",
    "OurTeam",
    "PrivacyData",
  ],
  endpoints: () => ({}),
});
