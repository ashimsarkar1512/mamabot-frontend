import { baseApi } from "../../baseApi";

export const notificationSettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get notification settings
    getNotificationSetting: builder.query({
      query: () => ({
        url: "/notification-settings",
        method: "GET",
      }),
      providesTags: ["NotificationSetting"],
    }),

    // Create notification settings (POST)
    createNotificationSetting: builder.mutation({
      query: (body) => ({
        url: "/notification-settings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["NotificationSetting"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetNotificationSettingQuery,
  useCreateNotificationSettingMutation,
 
} = notificationSettingApi;

export default notificationSettingApi;