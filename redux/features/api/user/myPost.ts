import { baseApi } from "../baseApi";

const myPostsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPosts: builder.query({
      query: () => ({
        url: "/my-posts",
        method: "GET",
      }),
      providesTags: ["Community"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyPostsQuery,
} = myPostsApi;

export default myPostsApi;
