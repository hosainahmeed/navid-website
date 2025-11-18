"use client";

import { memo, useState } from "react";
import { Card, Spin, Empty, Pagination } from "antd";
import dayjs from "dayjs";
import { useGetAllOrdersQuery } from "@/app/redux/services/orderApis";
import { imageUrl } from "@/app/utils/imagePreview";

interface OrderProduct {
  _id: string;
  name: string;
}

interface OrderVariant {
  _id: string;
  img: string[];
  color: string;
  size: string;
  quantity: number;
  price: number;
  discount: number;
}

interface OrderItem {
  _id: string;
  product: OrderProduct;
  variant: OrderVariant;
  quantity: number;
}

interface DeliveryAddress {
  _id: string;
  address: string;
  phone: string;
  name: string;
}
interface PickupAddress {
  _id: string;
  address: string;
  phone: string;
  name: string;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  payment_status: string;
  total_amount: number;
  delivery_status: string;
  delivery_address: DeliveryAddress | null;
  pick_up_address: PickupAddress | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function OrdersSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: orderResponse, isLoading, error } = useGetAllOrdersQuery(currentPage);

  const orders: Order[] = orderResponse?.data || [];
  const pagination = orderResponse?.pagination;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load orders</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-10">
        <Empty description="No orders found" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold p-2">My Orders</h2>
      {orders.map((order) => (
        <div className="bg-[#EDEDED]" key={order._id}>
          <div className="grid grid-cols-1 border-b sm:grid-cols-2">
            <div className="border border-[var(--border-color)]">
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Total:</b> ${order?.total_amount?.toFixed?.(2) || '0.00'}</p>
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Payment:</b> <span className="capitalize">{order?.payment_status || 'N/A'}</span></p>
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Delivery:</b> <span className="capitalize">{order?.delivery_status || 'N/A'}</span></p>
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Order ID:</b> {order?._id || 'N/A'}</p>
              <p className="mb-2 border-[var(--border-color)] p-2"><b>Date:</b> {order?.createdAt ? dayjs(order.createdAt).format("MMM DD, YYYY h:mm A") : 'N/A'}</p>
            </div>
            <div className="border border-[var(--border-color)]">
              <p className="mb-2 border-b border-[var(--border-color)] p-2 font-semibold">
                <b>Items:</b>
              </p>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {order?.items?.map((item) => (
                  <div className="mb-2 border-b border-[var(--border-color)] p-2 text-sm" key={item?._id || Math.random()}>
                    <div className="flex gap-3">
                      {item?.variant?.img?.[0] ? (
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={imageUrl({ image: item.variant.img[0] })}
                            alt={item?.product?.name || 'Product'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement?.classList.add('hidden');
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item?.product?.name || 'Product'}</p>
                        <p className="text-gray-600">
                          Size: {item?.variant?.size || 'N/A'} |
                          Qty: {item?.quantity || 1}
                        </p>
                        <p className="text-gray-800 font-semibold">
                          ${item?.variant?.price * item.quantity}
                        </p>
                        {item?.variant?.color && (
                          <div className="flex items-center mt-1">
                            <span className="mr-2">Color:</span>
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.variant.color }}
                              title={item.variant.color}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address Info */}
              <div className="p-2 border-t border-[var(--border-color)]">
                <p className="font-semibold mb-1">Delivery Info:</p>
                {order?.delivery_address ? (
                  <div className="text-sm text-gray-700">
                    <p><b>Name:</b> {order.delivery_address.name}</p>
                    <p><b>Address:</b> {order.delivery_address.address}</p>
                    <p><b>Phone:</b> {order.delivery_address.phone}</p>
                  </div>
                ) : order?.pick_up_address ? (
                  <div className="text-sm text-gray-700">
                    <p className="text-blue-600 font-medium">Pickup Location</p>
                    <p><b>Name:</b> {order.pick_up_address.name}</p>
                    <p><b>Address:</b> {order.pick_up_address.address}</p>
                    <p><b>Phone:</b> {order.pick_up_address.phone}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No delivery information available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            total={pagination.totalItems}
            pageSize={pagination.itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
export default memo(OrdersSection)