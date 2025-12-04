"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 ,Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your order. We've received your payment and your order is being processed.
          </p>
        </div>
        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full py-6">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/profile?tab=Orders" className="w-full">
            <Button className="w-full py-6">
              <ShoppingBag className="mr-2 h-5 w-5" />
              View My Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}