import { baseApi } from "../../baseApi";

export interface CommunityUser {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
}

export interface CommunityComment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at?: string;
  user?: CommunityUser;
}

export interface CommunityShare {
  id: number;
  post_id: number;
  user_id: number;
  shared_at: string;
  user?: CommunityUser;
}

export interface CommunityGroup {
  id: number;
  name: string;
  slug: string;
  description: string;
  stage: string;
  member_count: number;
  is_active: number;
}

export interface CommunityPost {
  id: number;
  user_id: number;
  group_id: number;
  title: string;
  slug: string;
  content: string;
  role_label: string;
  week: number;
  image_urls: string[];
  moderation_report_status: "pending" | "approved" | "removed";
  reported_count: number;
  posted_at: string;
  created_at: string;
  updated_at: string;

  likes_count: number;
  comments_count: number;
  shares_count: number;

  is_liked?: boolean;
  is_joined?: boolean;

  user: CommunityUser;
  comments: CommunityComment[];
  shares: CommunityShare[];
  group: CommunityGroup;
}

export interface CommunityPostsResponse {
  success: boolean;
  data: CommunityPost[];
}

export interface CreateCommunityPostPayload {
  group_id: number | string;
  title: string;
  content: string;
  week: number;
}

export interface LikePostPayload {
  post_id: number;
}

export interface CommentPostPayload {
  post_id: number;
  content: string;
}

export interface SharePostPayload {
  post_id: number;
}

export const communityPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- GET POSTS ---------- */
    getCommunityPosts: builder.query<CommunityPostsResponse, void>({
      query: () => ({
        url: "/community/posts",
        method: "GET",
      }),
      providesTags: ["Community"],
    }),

    /* ---------- CREATE POST ---------- */
    createCommunityPost: builder.mutation<
      { success: boolean; message: string; data: CommunityPost },
      CreateCommunityPostPayload
    >({
      query: (body) => ({
        url: "/community/posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Community"],
    }),

    /* ---------- LIKE POST ---------- */
    likeCommunityPost: builder.mutation<
      { success: boolean; message: string; is_liked: boolean },
      LikePostPayload
    >({
      query: (body) => ({
        url: "/community/like",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Community"],
    }),

    /* ---------- COMMENT POST ---------- */
    commentCommunityPost: builder.mutation<
      { success: boolean; message: string; data: CommunityComment },
      CommentPostPayload
    >({
      query: (body) => ({
        url: "/community/comment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Community"],
    }),

    /* ---------- SHARE POST ---------- */
    shareCommunityPost: builder.mutation<
      { success: boolean; message: string },
      SharePostPayload
    >({
      query: (body) => ({
        url: "/community/share",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Community"],
    }),
  }),
});

export const {
  useGetCommunityPostsQuery,
  useCreateCommunityPostMutation,
  useLikeCommunityPostMutation,
  useCommentCommunityPostMutation,
  useShareCommunityPostMutation,
} = communityPostApi;
