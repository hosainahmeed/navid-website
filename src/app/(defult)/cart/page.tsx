"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { cartResponse, Item } from "@/app/types/cart";
import { mockCartData } from "@/app/lib/mockCartData";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const Divider = ({ className }: { className?: string }) => (
  <div className={cn("h-[1px] w-full bg-gray-300 my-3", className)} />
);

const CartPage = () => {
  const [cart, setCart] = useState<cartResponse>(mockCartData);
  const increaseQuantity = (id: string) => {
    const updatedItems = cart.items.map((item) =>
      item._id === id
        ? {
          ...item,
          quantity: item.quantity + 1,
          price: (item.quantity + 1) * item.product_id.price,
        }
        : item
    );
    updateCartTotals(updatedItems);
  };


  const decreaseQuantity = (id: string) => {
    const updatedItems = cart.items.map((item) =>
      item._id === id && item.quantity > 1
        ? {
          ...item,
          quantity: item.quantity - 1,
          price: (item.quantity - 1) * item.product_id.price,
        }
        : item
    );
    updateCartTotals(updatedItems);
  };


  const removeItem = (id: string) => {
    const updatedItems = cart.items.filter((item) => item._id !== id);
    updateCartTotals(updatedItems);
  };


  const updateCartTotals = (updatedItems: Item[]) => {
    const total_quantity = updatedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const total_price = updatedItems.reduce((sum, item) => sum + item.price, 0);
    setCart({
      ...cart,
      items: updatedItems,
      total_quantity,
      total_price,
    });
  };


  const handleCheckout = () => {
    const payload = {
      price_data: cart.items.map((item) => ({
        name: item.product_id.name,
        unit_amount: item.product_id.price,
        quantity: item.quantity,
        _id: item.product_id._id,
      })),
      purpose: "buy_product",
      currency: "USD",
    };
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");

    console.log("🧾 Checkout Payload:", payload);
  };

  const { items, total_price } = cart;
  const shippingCharge = total_price < 50 ? 0 : 15;

  return (
    <div className="max-w-screen-2xl mx-auto grid md:grid-cols-3 gap-6 py-10">
      <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-6 uppercase text-gray-900">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {items.length <= 0 ?
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-900 font-bold text-2xl mb-2">Your cart is empty</p>
              <Link href={'/'}>
                <Button>Continue Shopping</Button>
              </Link>
            </div>
            : items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-4 relative"
              >
                <button
                  onClick={() => removeItem(item._id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-gray-900 hover:bg-[var(--color-primary)] transition"
                >
                  <X className="text-white w-4 h-4" />
                </button>

                <Image
                  src={item.product_id.product_image}
                  alt={item.product_id.name}
                  width={200}
                  height={200}
                  className="w-40 h-40 object-cover rounded-xl"
                />

                <div className="flex flex-col gap-2 w-full">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase">
                    {item.product_id.name}
                  </h2>
                  <p className="text-gray-700 font-medium">
                    Price:{" "}
                    <span className="font-semibold text-gray-900">
                      ${item.product_id.price}
                    </span>
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="p-1 rounded-full border border-[var(--border-color)] hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="p-1 rounded-full border border-[var(--border-color)] hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-700 font-medium mt-1">
                    Item Total:{" "}
                    <span className="font-semibold text-gray-900">
                      ${item.price}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-[#F2F2F2] p-6 rounded-2xl shadow-sm border border-[var(--border-color)]">
        <h2 className="text-3xl font-bold uppercase mb-4 text-gray-900">
          Order Summary
        </h2>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-lg text-gray-800"
            >
              <span>{item.product_id.name}</span>
              <span>${item.product_id.price}</span>
            </div>
          ))}
        </div>

        <Divider />

        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Subtotal</span>
          <span>${total_price}</span>
        </div>

        <div className="flex justify-between text-gray-700 text-sm mt-1">
          <span>Sales Tax (Included)</span>
          <span>$0</span>
        </div>

        <div
          className={cn(
            "flex justify-between text-lg mt-2 font-semibold",
            total_price < 50 && "line-through text-gray-500"
          )}
        >
          <span>Shipping Charge</span>
          <span>${shippingCharge}</span>
        </div>

        <Divider />

        <div className="flex justify-between text-2xl font-bold text-gray-900 mt-3">
          <span>Total</span>
          <span>${total_price + shippingCharge}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-gray-900 hover:bg-[var(--color-primary)] cursor-pointer text-white font-bold py-3 rounded uppercase transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
