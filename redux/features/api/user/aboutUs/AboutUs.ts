import { baseApi } from "../../baseApi";


export interface AboutUsData {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  main_img: string | null;
  inset_img: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface AboutUsResponse {
  success: boolean;
  data: AboutUsData;
}

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query<AboutUsResponse, void>({
      query: () => ({
        url: "/about-us",
        method: "GET",
      }),
      providesTags: ["AboutUs"], 
    }),
  }),
});

export const { useGetAboutUsQuery } = aboutUsApi;
