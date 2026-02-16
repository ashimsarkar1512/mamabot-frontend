import { baseApi } from "../../baseApi";

export const qaSessionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET sessions
    getQASessions: builder.query({
      query: () => ({
        url: "/qa-sessions",
        method: "GET",
      }),
      providesTags: ["QASessions"],
    }),

    // POST register for a session
    registerQASession: builder.mutation({
      query: (payload: { qa_session_id: number }) => ({
        url: "/qa-sessions/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["QASessions"], // optional: refresh session list
    }),
  }),
  overrideExisting: false,
});

export const { useGetQASessionsQuery, useRegisterQASessionMutation } = qaSessionsApi;

export default qaSessionsApi;
