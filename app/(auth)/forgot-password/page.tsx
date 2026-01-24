"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useForgotPasswordMutation } from "@/redux/features/api/auth/authApi";
import { handleError, handleSuccess } from "@/lib/data/handdleError";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  // ✅ Use forgot password mutation
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/login");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return;

    try {
      // ✅ Send forgot password request
      const res = await forgotPassword({ email }).unwrap();
      handleSuccess(res.message || "OTP sent to your email");

      // ✅ Navigate to OTP verification page
      router.push("/reset-password");
    } catch (error) {
      handleError(error, "Failed to send OTP");
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
              alt="Forgot Password"
              width={56}
              height={56}
            />
          </div>

          <h1 className="text-3xl text-gray-800 my-8">Forgot Password</h1>
        </div>

        {/* Card */}
        <div className="bg-white/5 rounded-2xl border shadow-lg p-10">
          <p className="text-sm text-primary mb-8">
            Enter your email to reset your password
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

          {/* ✅ Forgot Password Button */}
          <CommonButton
            className="w-full rounded-md"
            text={isLoading ? "Sending OTP..." : "Send Reset OTP"}
            onClick={handleForgotPassword}
          />

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-6">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="text-pink-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
