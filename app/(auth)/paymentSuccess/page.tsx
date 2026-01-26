"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your subscription is now active.
        </p>

        {/* Optional: Order info */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
          <p>
            <span className="font-medium">Transaction ID:</span> #123456789
          </p>
          <p>
            <span className="font-medium">Plan:</span> Premium Monthly
          </p>
          <p>
            <span className="font-medium">Amount Paid:</span> $29.99
          </p>
        </div>

        <Link href="/user-dashboard">
          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition-colors">
            Go to Dashboard
          </button>
        </Link>

        <Link href="/" className="block mt-4 text-gray-500 hover:text-gray-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
