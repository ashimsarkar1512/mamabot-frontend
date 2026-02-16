import { baseApi } from "../baseApi";


const community = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityPosts: builder.query({
      query: () => ({
        url: "/community/posts",  
        method: "GET",
      }),
      providesTags: ["Community"],
    }),
    getCommunityGroups: builder.query({
      query: () => ({
        url: "/community-groups",
        method: "GET",
      }),
      providesTags: ["Community"],
    }),
    joinCommunityGroup: builder.mutation({
      query: (id: number) => ({
        url: `/groups/join`,
        method: "POST",
        body: {
          group_id: id,
        },
      }),
      invalidatesTags: ["Community"],
    }),
    likeCommunityGroupPost: builder.mutation({
      query: (id: number) => ({
        url: `/community/like`,
        method: "POST",
        body: {
          post_id: id,
        },
      }),
      invalidatesTags: ["Community"],
    }),
    commentCommunityGroupPost: builder.mutation({
      query: (body: { post_id: number; content: string }) => ({
        url: `/community/comment`,
        method: "POST",
        body: {
          post_id: body.post_id,
          content: body.content,
        },
      }),
      invalidatesTags: ["Community"],
    }),
    shareCommunityPost: builder.mutation({
      query: (body: { post_id: number; platform: string; group_id: number }) => ({
        url: `/community/share`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Community"],
    }),

     getRelaxationAudiosUserListen: builder.query({
      query: () => ({
        url: "/relaxation-audios/user-listen",
        method: "GET",
      }),
      
    
    }),
        getAllRelaxationAudios: builder.query({
      query: () => ({
        url: "/relaxation-audios",
        method: "GET",
      }),
      
    }),
  }),
});

export const {
  useGetCommunityPostsQuery,
  useGetCommunityGroupsQuery,
  useJoinCommunityGroupMutation,
  useLikeCommunityGroupPostMutation,
  useCommentCommunityGroupPostMutation,
  useShareCommunityPostMutation,
  useGetRelaxationAudiosUserListenQuery,
  useGetAllRelaxationAudiosQuery
} = community;

export default community;
