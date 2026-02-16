import { baseApi } from "../../baseApi";

export interface SmartPersonalizationPayload {
  AI_tone?: string;
  chatbot_speed?: string;
  background_sound?: string;
  motherhood_context?: number | string;
  activity_awareness?: number | string;
  personalized_nutrition?: number | string;
  reminder_style?: string;
  mood_tracking?: number | string;
  voice_feedback?: number | string;
  analytics_cookies?: number | string;
  two_factor_auth?: number | string;
}

export interface SmartPersonalizationResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    user_id: number;
    AI_tone?: string;
    chatbot_speed?: string;
    background_sound?: string;
    motherhood_context?: number | string;
    activity_awareness?: number | string;
    personalized_nutrition?: number | string;
    reminder_style?: string;
    mood_tracking?: number | string;
    voice_feedback?: number | string;
    analytics_cookies?: number | string;
    two_factor_auth?: number | string;
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

export const smartPersonalizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSmartPersonalization: builder.query<SmartPersonalizationResponse, void>({
      query: () => ({
        url: "/smart-personalized-settings",
        method: "GET",
      }),
      providesTags: ["SmartPersonalization"],
    }),

    updateSmartPersonalization: builder.mutation<
      SmartPersonalizationResponse,
      SmartPersonalizationPayload
    >({
      query: (body) => ({
        url: "/smart-personalized-settings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SmartPersonalization"],
    }),
  }),
});

export const {
  useGetSmartPersonalizationQuery,
  useUpdateSmartPersonalizationMutation,
} = smartPersonalizationApi;
