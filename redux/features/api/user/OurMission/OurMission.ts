import { baseApi } from "../../baseApi";

export interface Mission {
  id: number;
  title: string;
  description: string;
  icon_url: string | null;
  sort_order: number;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface MissionsResponse {
  success: boolean;
  data: Mission[];
}

export const ourMissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMissions: builder.query<MissionsResponse, void>({
      query: () => ({
        url: "/missions",
        method: "GET",
      }),
      providesTags: ["OurMission"],
    }),
  }),
});

export const { useGetMissionsQuery } = ourMissionApi;
