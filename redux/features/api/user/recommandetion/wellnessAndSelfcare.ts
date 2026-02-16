import { baseApi } from "../../baseApi";

export const wellnessActivitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getWellnessActivities: builder.query({
      query: () => ({
        url: "/wellness-activities",
        method: "GET",
      }),
      providesTags: ["WellnessActivities"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetWellnessActivitiesQuery,
} = wellnessActivitiesApi;

export default wellnessActivitiesApi;
