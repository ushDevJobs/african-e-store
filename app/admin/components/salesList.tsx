// components/SalesList.tsx

import React from "react";

interface Sale {
  id: number;
  productName: string;
  amount: number;
  date: string;
}

interface SalesListProps {
  sales: Sale[];
}

const SalesList: React.FC<SalesListProps> = ({ sales }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Recent Sales</h2>
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 text-left">Product Name</th>
          <th className="py-2 px-4 text-left">Amount</th>
          <th className="py-2 px-4 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale) => (
          <tr key={sale.id} className="border-b">
            <td className="py-2 px-4">{sale.productName}</td>
            <td className="py-2 px-4">${sale.amount}</td>
            <td className="py-2 px-4">{sale.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SalesList;
