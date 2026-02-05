import { baseApi } from "../../baseApi";

export interface SubscriptionUser {
  id: number;
  email: string;
  name: string;
  role: string;

  "subscription Plan": string;
  "plan id": number;

  invoice: string;
  currency: string;
  invoice_link: string;

  last_four_digits: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    user: SubscriptionUser;
  };
}

export const subscriptionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionByUser: builder.query<SubscriptionResponse, void>({
      query: () => ({
        url: "/check-subscription-by-user",
        method: "GET",
      }),
      providesTags: ["SubscriptionPlan"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSubscriptionByUserQuery } = subscriptionPlanApi;
