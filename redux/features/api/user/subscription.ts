import { baseApi } from "../baseApi";

export interface Plan {
  id: string | number;
  name: string;
  price: number;
  billing_cycle: string;
  description: string;
  features: string[];
}

// API response type
interface PlansResponse {
  success: boolean;
  data: Plan[];
}

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query<PlansResponse, void>({
      query: () => ({
        url: "/subscription-plans",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getGuestPlans: builder.query<PlansResponse, void>({
      query: () => ({
        url: "/guest-subscription-plan",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    createCheckout: builder.mutation<{ url: string }, { plan_id: string }>({
      query: (body) => ({
        url: "/subscription-checkout",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    successPayment: builder.query({
      query: () => ({
        url: "/payment-info-by-user",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPlansQuery,
  useCreateCheckoutMutation,
  useSuccessPaymentQuery,
  useGetGuestPlansQuery,
} = subscriptionApi;
