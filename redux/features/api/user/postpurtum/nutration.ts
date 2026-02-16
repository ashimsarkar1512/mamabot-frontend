import { baseApi } from "../../baseApi";

export const nutritionLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get nutrition logs
    getNutritionLogs: builder.query({
      query: () => ({
        url: "/nutrition-logs",
        method: "GET",
      }),
      providesTags: ["NutritionLogs"],
    }),

    // Create nutrition log
    createNutritionLog: builder.mutation({
      query: (body) => ({
        url: "/nutrition-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["NutritionLogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNutritionLogsQuery,
  useCreateNutritionLogMutation,
} = nutritionLogsApi;

export default nutritionLogsApi;
