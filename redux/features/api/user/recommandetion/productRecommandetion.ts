import { baseApi } from "../../baseApi";

export const pregnancyProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET pregnancy products by week
    getPregnancyProductsByWeek: builder.query<any, number>({
      query: (pregnancy_week: number) =>
        `/pregnancy-products/fetch?pregnancy_week=${pregnancy_week}`,
      providesTags: ["PregnancyProducts"],
      transformResponse: (response: any) => {
      
        console.log("API Response:", response);
        return response;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetPregnancyProductsByWeekQuery } = pregnancyProductsApi;

export default pregnancyProductsApi;
