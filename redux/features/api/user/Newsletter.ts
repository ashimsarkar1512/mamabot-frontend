import { baseApi } from "../baseApi";

export interface NewsletterSubscribePayload {
  first_name: string;
  email: string;
  source?: string;
  locale?: string;
}

export interface NewsletterSubscribeResponse {
  success: boolean;
  data: {
    id: number;
    first_name: string;
    email: string;
    subscribed_at: string;
    is_active: boolean;
    locale: string;
    source: string;
  };
}

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<
      NewsletterSubscribeResponse,
      NewsletterSubscribePayload
    >({
      query: (body) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Newsletter"],
    }),
  }),
});

export const { useSubscribeNewsletterMutation } = newsletterApi;
