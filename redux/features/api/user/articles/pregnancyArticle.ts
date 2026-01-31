import { baseApi } from "../../baseApi";

// API slice for fetching articles
export const getArticlesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        url: "/articles/Typebase",
        method: "GET",
      }),
      providesTags: ["Articles"],
    }),

    getArticleById: builder.query({
      query: (id: number | string) => ({
        url: `/articles/${id}`,
        method: "GET",
      }),
      providesTags: ["Articles"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetArticlesQuery,useGetArticleByIdQuery } = getArticlesApi;

export default getArticlesApi;
