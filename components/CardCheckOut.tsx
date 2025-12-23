"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
    product: {
        name: string;
        image: string;
        price: number;
        rating: number;
    } | null;
    isOpen: boolean;
    onClose: () => void;
    onRmove: () => void;
};

export default function CartDrawer({ product, isOpen, onClose, onRmove }: Props) {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    // Reset quantity when new product opens
    useEffect(() => {
        if (product) {
            setQuantity(1);
        }
    }, [product]);

    const increaseQty = () => setQuantity((q) => q + 1);
    const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const totalPrice = product ? (product.price * quantity).toFixed(2) : "0.00";

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {product && (
                    <div className="p-6 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Your Cart</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-black text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Product Info */}
                        <div className="flex gap-4 mb-6">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="rounded-md object-cover"
                            />

                            <div className="flex-1">
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-gray-500 text-sm">
                                    Rating: {product.rating}/5
                                </p>
                                <p className="text-lg font-bold mt-1">${product.price}</p>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 mt-3">
                                    <button
                                        onClick={decreaseQty}
                                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                                    >
                                        −
                                    </button>

                                    <span className="min-w-6 text-center font-medium">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={increaseQty}
                                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => {
                                            onRmove?.();
                                            onClose();
                                        }}
                                        className="ml-3 flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                                    >
                                        {/* Trash icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                                            />
                                        </svg>

                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Spacer */}
                        <div className="grow" />

                        {/* Total */}
                        <div className="mb-4 flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>

                        {/* Checkout */}
                        <button
                            onClick={() => router.push(`/checkout?total=${totalPrice}`)}
                            className="w-full bg-black text-white py-3 rounded-md text-sm hover:bg-gray-800 transition"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
