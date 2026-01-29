import { baseApi } from "../../baseApi";

export const incisionHealingChecksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncisionHealingChecks: builder.query({
      query: () => ({
        url: "/incision-healing-checks",
        method: "GET",
      }),
      providesTags: ["IncisionHealingChecks"],
    }),
    createIncisionHealingCheck: builder.mutation({
      query: (body) => ({
        url: "/incision-healing-checks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IncisionHealingChecks"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIncisionHealingChecksQuery,
  useCreateIncisionHealingCheckMutation,
} = incisionHealingChecksApi;

export default incisionHealingChecksApi;
