import { IProfileResponse, IUpdateProfilePayload, IUserDashboardResponse } from "@/types/user/profile";
import { baseApi } from "../baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ FIXED: Returns full profile with pregnancy data
    getMyProfile: builder.query<IProfileResponse, void>({
      query: () => ({
        url: "/my-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    // Update profile mutation
    postMyProfile: builder.mutation<IProfileResponse, IUpdateProfilePayload | FormData>({
      query: (payload) => ({
        url: "/profiles",
        method: "POST", 
        body: payload,
      }),
      invalidatesTags: ["Profile"],
    }),

    // ✅ Returns basic user dashboard info
    getUserDashboard: builder.query<IUserDashboardResponse, void>({
      query: () => ({
        url: "/user-dashboard",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
  overrideExisting: true,
});

// Export hooks
export const { 
  useGetMyProfileQuery, 
  usePostMyProfileMutation,
  useGetUserDashboardQuery 
} = profileApi;

// Export types for use in components
export type { 
  IProfileResponse, 
  IUserDashboardResponse 
};

export default profileApi;