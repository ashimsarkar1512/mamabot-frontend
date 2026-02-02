"use client";

import { useSubscribeNewsletterMutation } from "@/redux/features/api/user/Newsletter";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Newsletter = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  const handleSubmit = async () => {
    if (!firstName || !email) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const res = await subscribeNewsletter({
        first_name: firstName,
        email: email,
        source: "homepage",
        locale: "en",
      }).unwrap();

      toast.success(`Subscribed successfully! Welcome ${res.data.first_name}`);
      setFirstName("");
      setEmail("");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || "Subscription failed. Please try again.",
      );
    }
  };

  return (
    <div className="px-0 md:px-30">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-8 md:p-22 rounded-xl shadow-xl mb-6 md:mb-11">
        <h2 className="text-[32px] text-center mb-10">
          Subscribe to our <span className="text-primary">newsletter</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          {/* First name */}
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full md:w-[220px] h-[44px] px-5 rounded-full bg-[#FBE9F2] text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-[260px] h-[44px] px-5 rounded-full bg-[#FBE9F2] text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {/* Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-[44px] px-8 rounded-full bg-primary text-white text-base font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {isLoading ? "Subscribing..." : "Subscribe Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
