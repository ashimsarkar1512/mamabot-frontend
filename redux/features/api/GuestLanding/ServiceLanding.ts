import { baseApi } from "@/redux/features/api/baseApi";

export interface ServiceLanding {
  id: number;
  thumbnail_img: string | null;
  main_img: string | null;
  title: string;
  slug: string;
  description: string;
  btn_text: string;
  btn_link: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceLandingResponse {
  success: boolean;
  data: ServiceLanding[];
}

export const serviceLandingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLandingServices: builder.query<ServiceLandingResponse, void>({
      query: () => ({
        url: "/services/landing/page",
        method: "GET",
      }),
      providesTags: ["ServiceLanding"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetLandingServicesQuery } = serviceLandingApi;
