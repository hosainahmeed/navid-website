"use client";

import { Card } from "antd";
import dayjs from "dayjs";

interface Order {
  _id: string;
  total_amount: number;
  payment_status: string;
  payment_method: string;
  delivery_status: string;
  createdAt: string;
  items: {
    product: { name: string; price: number };
    quantity: number;
    color: string;
  }[];
}

const mockOrders: Order[] = [
  {
    _id: "67b6f0049b9a7b8eb1915796",
    total_amount: 150.75,
    payment_status: "pending",
    payment_method: "credit_card",
    delivery_status: "pending",
    createdAt: "2025-02-20T09:04:04.686Z",
    items: [
      { product: { name: "update name", price: 20 }, quantity: 2, color: "red" },
    ],
  },
];

export default function OrdersSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold border-b p-2">Orders</h2>
      {mockOrders.map((order) => (
        <div key={order._id}>
          <div className="grid grid-cols-1 border-b sm:grid-cols-2">
            <div className="border border-[var(--border-color)]">
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Total:</b> ${order.total_amount}</p>
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Payment:</b> {order.payment_status}</p>
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Delivery:</b> {order.delivery_status}</p>
              <p className="mb-2 border-[var(--border-color)] p-2"><b>Date:</b> {dayjs(new Date(order.createdAt)).format("PPpp")}</p>
            </div>
            <div className="border border-[var(--border-color)]">
              <p className="mb-2 border-b border-[var(--border-color)] p-2"><b>Items:</b></p>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {order.items.map((item, i) => (
                  <li className="mb-2 border-b border-[var(--border-color)] p-2" key={i}>
                    {item.product.name} ({item.color}) × {item.quantity} (${item.product.price})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
