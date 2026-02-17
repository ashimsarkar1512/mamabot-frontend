import { baseApi } from "../baseApi";

const aiCount = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAiCount: builder.query({
      query: () => ({
        url: "/chat-quota",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAiCountQuery,
} = aiCount;

export default aiCount;
