import { baseApi } from "@/redux/features/api/baseApi";

export interface CommunityUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

export interface CommunityComment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  user: CommunityUser;
}

export interface CommunityShare {
  id: number;
  post_id: number;
  user_id: number;
  shared_at: string;
  user: CommunityUser;
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
  user: CommunityUser;
  comments: CommunityComment[];
  shares: CommunityShare[];
}

export interface LandingPagePostsResponse {
  success: boolean;
  data: CommunityPost[];
}

export const youreNotAloneApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLandingPagePosts: builder.query<LandingPagePostsResponse, void>({
      query: () => ({
        url: "/community/posts/landing-page",
        method: "GET",
      }),
      providesTags: ["YoureNotAlone"],
    }),
  }),
});

export const { useGetLandingPagePostsQuery } = youreNotAloneApi;
