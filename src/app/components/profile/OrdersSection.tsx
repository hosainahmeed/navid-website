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
      <h2 className="text-xl font-bold border-b pb-2">Orders</h2>
      {mockOrders.map((order) => (
        <Card key={order._id} title={`Order #${order._id.slice(-6)}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p><b>Total:</b> ${order.total_amount}</p>
              <p><b>Payment:</b> {order.payment_status}</p>
              <p><b>Delivery:</b> {order.delivery_status}</p>
              <p><b>Date:</b> {dayjs(new Date(order.createdAt)).format("PPpp")}</p>
            </div>
            <div>
              <b>Items:</b>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.product.name} ({item.color}) × {item.quantity} (${item.product.price})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
