import { baseApi } from "./baseApi";

export interface FooterPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  meta_image: string | null;
  is_active: boolean;
  is_indexable: boolean;
  created_at: string;
  updated_at: string;
}

export const footerPagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFooterPages: builder.query<
      { success: boolean; data: FooterPage[] },
      void
    >({
      query: () => "/pages",
      providesTags: ["FooterPages"],
    }),
    getFooterPageBySlug: builder.query<
      { success: boolean; data?: FooterPage; message?: string },
      string
    >({
      query: (slug) => `/pages/${slug}`,
      providesTags: ["FooterPages"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetFooterPagesQuery, useGetFooterPageBySlugQuery } =
  footerPagesApi;
