"use client";

import Link from "next/link";
import {Check, CircleDollarSign } from "lucide-react";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateCheckoutMutation,
  useGetGuestPlansQuery,
} from "@/redux/features/api/user/subscription";
import Loading from "@/components/Loading";
import { useGetUserDashboardQuery } from "@/redux/features/api/user/profile";
import Cookies from "js-cookie";

export default function PricingPricing() {
  const router = useRouter();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  // ✅ Fetch plans
  const { data: response, isLoading, isFetching } = useGetGuestPlansQuery();

  /* ✅ Checkout mutation */
  const [createCheckout] = useCreateCheckoutMutation();
  const { data: userDashboardData, isLoading: isDashboardLoading } =
    useGetUserDashboardQuery(undefined, {
      skip: !isAuthenticated(),
    });

  function isAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!Cookies.get("token");
  }

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const handleCheckout = async (planId: number) => {
    // ❌ NOT AUTHENTICATED
    if (!isAuthenticated()) {
      toast.error("Please login first to purchase a plan");

      // optional: redirect with callback
      router.push(`/login?redirect=/pricing`);
      return;
    }

    // ❌ PROFILE LOADING CHECK
    if (isDashboardLoading) {
      toast.info("Please wait, checking subscription status...");
      return;
    }

    // ❌ FREE PLAN CHECK (If user already has a plan)
    if (userDashboardData?.data?.plan_id) {
      toast.info("You already have an active subscription.");
      return;
    }

    try {
      setProcessingPlan(String(planId));

      const result = await createCheckout({
        plan_id: String(planId),
      }).unwrap();

      if (result?.url) {
        window.location.href = result.url;
      } else {
        toast.error("Failed to start checkout. Please try again.");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error(
        err?.data?.errors?.plan_id?.[0] ??
          "You already have an active subscription for this plan."
      );
    } finally {
      setProcessingPlan(null);
    }
  };


  if (isLoading || isFetching) return <Loading />;

  const plans = response?.data ?? [];

  return (
    <div className="py-20 px-4 bg-white/25 rounded-2xl border-2 !border-white shadow-lg my-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto my-10">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-pink-600 bg-pink-100 px-4 py-2 rounded-full mb-4">
          <CircleDollarSign size={20} />
          Pricing
        </span>

        <h1 className="text-xl md:text-4xl text-gray-900 mb-4">
          <span className="text-pink-600">Mamabot.de</span> — Pricing Plans
        </h1>

        <p className="max-w-2xl text-sm md:text-lg text-gray-500">
          Whether you’re expecting, a new mom, or exploring expert advice —
          Mamabot grows with you. Start free, and upgrade anytime for unlimited
          AI support and exclusive features.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
        {plans.map((plan: any, index: number) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl border flex flex-col p-3 md:p-8 mt-6 md:mt-16 transition-transform duration-300
              ${
                index === 1
                  ? "md:scale-110 z-10 shadow-2xl border-pink-500"
                  : "scale-100 shadow-lg border-gray-100"
              }`}
          >
            {/* Most Popular */}
            {index === 0 && (
              <>
                <div className="absolute -right-15 -top-14 md:-top-14 md:right-15">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-pink-600"
                  >
                    <path
                      d="M30 6C18 6 14 18 6 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10 24L6 24L6 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="absolute md:-top-13 -top-14 right-12 md:-right-12 font-medium text-pink-600">
                  Most popular!
                </div>
              </>
            )}

            {/* Price */}
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              ${plan.price}/mth
            </h2>

            <h3 className="font-semibold text-gray-800 mb-2">{plan.name}</h3>

            <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {(plan.features ?? []).map((feature: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600">
                    <Check size={14} />
                  </span>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <CommonButton
              className="w-full rounded-md"
              text={
                processingPlan === String(plan.id)
                  ? "Processing..."
                  : "Get started"
              }
              disabled={processingPlan === String(plan.id)}
              onClick={() => handleCheckout(plan.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
