"use client";

import QRCode from "react-qr-code";

type Props = {
  amount: number;
};

export default function MockKHQRPayment({ amount }: Props) {
  // Mock KHQR payload based on official guidelines
  const khqrPayload = `
    000201
    010212
    29370016merchant@bank
    52040000
    5303840
    540${amount}
    5802KH
    5911Liikaa Store
    6009Phnom Penh
    6304FFFF
  `;

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCode value={khqrPayload.trim()} size={220} />

      <p className="text-sm text-red-500 font-medium text-center">
        Demo KHQR (Mock Payment)
      </p>
    </div>
  );
}
