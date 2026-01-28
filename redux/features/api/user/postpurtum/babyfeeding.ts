import { baseApi } from "../../baseApi";

export const babyFeedingModalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get feeding logs
    getFeedingLogs: builder.query({
      query: () => ({
        url: "/feeding-logs",
        method: "GET",
      }),
      providesTags: ["FeedingLogs"],
    }),

    // Create feeding log
    createFeedingLog: builder.mutation({
      query: (body) => ({
        url: "/feeding-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FeedingLogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFeedingLogsQuery,
  useCreateFeedingLogMutation,
} = babyFeedingModalApi;

export default babyFeedingModalApi;
