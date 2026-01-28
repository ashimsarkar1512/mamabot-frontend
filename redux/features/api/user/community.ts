import { baseApi } from "../baseApi";

const community = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityPosts: builder.query({
      query: () => ({
        url: "/community/posts/1",
        method: "GET",
        providesTags: ["Community"],
      }),
    }),
  }),
});

export const { useGetCommunityPostsQuery } = community;

export default community;
