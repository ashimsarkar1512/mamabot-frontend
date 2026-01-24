"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { useResetPasswordMutation } from "@/redux/features/api/auth/authApi";
import { handleError, handleSuccess } from "@/lib/data/handdleError";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const otp = searchParams.get("otp"); // assuming OTP sent via query param

  // ✅ Use forgot password OTP verification mutation
  const [verifyForgotOtp, { isLoading }] = useResetPasswordMutation();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/login");
    }
  };

  const handleResetPassword = async () => {
    if (!email || !password || !passwordConfirmation) {
      return handleError(null, "All fields are required");
    }

    if (password !== passwordConfirmation) {
      return handleError(null, "Passwords do not match");
    }

    try {
      // ✅ Send reset password request
      const res = await verifyForgotOtp({ email, password, password_confirmation: passwordConfirmation, otp }).unwrap();
      handleSuccess(res.message || "Password reset successfully");

      // ✅ Navigate to login
      router.push("/login");
    } catch (error) {
      handleError(error, "Failed to reset password");
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
              alt="Reset Password"
              width={56}
              height={56}
            />
          </div>
          <h1 className="text-3xl text-gray-800 my-8">Reset Password</h1>
        </div>

        {/* Card */}
        <div className="bg-white/5 rounded-2xl border shadow-lg p-10">
          <p className="text-sm text-primary mb-8">
            Enter your email and new password to reset your account
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* New Password */}
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Reset Password Button */}
          <CommonButton
            className="w-full rounded-md"
            text={isLoading ? "Resetting..." : "Reset Password"}
            onClick={handleResetPassword}
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
