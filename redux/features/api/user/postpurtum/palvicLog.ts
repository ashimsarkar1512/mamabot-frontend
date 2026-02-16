import { baseApi } from "../../baseApi";

export const pelvicExerciseLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPelvicExerciseLogs: builder.query({
      query: () => ({
        url: "/pelvic-exercise-logs",
        method: "GET",
      }),
      providesTags: ["PelvicExerciseLogs"],
    }),
    createPelvicExerciseLog: builder.mutation({
      query: (body) => ({
        url: "/pelvic-exercise-logs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PelvicExerciseLogs"],
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetPelvicExerciseLogsQuery,
  useCreatePelvicExerciseLogMutation,
} = pelvicExerciseLogsApi;
export default pelvicExerciseLogsApi;
