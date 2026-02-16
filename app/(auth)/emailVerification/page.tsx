"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useVerifyEmailMutation } from "@/redux/features/api/auth/authApi";
import { handleError, handleSuccess } from "@/lib/data/handdleError";

export default function EmailVerificationPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/login");
    }
  };

  const handleVerify = async () => {
    if (!email) return;

    try {
      const res = await verifyEmail({ email }).unwrap();
 handleSuccess(res.message || "Otp send your email");
 

      // ✅ OTP sent → go to next step
      router.push(`/verification?email=${encodeURIComponent(email)}`)
    } catch (error) {
      handleError(error, "OTP send failed:");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      {/* Back Button */}
      <div onClick={handleBack} className="absolute top-8 left-8">
        <button className="border p-1 rounded-full border-pink-600 cursor-pointer">
          <ArrowLeft className="text-pink-500" size={18} />
        </button>
      </div>

      <div className="w-full max-w-2xl text-center">
        {/* Header */}
        <div>
          <div className="flex justify-center mb-4">
            <Image
              src="/images/icon.png"
              alt="Verification"
              width={56}
              height={56}
            />
          </div>

          <h1 className="text-3xl text-gray-800 my-8">
            Verification
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white/5 rounded-2xl border shadow-lg p-10">
          <p className="text-sm text-primary mb-8">
            Enter your email to verify your account
          </p>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-8 px-4 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* ✅ Verify Button (API call) */}
          <CommonButton
            className="w-full rounded-md"
            text={isLoading ? "Sending OTP..." : "Verify Now"}
            onClick={handleVerify}
           
          />

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-6">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="text-pink-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
