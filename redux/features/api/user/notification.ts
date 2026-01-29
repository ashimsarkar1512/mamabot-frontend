import { baseApi } from "../baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 👉 Get notifications for logged-in user
    getLoggedInNotifications: builder.query({
      query: () => ({
        url: "/notification-logged-in",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    // 👉 Mark a notification as read
    markAsRead: builder.mutation({
      query: (body) => ({
        url: "/mark-as-read",
        method: "POST",
        body, // e.g. { notificationId: string }
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLoggedInNotificationsQuery,
  useMarkAsReadMutation,
} = notificationApi;

export default notificationApi;
