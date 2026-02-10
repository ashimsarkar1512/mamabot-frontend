import { baseApi } from "@/redux/features/api/baseApi";

export interface AffiliateProduct {
  id: number;
  title: string;
  category: string;
  affiliate_link: string;
  reason: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  title?: string;
  slug?: string;
  short_description?: string;
  long_description?: string;
  created_at: string;
  updated_at: string;
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
  moderation_report_status: string;
  reported_count: number;
  posted_at: string;
  created_at: string;
  updated_at: string;
}

export type Savable = AffiliateProduct | Article | CommunityPost | null;

export interface SavedItem {
  id: number;
  user_id: number;
  savable_type: string;
  savable_id: number;
  created_at: string;
  updated_at: string;
  savable: Savable;
}

export interface SavedItemsResponse {
  success: boolean;
  data: SavedItem[];
}

export const savedItemsGetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSavedItems: builder.query<SavedItemsResponse, void>({
      query: () => ({
        url: "/my-saved-items",
        method: "GET",
      }),
      providesTags: ["savedItems"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSavedItemsQuery } = savedItemsGetApi;
