import { baseApi } from "../../baseApi";

export const sleepTrackingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSleepTrackings: builder.query({
      query: () => ({
        url: "/sleep-trackings",
        method: "GET",
      }),
      providesTags: ["SleepTrackings"],
    }),
    createSleepTracking: builder.mutation({
      query: (body) => ({
        url: "/sleep-trackings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SleepTrackings"],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetSleepTrackingsQuery,
  useCreateSleepTrackingMutation,
} = sleepTrackingsApi;

export default sleepTrackingsApi;
