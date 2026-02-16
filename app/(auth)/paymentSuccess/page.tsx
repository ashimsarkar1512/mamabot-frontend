"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSuccessPaymentQuery } from "@/redux/features/api/user/subscription";
import Loading from "@/components/Loading";

export default function PaymentSuccess() {
  const { data, isLoading, isError } = useSuccessPaymentQuery(undefined);

  if (isLoading)<Loading/>

  if (isError || !data?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load payment information</p>
      </div>
    );
  }

  const payment = data.data;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4 animate-bounce" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your subscription is now active.
        </p>

        {/* Dynamic Payment Info */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left space-y-1">
          <p>
            <span className="font-medium">Invoice:</span>{" "}
            {payment.invoice}
          </p>

          <p>
            <span className="font-medium">Amount Paid:</span>{" "}
            {payment.amount} {payment.currency}
          </p>

          <p>
            <span className="font-medium">Payment ID:</span>{" "}
            #{payment.id}
          </p>
        </div>

        <Link href="/user-dashboard">
          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition-colors">
            Go to Dashboard
          </button>
        </Link>

        <Link
          href="/"
          className="block mt-4 text-gray-500 hover:text-gray-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
