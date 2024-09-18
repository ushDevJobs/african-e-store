// components/SalesList.tsx
import { Products } from "../../components/models/AllCategories";

import React from "react";

interface Sale {
  id: number;
  productName: string;
  amount: number;
  date: string;
}


interface productPropType {
  name: string;
  id: string;
  details: string;
  itemCondition: string;
  coverImage: string;
};

interface orderPropType {
  amount: number;
  id: string;
  product: productPropType,
  quantity: number;
  shippingFee: number;
  status: string;
};




interface SalesListProps {
  sales: orderPropType[];
}

const SalesList: React.FC<SalesListProps> = ({ sales }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Recent Sales</h2>
    <div className=" min-w-full overflow-x-auto">
      <table className="min-w-full w-max">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-b">
              <td className="py-2 px-4">{sale.product.name}</td>
              <td className="py-2 px-4">${sale.amount}</td>
              <td className="py-2 px-4">{sale.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SalesList;
