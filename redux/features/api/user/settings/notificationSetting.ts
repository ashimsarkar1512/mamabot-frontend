import { baseApi } from "../../baseApi";

export interface NotificationSettingsPayload {
  health_wellness: number | string;
  baby_movement_recovery: number | string;
  community: number | string;
  recommendation: number | string;
  mindful_moments: number | string;
  announcements: number | string;
}

export interface CreateNotificationSettingsResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    health_wellness: string;
    baby_movement_recovery: string;
    community: string;
    recommendation: string;
    mindful_moments: string;
    announcements: string;
    created_at: string;
    updated_at: string;
  };
}

export interface GetNotificationSettingsResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    health_wellness: number;
    baby_movement_recovery: number;
    community: number;
    recommendation: number;
    mindful_moments: number;
    announcements: number;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotificationSettings: builder.mutation<
      CreateNotificationSettingsResponse,
      NotificationSettingsPayload
    >({
      query: (body) => ({
        url: "/notification-settings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["NotificationSetting"],
    }),

    getNotificationSettings: builder.query<
      GetNotificationSettingsResponse,
      void
    >({
      query: () => ({
        url: "/notification-settings",
        method: "GET",
      }),
      providesTags: ["NotificationSetting"],
    }),
  }),
});

export const {
  useCreateNotificationSettingsMutation,
  useGetNotificationSettingsQuery,
} = notificationApi;
