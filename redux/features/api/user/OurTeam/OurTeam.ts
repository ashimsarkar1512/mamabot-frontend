import { baseApi } from "../../baseApi";

export interface TeamMember {
  id: number;
  thumbnail_img: string | null;
  name: string;
  title: string;
  bio: string | null;
  fb_link: string | null;
  linkedin_link: string | null;
  twitter_link: string | null;
  long_description: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface OurTeamResponse {
  success: boolean;
  message: string;
  data: {
    teams: TeamMember[];
  };
}

export const ourTeamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOurTeam: builder.query<OurTeamResponse, void>({
      query: () => ({
        url: "/teams",
        method: "GET",
      }),
      providesTags: ["OurTeam"], 
    }),
  }),
});

export const { useGetOurTeamQuery } = ourTeamApi;
