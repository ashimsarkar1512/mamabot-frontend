import { baseApi } from "../../baseApi";

export const mentalHealthLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get mental health logs
    getMentalHealthLogs: builder.query({
      query: () => ({
        url: "/mental-health-logs",
        method: "GET",
      }),
      providesTags: ["MentalHealthLogs"],
    }),

    // Create mental health log
    createMentalHealthLog: builder.mutation({
      query: (body) => ({
        url: "/mental-health-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MentalHealthLogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMentalHealthLogsQuery,
  useCreateMentalHealthLogMutation,
} = mentalHealthLogsApi;

export default mentalHealthLogsApi;
