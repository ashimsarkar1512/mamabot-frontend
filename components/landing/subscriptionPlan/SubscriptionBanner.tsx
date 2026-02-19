"use client";

import Image from "next/image";
import { beauRivage, comfortaa } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useGetUserDashboardQuery } from "@/redux/features/api/user/profile";
import { useCreateCheckoutMutation } from "@/redux/features/api/user/subscription";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
const SubscriptionBanner = () => {
   const router = useRouter();
  const { data: userDashboardData, isLoading: isDashboardLoading } =
    useGetUserDashboardQuery(undefined, { skip: !isAuthenticated() });
  const [createCheckout] = useCreateCheckoutMutation();
  const [processing, setProcessing] = useState(false);

  function isAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!Cookies.get("token");
  }

  const handleUpgrade = async () => {
    if (!isAuthenticated()) {
      toast.error("Please login first");
      router.push(`/login?redirect=/`);
      return;
    }

    if (isDashboardLoading) {
      toast.info("Checking your subscription...");
      return;
    }

    if (userDashboardData?.data?.plan_id) {
      toast.info("You already have a subscription.");
      return;
    }

    try {
      setProcessing(true);
      const result = await createCheckout({ plan_id: "1" }).unwrap(); // replace "1" with the plan id you want
      if (result?.url) {
        window.location.href = result.url;
      } else {
        toast.error("Failed to start checkout. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const hasSubscription = !!userDashboardData?.data?.plan_id;
  return (
    <section className="w-full ">
      <div className="mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left - Text Content */}
          <div className=" bg-[#ffffff]/25 border-2 shadow-md rounded-lg border-white! text-center p-3 md:p-6 lg:text-left">
            <div className="inline-block mb-6">
              <span
                className={`${beauRivage.className} text-2xl md:text-[26px] text-primary tracking-wide`}
              >
                Premium Experience
              </span>
            </div>

            <h2
              className={`text-2xl md:text-[40px] font-bold leading-tight mb-6 md:mb-8 ${comfortaa.className}`}
            >
              Upgrade to <span className="text-primary">Premium</span> Care,
              Because You Deserve More{" "}
              <span className="text-[#229ECF]">Support.</span>
            </h2>

            <p className="text-base md:text-lg text-[#677381] leading-relaxed mb-8 max-w-3xl mx-auto lg:mx-0">
              Mamabot Premium gives you deeper insights, expert-backed guidance,
              and complete peace of mind during every stage of motherhood.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start">
              <button
                className={`inline-flex cursor-pointer items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-[#229ECF] hover:opacity-80 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg ${
                  hasSubscription || processing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleUpgrade}
                disabled={hasSubscription || processing}
              >
                {hasSubscription
                  ? "✨ Already Subscribed"
                  : processing
                  ? "Processing..."
                  : "🌸 Upgrade Now"}
              </button>
            </div>
          </div>

          {/* Right - Images */}
          <div className="">
            <div className="">
              <Image
                src="/images/MotherBaby.png"
                alt="Mother with Baby"
                width={600}
                height={400}
                className="border-2 rounded-lg border-white! w-full h-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBanner;
