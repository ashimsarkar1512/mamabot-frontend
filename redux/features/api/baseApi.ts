import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const dynamicBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  // credentials: "include", // optional if backend needs cookies
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      // const token = localStorage.getItem("token"); // your JWT from login
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
    "AboutUs",
    "OurMission",
    "OurJourney",
  ],
  endpoints: () => ({}),
});
