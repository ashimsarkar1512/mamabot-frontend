"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CommonButton from "@/components/ui/Reusable/CommonButton";

export default function VerificationPage() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      {/* Back Button */}
     
      <div onClick={handleBack} className="absolute top-8 left-8 ">
        <button className="border p-1 rounded-full  border-pink-600! cursor-pointer">
          <ArrowLeft className="text-pink-500" size={18} />
        </button>
      </div>
      <div className=" w-full max-w-2xl text-center">
        <div>
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/icon.png"
              alt="Verification"
              width={56}
              height={56}
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl  text-gray-800 my-8">
            Verification
          </h1>
        </div>

        {/* Card */}
        <div className=" bg-white/5 rounded-2xl border shadow-lg p-10 ">
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
                className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            ))}
          </div>

          {/* Verify Button */}

        <Link href='/pricing'>
          <CommonButton className="w-full rounded-md" text="Verify Now" />
        </Link>

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
