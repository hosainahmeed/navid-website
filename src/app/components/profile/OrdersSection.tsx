"use client";

import { useState } from "react";
import { Card, Spin, Empty, Pagination } from "antd";
import dayjs from "dayjs";
import { useGetAllOrdersQuery } from "@/app/redux/services/orderApis";

interface Order {
  _id: string;
  total_amount: number;
  payment_status: string;
  payment_method: string;
  delivery_status: string;
  createdAt: string;
  delivery_address: {
    _id: string;
    address: string;
    phone: string;
    name: string;
  } | null;
  pick_up_address: {
    _id: string;
    address: string;
    phone: string;
    name: string;
  } | null;
  items: {
    _id: string;
    product: { 
      _id: string;
      name: string; 
      price: number;
    };
    quantity: number;
    color: string;
    size: string;
  }[];
}

export default function OrdersSection() {
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
      <h2 className="text-xl font-bold">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <div className="grid grid-cols-1 border-b sm:grid-cols-2">
            <div className="border border-[var(--border-color)]">
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Total:</b> ${order.total_amount.toFixed(2)}</p>
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Payment:</b> <span className="capitalize">{order.payment_status}</span></p>
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Delivery:</b> <span className="capitalize">{order.delivery_status}</span></p>
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Payment Method:</b> <span className="capitalize">{order.payment_method.replace('_', ' ')}</span></p>
              <p className="mb-2 border-[var(--border-color)] p-2"><b>Date:</b> {dayjs(order.createdAt).format("MMM DD, YYYY h:mm A")}</p>
            </div>
            <div className="border border-[var(--border-color)]">
              <p className="mb-2 border-b border-[var(--border-color)] p-2 font-semibold">
                <b>Items:</b>
              </p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div className="mb-2 border-b border-[var(--border-color)] p-2 text-sm" key={item._id}>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-gray-600">Size: {item.size || 'N/A'} | Qty: {item.quantity}</p>
                    <p className="text-gray-800 font-semibold">${item.product.price.toFixed(2)} each</p>
                  </div>
                ))}
              </div>
              
              {/* Address Info */}
              <div className="p-2 bg-gray-50 border-t border-[var(--border-color)]">
                <p className="font-semibold mb-1">Delivery Info:</p>
                {order.delivery_address && (
                  <div className="text-sm text-gray-700">
                    <p><b>Name:</b> {order.delivery_address.name}</p>
                    <p><b>Address:</b> {order.delivery_address.address}</p>
                    <p><b>Phone:</b> {order.delivery_address.phone}</p>
                  </div>
                )}
                {order.pick_up_address && (
                  <div className="text-sm text-gray-700">
                    <p className="text-blue-600 font-medium">Pickup Location</p>
                    <p><b>Name:</b> {order.pick_up_address.name}</p>
                    <p><b>Address:</b> {order.pick_up_address.address}</p>
                    <p><b>Phone:</b> {order.pick_up_address.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
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
