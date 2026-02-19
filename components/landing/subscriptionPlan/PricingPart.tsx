"use client";

import { Check } from "lucide-react";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useRouter } from "next/navigation";
import {
  useCreateCheckoutMutation,
  useGetPlansQuery,
} from "@/redux/features/api/user/subscription";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useGetUserDashboardQuery } from "@/redux/features/api/user/profile";
export default function PricingPart() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetPlansQuery();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const [createCheckout] = useCreateCheckoutMutation();
  const { data: userDashboardData, isLoading: isDashboardLoading } =
    useGetUserDashboardQuery(undefined, {
      skip: !isAuthenticated(),
    });

  function isAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!Cookies.get("token");
  }

  const handleCheckout = async (planId: number) => {
    if (!isAuthenticated()) {
      toast.error("Please login first to purchase a plan");
      router.push(`/login?redirect=/pricing`);
      return;
    }

    if (isDashboardLoading) {
      toast.info("Please wait, checking subscription status...");
      return;
    }

    // If user already subscribed to this plan
    if (userDashboardData?.data?.plan_id === planId) {
      toast.info("You already have this plan.");
      return;
    }

    try {
      setProcessingPlan(String(planId));
      const result = await createCheckout({ plan_id: String(planId) }).unwrap();
      if (result?.url) {
        window.location.href = result.url;
      } else {
        toast.error("Failed to start checkout. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.errors?.plan_id?.[0] ??
          "You already have an active subscription for this plan.",
      );
    } finally {
      setProcessingPlan(null);
    }
  };
  // Loading state
  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <p>Loading plans...</p>
      </div>
    );
  }

  // Error state
  if (isError || !data?.success) {
    return (
      <div className="py-16 text-center">
        <p>Failed to load subscription plans.</p>
      </div>
    );
  }

  const plans = data.data;
  const currentPlanId = userDashboardData?.data?.plan_id;
  return (
    <div id="pricing" className="py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-[32px] font-semibold ">
          Choose the <span className="text-primary">Plan</span> That Fits Your
          Journey
        </h2>
      </div>
      <div className="mb-5 md:mb-14 h-1 w-full mx-auto bg-[#BAE1F0] " />

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {plans.map((plan: any, index: number) => {
          const isCurrentPlan = plan.id === currentPlanId;
          return (
            <div
              key={index}
              className={`relative bg-white rounded-2xl border flex flex-col p-8 mt-16 transition-transform duration-300
    ${
      index === 1
        ? "scale-110 z-10 shadow-2xl border-pink-500"
        : "scale-100 shadow-lg border-gray-100"
    }
  `}
            >
              {/* Most Popular Badge + Arrow on First Plan */}
              {index === 0 && (
                <div className="">
                  <div className="absolute -top-14 right-15 flex items-center gap-2">
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
                  <div className="absolute -top-13 -right-12 font-medium text-pink-600">
                    Most popular!
                  </div>
                </div>
              )}
              {/* Price */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {plan.price}$/Month
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
                  isCurrentPlan
                    ? "Current Plan"
                    : currentPlanId
                      ? "Upgrade Plan"
                      : processingPlan === String(plan.id)
                        ? "Processing..."
                        : "Get Started"
                }
                disabled={isCurrentPlan || processingPlan === String(plan.id)}
                onClick={() => !isCurrentPlan && handleCheckout(plan.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
