"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CommonButton from "@/components/ui/Reusable/CommonButton";

export default function AuthenticatePage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!password) return;

    const res = await fetch("/api/site-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Wrong access key");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      {/* Center Card */}
      <div className="w-full max-w-md text-center">
        {/* Header Icon */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/icon.png" // Replace with your key/lock icon
            alt="Access Key"
            width={56}
            height={56}
          />
        </div>

        <h1 className="text-3xl text-gray-800 mb-8">Enter Access Key</h1>

        {/* Card */}
        <div className="bg-white rounded-2xl border shadow-lg p-10">
          <p className="text-sm text-gray-600 mb-6">
            Please enter the access key to continue
          </p>

          {/* Password Input */}
          <input
            type="password"
            placeholder="Access Key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-8 px-4 py-3 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Submit Button */}
          <CommonButton
            className="w-full rounded-md"
            text="Continue"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
