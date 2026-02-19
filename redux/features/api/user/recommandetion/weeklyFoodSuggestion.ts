import { baseApi } from "../../baseApi";

export const pregnancyFoodWeeklyLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getPregnancyFoodWeeklyLogs: builder.query({
      query: ({ pregnancy_week, dietary_preference }) => {
        const params = new URLSearchParams();
        if (pregnancy_week) params.append("pregnancy_week", pregnancy_week);
        if (dietary_preference)
          params.append("dietary_preference", dietary_preference);

        return {
          url: `/pregnancy-foods/fetch?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["PregnancyFoodWeeklyLogs"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetPregnancyFoodWeeklyLogsQuery,
} = pregnancyFoodWeeklyLogsApi;

export default pregnancyFoodWeeklyLogsApi;
