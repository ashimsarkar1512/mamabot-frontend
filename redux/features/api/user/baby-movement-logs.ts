import { baseApi } from "../baseApi";

const babyMovementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getbabyMovementLogs: builder.query({
      query: () => ({
        url: "/baby-movement-logs",
        method: "GET",
      }),
      providesTags: ["Movement"],
    }),

    createbabyMovementLog: builder.mutation({
      query: (body) => ({
        url: "/baby-movement-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Movement"],
    }),
  }),
  overrideExisting: false,
});

export const {
useGetbabyMovementLogsQuery,
useCreatebabyMovementLogMutation
} = babyMovementApi;

export default babyMovementApi;