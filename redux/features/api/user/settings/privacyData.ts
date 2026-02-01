import { baseApi } from "../../baseApi";

export interface PrivacyDataSettingsPayload {
  analytics_cookies: number | string;
  two_factor_auth: number | string;
}

export interface PrivacyDataSettingsResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    analytics_cookies: string | number;
    two_factor_auth: string | number;
    created_at?: string;
    updated_at?: string;
    user?: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

export const privacyDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyDataSettings: builder.query<PrivacyDataSettingsResponse, void>({
      query: () => ({
        url: "/privacy-data-settings",
        method: "GET",
      }),
      providesTags: ["PrivacyData"],
    }),

    createPrivacyDataSettings: builder.mutation<
      PrivacyDataSettingsResponse,
      PrivacyDataSettingsPayload
    >({
      query: (body) => ({
        url: "/privacy-data-settings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PrivacyData"],
    }),
  }),
});

export const {
  useGetPrivacyDataSettingsQuery,
  useCreatePrivacyDataSettingsMutation,
} = privacyDataApi;
