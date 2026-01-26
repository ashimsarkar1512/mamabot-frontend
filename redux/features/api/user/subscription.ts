import { baseApi } from "../baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch subscription plans
    getPlans: builder.query<{ plans: any[] }, void>({
      query: () => ({
        url: "/subscription-plans",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // Create Stripe checkout
    createCheckout: builder.mutation<{ url: string }, { plan_id: string }>({
      query: (body) => ({
        url: "/subscription-checkout",
        method: "POST",
        body, // sends { plan_id: "1" }
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetPlansQuery, useCreateCheckoutMutation } = subscriptionApi;
