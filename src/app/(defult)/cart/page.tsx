"use client";
import React from "react";
import Image from "next/image";
import { X, Plus, Minus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "@/app/redux/services/cartApis";
import { imageUrl } from "@/app/utils/imagePreview";

const Divider = ({ className }: { className?: string }) => (
  <div className={cn("h-[1px] w-full bg-gray-300 my-3", className)} />
);

const CartPage = () => {
  const { data: cartResponse, isLoading } = useGetAllCartQuery(undefined);
  const [deleteCartMutation, { isLoading: deleteLoading }] = useDeleteCartMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold text-gray-700">
        Loading Cart...
      </div>
    );
  }

  const cartData = cartResponse?.data;
  const items = cartData?.items || [];

  const removeItem = async (id: string) => {
    console.log(id)
    try {
      const res = await deleteCartMutation(id).unwrap();
      if (!res?.success) throw new Error(res?.message);
      alert(res?.message);
    } catch (error) {
      console.log(error);
    }
  };


  const increaseQuantity = (id: string) => {
    console.log("Increase quantity for:", id);
  };

  const decreaseQuantity = (id: string) => {
    console.log("Decrease quantity for:", id);
  };

  const handleCheckout = () => {
    const payload = {
      price_data: items.map((item: any) => ({
        name: item?.product_id?.name,
        unit_amount: item?.product_id?.price,
        quantity: item?.quantity,
        _id: item?.product_id?._id,
      })),
      purpose: "buy_product",
      currency: "USD",
    };
    console.log("🧾 Checkout Payload:", payload);
  };

  const shippingCharge = cartData?.total_price < 50 ? 0 : 15;

  return (
    <div className="max-w-screen-2xl border-x border-[var(--border-color)] mx-auto grid md:grid-cols-3 py-10">

      <div className="md:col-span-2 bg-white border-y border-[var(--border-color)]">
        <h1 className="text-3xl font-bold mb-6 bg-[#EDEDED] border-b border-[var(--border-color)] p-6 uppercase text-gray-900">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-900 font-bold text-2xl mb-2">
                Your cart is empty
              </p>
              <Link href={"/"}>
                <Button className="rounded-none bg-[var(--purple-light)] hover:bg-[var(--color-primary)]">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            items.map((item: any) => (
              <div
                key={item?._id}
                className="flex p-2 last:border-b-0 border-b flex-col sm:flex-row items-center sm:items-start gap-6 relative"
              >

                <button
                  onClick={() => removeItem(item?.product_id?._id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-gray-900 hover:bg-[var(--color-primary)] transition"
                >
                  {deleteLoading ? <Loader2 className="text-white w-4 h-4 animate-spin" /> : <X className="text-white w-4 h-4" />}
                </button>


                <Image
                  src={imageUrl({ image: item?.variant })}
                  alt={item?.product_id?.name}
                  width={200}
                  height={200}
                  className="w-40 h-40 object-cover"
                />


                <div className="flex flex-col gap-2 w-full">
                  <h2 className="text-2xl font-bold text-gray-900 uppercase">
                    {item?.product_id?.name}
                  </h2>
                  <p className="text-gray-700 font-medium">
                    Size:{" "}
                    <span className="font-semibold text-gray-900">
                      {item?.size}
                    </span>
                  </p>
                  <p className="text-gray-700 font-medium">
                    Price:{" "}
                    <span className="font-semibold text-gray-900">
                      ${item?.product_id?.price}
                    </span>
                  </p>


                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item?._id)}
                      className="p-1 rounded-full border border-[var(--border-color)] hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {item?.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item?._id)}
                      className="p-1 rounded-full border border-[var(--border-color)] hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-700 font-medium mt-1">
                    Item Total:{" "}
                    <span className="font-semibold text-gray-900">
                      ${item?.price}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>


      <div className="bg-[#F2F2F2] p-6 border border-[var(--border-color)]">
        <h2 className="text-3xl font-bold uppercase mb-4 text-gray-900">
          Order Summary
        </h2>

        <div className="space-y-2">
          {items.map((item: any) => (
            <div
              key={item?._id}
              className="flex justify-between text-lg text-gray-800"
            >
              <span>{item?.product_id?.name}</span>
              <span>${item?.price}</span>
            </div>
          ))}
        </div>

        <Divider />

        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Subtotal</span>
          <span>${cartData?.total_price}</span>
        </div>

        <div className="flex justify-between text-gray-700 text-sm mt-1">
          <span>Sales Tax (Included)</span>
          <span>$0</span>
        </div>

        <div
          className={cn(
            "flex justify-between text-lg mt-2 font-semibold",
            cartData?.total_price < 50 && "line-through text-gray-500"
          )}
        >
          <span>Shipping Charge</span>
          <span>${shippingCharge}</span>
        </div>

        <Divider />

        <div className="flex justify-between text-2xl font-bold text-gray-900 mt-3">
          <span>Total</span>
          <span>${cartData?.total_price + shippingCharge}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full rounded-none bg-[var(--purple-light)] hover:bg-[var(--color-primary)] cursor-pointer text-white font-bold py-3 uppercase transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
