import { baseApi } from "../../baseApi";

export interface OurJourneyItem {
  id: number;
  count: number;
  title: string;
  description: string;
  image_url_1: string | null;
  image_url_2: string | null;
  subtitle_1: string;
  subtitle_2: string;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface OurJourneyResponse {
  success: boolean;
  data: OurJourneyItem[];
}

export const ourJourneyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOurJourney: builder.query<OurJourneyResponse, void>({
      query: () => ({
        url: "/our-journey",
        method: "GET",
      }),
      providesTags: ["OurJourney"], 
    }),
  }),
});

export const { useGetOurJourneyQuery } = ourJourneyApi;
