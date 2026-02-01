import { baseApi } from "@/redux/features/api/baseApi";

export interface Testimonial {
  id: number;
  image: string;
  description: string;
  author_name: string;
  author_title: string;
  address: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface RandomTestimonialsResponse {
  success: boolean;
  message: string;
  data: Testimonial[];
}

export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRandomTestimonials: builder.query<RandomTestimonialsResponse, void>({
      query: () => ({
        url: "/testimonials/random",
        method: "GET",
      }),
      providesTags: ["testimonials"],
    }),
  }),
});

export const { useGetRandomTestimonialsQuery } = testimonialsApi;
