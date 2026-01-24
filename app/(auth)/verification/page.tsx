"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CommonButton from "@/components/ui/Reusable/CommonButton";
import { handleError, handleSuccess } from "@/lib/data/handdleError";
import { useVerifyOtpMutation } from "@/redux/features/api/auth/authApi";

export default function VerificationPage() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  console.log(email, "email");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (!email) {
      handleError(null, "Email not found");
      return;
    }

    const otp = code.join("");

    if (otp.length !== 6) {
      handleError(null, "Please enter 6 digit OTP");
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        otp,
      }).unwrap();

      handleSuccess(res.message || "OTP verified successfully");

      router.push("/login");
    } catch (error) {
      handleError(error, "OTP verification failed");
    }
  };

  // 🔥 NEW: handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newCode = pastedData.split("");
    setCode((prev) => prev.map((_, index) => newCode[index] || ""));

    const lastIndex = newCode.length - 1;
    document.getElementById(`otp-${lastIndex}`)?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <div onClick={() => router.back()} className="absolute top-8 left-8">
        <button className="border p-1 rounded-full border-pink-600">
          <ArrowLeft className="text-pink-500" size={18} />
        </button>
      </div>

      <div className="w-full max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/icon.png"
            alt="Verification"
            width={56}
            height={56}
          />
        </div>

        <h1 className="text-3xl text-gray-800 my-8">Verification</h1>

        <div className="bg-white/5 rounded-2xl border shadow-lg p-10">
          <p className="text-sm text-primary mb-8">
            Enter Verification Code Sent To Your Email
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onPaste={handlePaste} // ✅ important
                className="w-12 h-12 text-center text-lg font-medium border rounded-lg focus:ring-2 focus:ring-pink-400"
              />
            ))}
          </div>

          <CommonButton
            className="w-full rounded-md"
            text={isLoading ? "Verifying..." : "Verify Now"}
            onClick={handleVerifyOtp}
          />
        </div>
      </div>
    </div>
  );
}
