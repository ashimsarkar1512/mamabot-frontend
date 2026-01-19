import { getSession } from "next-auth/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a dynamic baseQuery that handles SSR properly
const dynamicBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  credentials: "include", // Include credentials (cookies) for all requests
  prepareHeaders: async (headers) => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.accessToken) {
        // Use Bearer token format for authorization header
        headers.set("authorization", `Bearer ${session.accessToken}`);
      }
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["User", "Products"],
  endpoints: () => ({}),
});
