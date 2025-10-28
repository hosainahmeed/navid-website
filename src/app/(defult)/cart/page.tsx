"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useDeleteCartMutation,
  useGetAllCartQuery,
  useCreateCartMutation,
} from "@/app/redux/services/cartApis";
import { imageUrl } from "@/app/utils/imagePreview";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CheckoutAddressModal } from "@/app/components/checkout/CheckoutAddressModal";
import { IMAGE } from "@/app/constants/Image.index";

const Divider = ({ className }: { className?: string }) => (
  <div className={cn("h-[1px] w-full bg-gray-300 my-3", className)} />
);

const CartPage = () => {
  const { data: cartResponse, isLoading } = useGetAllCartQuery(undefined);
  const [deleteCartMutation, { isLoading: deleteLoading }] = useDeleteCartMutation();
  const [createCartMutation] = useCreateCartMutation();
  const router = useRouter();
  const [optimisticQuantities, setOptimisticQuantities] = useState<Record<string, number>>({});
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

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
      toast.success(res?.message || "Item removed from cart");
    } catch (error: any) {
      if (error?.status === 403) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        router.push("/auth/sign-in");
      } else {
        toast.error(error?.message || error?.data?.message || "Failed to remove item");
      }
      console.log(error);
    }
  };


  const increaseQuantity = async (itemId: string) => {
    const item = items.find((i: any) => i._id === itemId);
    if (!item) return;

    const currentQuantity = optimisticQuantities[itemId] ?? item.quantity;
    const newQuantity = currentQuantity + 1;

    // Check if exceeds available stock
    if (newQuantity > item.product_id?.quantity) {
      toast.error("Cannot exceed available stock");
      return;
    }

    // Optimistic update
    setOptimisticQuantities(prev => ({ ...prev, [itemId]: newQuantity }));

    try {
      const data = {
        items: [
          {
            product_id: item.product_id._id,
            quantity: newQuantity,
            price: item.product_id.price,
            variant: item.variant,
            size: item.size
          }
        ]
      };

      const res = await createCartMutation(data).unwrap();
      if (!res?.success) {
        throw new Error(res?.message);
      }
      // Remove from optimistic state on success
      setOptimisticQuantities(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    } catch (error: any) {
      // Revert on error
      setOptimisticQuantities(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });

      if (error?.status === 403) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        router.push("/auth/sign-in");
      } else {
        toast.error(error?.message || error?.data?.message || "Failed to update quantity");
      }
      console.log(error);
    }
  };

  const decreaseQuantity = async (itemId: string) => {
    const item = items.find((i: any) => i._id === itemId);
    if (!item) return;

    const currentQuantity = optimisticQuantities[itemId] ?? item.quantity;
    const newQuantity = Math.max(1, currentQuantity - 1);

    if (newQuantity === currentQuantity) return;

    // Optimistic update
    setOptimisticQuantities(prev => ({ ...prev, [itemId]: newQuantity }));

    try {
      const data = {
        items: [
          {
            product_id: item.product_id._id,
            quantity: newQuantity,
            price: item.product_id.price,
            variant: item.variant,
            size: item.size
          }
        ]
      };

      const res = await createCartMutation(data).unwrap();
      if (!res?.success) {
        throw new Error(res?.message);
      }
      // Remove from optimistic state on success
      setOptimisticQuantities(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    } catch (error: any) {
      // Revert on error
      setOptimisticQuantities(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });

      if (error?.status === 403) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        router.push("/auth/sign-in");
      } else {
        toast.error(error?.message || error?.data?.message || "Failed to update quantity");
      }
      console.log(error);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutModalOpen(true);
  };

  const shippingCharge = cartData?.total_price < 50 ? 0 : 15;

  return (
    <>
      <div className="max-w-screen-2xl border-x border-[var(--border-color)] mx-auto grid md:grid-cols-3 py-10">

        <div
          className={cn("md:col-span-2 bg-white border-y border-[var(--border-color)]",
            items.length === 0 && "md:col-span-3")
          }>
          <h1 className="text-3xl font-bold mb-6 bg-[#EDEDED] border-b border-[var(--border-color)] p-6 uppercase text-gray-900">
            Shopping Cart
          </h1>

          <div className="space-y-6 mb-12">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <Image src={IMAGE.emptyCart} placeholder="blur" blurDataURL={IMAGE.emptyCart.blurDataURL} alt="empty-cart" width={200} height={200} />
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
                        ${item?.product_id?.price?.toFixed(2)}
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
                        {optimisticQuantities[item._id] ?? item?.quantity}
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
                        ${item?.price?.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {items.length > 0 && <div className="bg-[#F2F2F2] p-6 border border-[var(--border-color)]">
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
                <span>${item?.price?.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Divider />

          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Subtotal</span>
            <span>${cartData?.total_price?.toFixed(2)}</span>
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
            <span>${shippingCharge.toFixed(2)}</span>
          </div>

          <Divider />

          <div className="flex justify-between text-2xl font-bold text-gray-900 mt-3">
            <span>Total</span>
            <span>${(cartData?.total_price + shippingCharge)?.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full rounded-none bg-[var(--purple-light)] hover:bg-[var(--color-primary)] cursor-pointer text-white font-bold py-3 uppercase transition"
          >
            Proceed to Checkout
          </button>
        </div>}
      </div>

      {/* Checkout Address Modal */}
      <CheckoutAddressModal
        open={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={items}
        totalAmount={cartData?.total_price || 0}
      />
    </>
  );
};

export default CartPage;
