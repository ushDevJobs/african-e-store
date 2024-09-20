// components/OrderList.tsx

import React from "react";
import { UserOrderResponse } from "../../components/models/IUserOrder";
import { StatusEnum } from "@/app/components/models/IOrderDeliveryStatus";
import { StatusEnums } from "@/app/components/models/ISellerStore";

interface Order {
  id: number;
  customerName: string;
  amount: number;
  date: string;
  status: string;
}

interface OrderListProps {
  orders: UserOrderResponse[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Orders</h2>
    <div className=" min-w-full overflow-x-auto">
      <table className="min-w-full w-max">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4 text-left">Product Count</th>
            <th className="py-2 px-4 text-left">Amount</th>
            {/* <th className="py-2 px-4 text-left">Date</th> */}
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2 px-4">#{order.orderId}</td>
              <td className="py-2 px-4">{order.orderDetails.length}</td>
              <td className="py-2 px-4">${order.amount}</td>
              {/* <td className="py-2 px-4">{}</td> */}
              <td className="py-2 px-4">
                {order.orderDetails
                  .map((orderProd) => {
                    return orderProd.status;
                  })
                  .flat(1)
                  .includes(StatusEnums.Pending)
                  ? StatusEnums.Pending
                  : StatusEnums.Delivered}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderList;
