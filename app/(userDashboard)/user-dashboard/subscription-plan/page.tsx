"use client";

import { comfortaa } from "@/app/fonts";
import CheckOut from "@/components/landing/subscriptionPlan/Checkout";
import Faq from "@/components/landing/subscriptionPlan/Faq";
import PricingPart from "@/components/landing/subscriptionPlan/PricingPart";
import SubscriptionBanner from "@/components/landing/subscriptionPlan/SubscriptionBanner";
import SubscriptionFooter from "@/components/landing/subscriptionPlan/SubscriptionFooter";
import WhyMamabot from "@/components/landing/subscriptionPlan/WhyMamabot";


const Page = () => {
  return (
    <div className={`pt-6 md:pt-12 ${comfortaa.className} space-y-7 md:space-y-24`}>
      
      <SubscriptionBanner/>
      <WhyMamabot/>
      <PricingPart/>
      <SubscriptionFooter/>
      <CheckOut/>
      <Faq/>
    </div>
  );
};

export default Page;
