"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import KHQrPayment from "@/components/KHQrPayment";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const totalAmount = Number(params.get("total") ?? 0);
  //   const billNumber = `ORDER-${Date.now()}`;

  const handlePaymentSuccess = () => {
    setShowSuccess(true);
  };

  const handleAlertConfirm = async () => {
    setShowSuccess(false);
    await Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: "Thank you! Your order has been placed successfully.",
      confirmButtonText: "OK",
    });
    router.push("/"); // redirect to home or order page
  };

  return (
    <>
      {/* Overlay + Checkout Modal */}
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
          {/* Close */}
          <button
            onClick={() => router.back()}
            className="absolute right-4 top-4 text-xl text-gray-500 hover:text-black"
          >
            ✕
          </button>

          {/* Header */}
          <h2 className="text-lg font-semibold text-center mb-4">
            Pay with KHQR (Bakong)
          </h2>

          {/* Amount */}
          <div className="text-center mb-4">
            <p className="text-gray-500 text-sm">Total Amount</p>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>

          {/* KHQR Payment */}
          <KHQrPayment amount={totalAmount} />

          {/* Done / Payment Confirm Button */}
          <button
            onClick={handlePaymentSuccess}
            className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            I've Paid
          </button>
        </div>
      </div>

      {/* Success SweetAlert */}
      {showSuccess && handleAlertConfirm()}
    </>
  );
}
