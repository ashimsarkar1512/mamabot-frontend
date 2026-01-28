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
    getCommunityGroups: builder.query({
      query: () => ({
        url: "/community-groups",
        method: "GET",
        providesTags: ["Community"],
      }),
    }),
  }),
});

export const { useGetCommunityPostsQuery, useGetCommunityGroupsQuery } =
  community;

export default community;
