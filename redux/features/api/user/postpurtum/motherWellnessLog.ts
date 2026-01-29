import { baseApi } from "../../baseApi";

export const motherWellnessLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMotherWellnessLogs: builder.query({
      query: () => ({
        url: "/mother-wellness-logs",
        method: "GET",
      }),
      providesTags: ["MotherWellnessLogs"],
    }),

    createMotherWellnessLog: builder.mutation({
      query: (body) => ({
        url: "/mother-wellness-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MotherWellnessLogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMotherWellnessLogsQuery,
  useCreateMotherWellnessLogMutation,
} = motherWellnessLogsApi;

export default motherWellnessLogsApi;
