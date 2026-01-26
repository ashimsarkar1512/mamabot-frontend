"use client";

import { ArrowLeft, Check, CircleDollarSign } from "lucide-react";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useRouter } from "next/navigation";
import { useCreateCheckoutMutation } from "@/redux/features/api/user/subscription";
import { useState } from "react";

const plans = [
  {
    id: "1",
    price: "$10/mth",
    title: "Basic plan",
    description: "Perfect for first-time users who want to explore Mamabot.",
    features: [
      "10 AI chatbot questions per day",
      "Personalized answers based on your pregnancy stage",
      "Access to selected blog articles",
      "Weekly newsletter with tips & updates",
      "GDPR-compliant data control",
    ],
  },
  {
    id: "2",
    price: "$20/mth",
    title: "Business plan",
    description:
      "Unlimited AI conversations, deep personalization, and full community access.",
    features: [
      "Unlimited AI chats (GPT-4)",
      "Extended memory & personalization",
      "Pregnancy & baby milestone tracking",
      "Full community access (post, reply, badges)",
      "Smart product recommendations",
      "Save & export chat history",
    ],
  },
  {
    id: "3",
    price: "$40/mth",
    title: "Enterprise plan",
    description:
      "Your full motherhood companion — 12 months of unlimited support.",
    features: [
      "Everything in Premium Monthly",
      "Exclusive early access to new features",
      "Priority community badges",
      "Yearly wellness summary report (PDF)",
      "Lifetime access to milestone tracker",
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [createCheckout] = useCreateCheckoutMutation();

  // Track which plan is currently being processed
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleCheckout = async (planId: string) => {
    try {
      setProcessingPlan(planId); // mark this plan as processing
      console.log("Sending checkout for plan_id:", planId);

      const result = await createCheckout({ plan_id: planId }).unwrap();
      console.log("Checkout result:", result);

      if (result.url) {
        window.location.href = result.url; // redirect to Stripe
      } else {
        alert("Failed to start checkout. Please try again.");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(
        error?.data?.errors?.plan_id
          ? `Checkout error: ${error.data.errors.plan_id[0]}`
          : "Something went wrong. Please try again."
      );
    } finally {
      setProcessingPlan(null); // reset after request completes
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 relative">
      {/* Back Button */}
      <div onClick={handleBack} className="absolute top-8 left-8">
        <button className="border p-1 rounded-full border-pink-600 cursor-pointer">
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
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl border flex flex-col p-8 mt-16 transition-transform duration-300 ${
              index === 1
                ? "scale-110 z-10 shadow-2xl border-pink-500"
                : "scale-100 shadow-lg border-gray-100"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{plan.price}</h2>
            <h3 className="font-semibold text-gray-800 mb-2">{plan.title}</h3>
            <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600">
                    <Check size={14} />
                  </span>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <CommonButton
              className="w-full rounded-md"
              text={processingPlan === plan.id ? "Processing..." : "Get started"}
              onClick={() => handleCheckout(plan.id)}
              disabled={processingPlan === plan.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
