import { baseApi } from "../../baseApi";

export const personalizationSettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get personalization settings
    getPersonalization: builder.query({
      query: () => ({
        url: "/personalized-settings",
        method: "GET",
      }),
      providesTags: ["Personalize"],
    }),

    // Create or update personalization settings
    createPersonalization: builder.mutation({
      query: (body) => ({
        url: "/personalized-settings",
        method: "POST", 
        body,
      }),
      invalidatesTags: ["Personalize"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPersonalizationQuery,
  useCreatePersonalizationMutation,
} = personalizationSettingApi;

export default personalizationSettingApi;
