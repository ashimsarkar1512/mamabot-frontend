import { baseApi } from "../../baseApi";

export const diaperLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 👉 Get diaper logs
    getDiaperLogs: builder.query({
      query: () => ({
        url: "/diaper-log",
        method: "GET",
      }),
      providesTags: ["DiaperLog"],
    }),

    // 👉 Create diaper log
    createDiaperLog: builder.mutation({
      query: (body) => ({
        url: "/diaper-log",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DiaperLog"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDiaperLogsQuery,
  useCreateDiaperLogMutation,
} = diaperLogApi;

export default diaperLogApi;
