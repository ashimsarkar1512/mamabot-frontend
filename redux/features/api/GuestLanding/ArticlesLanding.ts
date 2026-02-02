import { baseApi } from "../baseApi";

export interface ArticleAuthor {
  id: number;
  first_name: string;
  email: string;
}

export interface ArticleCategory {
  id: number;
  title: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  author_id: number;
  phase_type: string;
  delivery_type: string | null;
  week: number | null;
  short_description: string;
  long_description: string;
  author_name: string | null;
  read_duration: string;
  thumb_img: string | null;
  main_img: string | null;
  status: string;
  feature_status: number;
  response_time: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  meta_image: string | null;
  google_schema: string | null;
  created_at: string;
  updated_at: string;
  author: ArticleAuthor | null;
  category: ArticleCategory | null;
}

export interface LatestArticlesResponse {
  success: boolean;
  message: string;
  data: Article[];
}

export const articleLandingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLatestArticles: builder.query<LatestArticlesResponse, void>({
      query: () => ({
        url: "/articles/latest",
        method: "GET",
      }),
      providesTags: ["Articles"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetLatestArticlesQuery } = articleLandingApi;
