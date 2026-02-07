import { baseApi } from "../../baseApi";

export const babyCueLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get baby cue logs
    getBabyCueLogs: builder.query({
      query: () => ({
        url: "/baby-cue-logs",
        method: "GET",
      }),
      providesTags: ["BabyCueLogs"],
    }),

    // Create baby cue log
    createBabyCueLog: builder.mutation({
      query: (body) => ({
        url: "/baby-cue-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["BabyCueLogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBabyCueLogsQuery,
  useCreateBabyCueLogMutation,
} = babyCueLogsApi;

export default babyCueLogsApi;
