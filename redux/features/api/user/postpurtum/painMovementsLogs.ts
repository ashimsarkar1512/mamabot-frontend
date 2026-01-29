import { baseApi } from "../../baseApi";

export const painMovementLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPainMovementLogs: builder.query({
      query: () => ({
        url: "/pain-movement-logs",
        method: "GET",
      }),
      providesTags: ["PainMovementLogs"],
    }),
    createPainMovementLog: builder.mutation({
      query: (body) => ({
        url: "/pain-movement-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PainMovementLogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPainMovementLogsQuery,
  useCreatePainMovementLogMutation,
} = painMovementLogsApi;

export default painMovementLogsApi;
