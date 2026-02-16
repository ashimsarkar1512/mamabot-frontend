import { baseApi } from "../../baseApi";

export const pregnancyFoodWeeklyLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getPregnancyFoodWeeklyLogs: builder.query({
      query: () => ({
        url: "/pregnancy-food-weekly-logs",
        method: "GET",
      }),
      providesTags: ["PregnancyFoodWeeklyLogs"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetPregnancyFoodWeeklyLogsQuery,
} = pregnancyFoodWeeklyLogsApi;

export default pregnancyFoodWeeklyLogsApi;
