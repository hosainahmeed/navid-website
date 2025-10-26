"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfigProvider } from "antd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "antd";
import {
  useGetAllShippingAddressQuery,
  useCreateShippingAddressMutation,
  useGetAllPickupAddressQuery,
} from "@/app/redux/services/addressApis";
import { useCreateOrderMutation } from "@/app/redux/services/orderApis";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface CheckoutAddressModalProps {
  open: boolean;
  onClose: () => void;
  cartItems: any[];
  totalAmount: number;
}

type AddressType = "shipping" | "pickup";

export function CheckoutAddressModal({ open, onClose, cartItems, totalAmount }: CheckoutAddressModalProps) {
  const [addressType, setAddressType] = useState<AddressType>("shipping");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const router = useRouter();

  // Form state for creating new shipping address
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // API hooks
  const { data: shippingAddressData, isLoading: shippingLoading } =
    useGetAllShippingAddressQuery(undefined, {
      skip: addressType !== "shipping",
    });
  const { data: pickupAddressData, isLoading: pickupLoading } =
    useGetAllPickupAddressQuery(undefined, {
      skip: addressType !== "pickup",
    });
  const [createShippingAddress, { isLoading: createLoading }] =
    useCreateShippingAddressMutation();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();

  const shippingAddresses = shippingAddressData?.data || [];
  const pickupAddresses = pickupAddressData?.data || [];

  const handleCreateAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await createShippingAddress(newAddress).unwrap();
      if (!res?.success) {
        throw new Error(res?.message);
      }
      toast.success(res?.message || "Shipping address created successfully!");
      setNewAddress({ name: "", phone: "", address: "" });
      setShowCreateForm(false);
    } catch (error: any) {
      if (error?.status === 403) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        toast.error(
          error?.message || error?.data?.message || "Failed to create address"
        );
      }
      console.log(error);
    }
  };

  const handleProceed = async () => {
    if (!selectedAddressId) {
      toast.error("Please select an address");
      return;
    }

    try {
      // Format cart items for order
      const orderItems = cartItems.map((item: any) => ({
        product: item.product_id._id,
        quantity: item.quantity,
        color: item.variant || "",
        size: item.size || ""
      }));

      // Create order payload
      const orderPayload: any = {
        items: orderItems,
        total_amount: totalAmount,
      };

      // Add address based on type
      if (addressType === "shipping") {
        orderPayload.delivery_address = selectedAddressId;
      } else {
        orderPayload.pick_up_address = selectedAddressId;
      }

      const res = await createOrder(orderPayload).unwrap();
      
      if (!res?.success) {
        throw new Error(res?.message);
      }

      toast.success(res?.message || "Order created successfully!");
      console.log("Order created:", res);
      onClose();
      
      // Optionally redirect to order confirmation page
      // router.push("/orders");
    } catch (error: any) {
      if (error?.status === 403) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        toast.error(
          error?.message || error?.data?.message || "Failed to create order"
        );
      }
      console.log(error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: 'rgba(0, 0, 0, 0.04)',
            optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            controlItemBgHover: 'rgba(0, 0, 0, 0.04)',
          },
        },
      }}
    >
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Select Delivery Method
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Address Type Selection */}
          <div className="space-y-3">
            <label className="text-base font-semibold block">Delivery Type</label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={addressType === "shipping" ? "default" : "outline"}
                onClick={() => {
                  setAddressType("shipping");
                  setSelectedAddressId("");
                }}
                className="h-12 rounded-none"
              >
                Shipping Address
              </Button>
              <Button
                variant={addressType === "pickup" ? "default" : "outline"}
                onClick={() => {
                  setAddressType("pickup");
                  setSelectedAddressId("");
                  setShowCreateForm(false);
                }}
                className="h-12 rounded-none"
              >
                Pickup Address
              </Button>
            </div>
          </div>

          {/* Shipping Address Selection */}
          {addressType === "shipping" && (
            <div className="space-y-4">
              {shippingLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <>
                  {!showCreateForm && (
                    <>
                      <div className="space-y-3">
                        <label className="text-base font-semibold block">
                          Select Shipping Address
                        </label>
                        <Select
                          value={selectedAddressId || undefined}
                          onChange={setSelectedAddressId}
                          placeholder="Choose an address"
                          style={{ width: '100%' }}
                          size="large"
                          dropdownStyle={{ zIndex: 9999 }}
                          getPopupContainer={(trigger) => trigger.parentElement || document.body}
                          options={shippingAddresses.map((addr: any) => ({
                            value: addr._id,
                            label: `${addr.name} - ${addr.address} (${addr.phone})`
                          }))}
                          notFoundContent="No addresses found"
                        />
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => setShowCreateForm(true)}
                        className="w-full h-12 rounded-none mt-4"
                      >
                        + Add New Shipping Address
                      </Button>
                    </>
                  )}

                  {/* Create New Address Form */}
                  {showCreateForm && (
                    <div className="space-y-4 border border-[var(--border-color)] p-4">
                      <h3 className="font-semibold text-lg">
                        Create New Shipping Address
                      </h3>

                      <div className="space-y-2">
                        <label className="block font-medium">Name</label>
                        <Input
                          placeholder="Enter your name"
                          value={newAddress.name}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, name: e.target.value })
                          }
                          className="rounded-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-medium">Phone</label>
                        <Input
                          placeholder="Enter phone number"
                          value={newAddress.phone}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, phone: e.target.value })
                          }
                          className="rounded-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block font-medium">Address</label>
                        <Input
                          placeholder="Enter full address"
                          value={newAddress.address}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              address: e.target.value,
                            })
                          }
                          className="rounded-none"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handleCreateAddress}
                          disabled={createLoading}
                          className="flex-1 rounded-none h-12"
                        >
                          {createLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Create Address"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowCreateForm(false);
                            setNewAddress({ name: "", phone: "", address: "" });
                          }}
                          className="flex-1 rounded-none h-12"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Pickup Address Selection */}
          {addressType === "pickup" && (
            <div className="space-y-2">
              {pickupLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <>
                  <label className="text-base font-semibold block mb-3">
                    Select Pickup Address
                  </label>
                  <Select
                    value={selectedAddressId || undefined}
                    onChange={setSelectedAddressId}
                    placeholder="Choose a pickup location"
                    style={{ width: '100%' }}
                    size="large"
                    dropdownStyle={{ zIndex: 9999 }}
                    getPopupContainer={(trigger) => trigger.parentElement || document.body}
                    options={pickupAddresses.map((addr: any) => ({
                      value: addr._id,
                      label: `${addr.name} - ${addr.address} (${addr.phone})`
                    }))}
                    notFoundContent="No pickup locations found"
                  />
                </>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleProceed}
              disabled={!selectedAddressId || orderLoading}
              className="flex-1 h-12 rounded-none bg-[var(--purple-light)] hover:bg-[var(--color-primary)]"
            >
              {orderLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Order...
                </>
              ) : (
                "Confirm Order"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-none"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </ConfigProvider>
  );
}
