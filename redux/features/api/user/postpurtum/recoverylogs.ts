import { baseApi } from "../../baseApi";

export const recoveryLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get recovery logs
    getRecoveryLogs: builder.query({
      query: () => ({
        url: "/recovery-logs",
        method: "GET",
      }),
      providesTags: ["RecoveryLogs"],
    }),

    // Create recovery log
    createRecoveryLog: builder.mutation({
      query: (body) => ({
        url: "/recovery-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RecoveryLogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecoveryLogsQuery,
  useCreateRecoveryLogMutation,
} = recoveryLogsApi;

export default recoveryLogsApi;
