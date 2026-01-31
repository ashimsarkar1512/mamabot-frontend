"use client";

import { ArrowLeft, Check, CircleDollarSign } from "lucide-react";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useRouter } from "next/navigation";
import { useCreateCheckoutMutation, useGetPlansQuery, Plan } from "@/redux/features/api/user/subscription";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function PricingPage() {
  const router = useRouter();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  // Fetch subscription plans
  const { data: response, isLoading, isFetching, error } = useGetPlansQuery();

  const [createCheckout] = useCreateCheckoutMutation();

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const handleCheckout = async (planId: string | number) => {
    try {
      setProcessingPlan(String(planId));
      const result = await createCheckout({ plan_id: String(planId) }).unwrap();
      if (result.url) window.location.href = result.url;
      else alert("Failed to start checkout. Please try again.");
    } catch (err: any) {
      console.error("Checkout error:", err);
      alert(
        err?.data?.errors?.plan_id
          ? `Checkout error: ${err.data.errors.plan_id[0]}`
          : "Something went wrong. Please try again."
      );
    } finally {
      setProcessingPlan(null);
    }
  };

  if (isLoading || isFetching) return <Loading/>;

  if (error) return <p className="text-center mt-20 text-red-500">Failed to load plans</p>;

  // Extract plans array from response
  const safePlans: Plan[] = response?.data ?? [];

  return (
    <div className="min-h-screen px-6 py-10 relative">
      {/* Back Button */}
     <div onClick={handleBack} className="absolute top-8 left-8">
        <button className="border p-1 rounded-full border-pink-600! cursor-pointer">
          <ArrowLeft className="text-pink-500" size={18} />
        </button>
      </div>
      {/* Header */}
      <div className="max-w-6xl mx-auto my-10">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-pink-600 bg-pink-100 px-4 py-2 rounded-full mb-4">
          <CircleDollarSign size={20} /> Pricing
        </span>

        <h1 className="text-3xl md:text-4xl text-gray-900 mb-4">
          <span className="text-pink-600">Mamabot.de</span> — Pricing Plans
        </h1>

        <p className="max-w-2xl text-gray-500">
          Whether you’re expecting, a new mom, or exploring expert advice —
          Mamabot grows with you. Start free, and upgrade anytime for unlimited
          AI support and exclusive features.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {safePlans.length > 0 ? (
          safePlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border flex flex-col p-8 mt-16 transition-transform duration-300 ${
                index === 1
                  ? "scale-110 z-10 shadow-2xl border-pink-500"
                  : "scale-100 shadow-lg border-gray-100"
              }`}
            >
              {/* Most Popular Badge on first plan */}
              {index === 0 && (
                <div>
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
                ${plan.price}/{plan.billing_cycle}
              </h2>

              {/* Plan name */}
              <h3 className="font-semibold text-gray-800 mb-2">{plan.name}</h3>

              <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {(plan.features || []).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600">
                      <Check size={14} />
                    </span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Checkout Button */}
              <CommonButton
                className="w-full rounded-md"
                text={processingPlan === String(plan.id) ? "Processing..." : "Get started"}
                onClick={() => handleCheckout(plan.id)}
                disabled={processingPlan === String(plan.id)}
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">No plans available</p>
        )}
      </div>
    </div>
  );
}
