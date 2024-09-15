// components/OrderList.tsx

import React from "react";

interface Order {
  id: number;
  customerName: string;
  amount: number;
  date: string;
  status: string;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Orders</h2>
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 text-left">Order ID</th>
          <th className="py-2 px-4 text-left">Customer</th>
          <th className="py-2 px-4 text-left">Amount</th>
          <th className="py-2 px-4 text-left">Date</th>
          <th className="py-2 px-4 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-b">
            <td className="py-2 px-4">#{order.id}</td>
            <td className="py-2 px-4">{order.customerName}</td>
            <td className="py-2 px-4">${order.amount}</td>
            <td className="py-2 px-4">{order.date}</td>
            <td className="py-2 px-4">{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderList;
