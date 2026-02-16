import { baseApi } from "../../baseApi";

export const movementRestrictionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET movement restrictions
    getMovementRestrictions: builder.query({
      query: () => ({
        url: "/movement-restrictions",
        method: "GET",
      }),
      providesTags: ["MovementRestrictions"],
    }),

    // 🔹 POST movement restriction
    createMovementRestriction: builder.mutation({
      query: (body) => ({
        url: "/movement-restrictions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MovementRestrictions"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMovementRestrictionsQuery,
  useCreateMovementRestrictionMutation,
} = movementRestrictionsApi;

export default movementRestrictionsApi;
