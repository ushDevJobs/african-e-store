// components/ProductList.tsx

import React from "react";

interface Product {
  id: number;
  name: string;
  status: string;
  sales: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Products</h2>
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 text-left">Product Name</th>
          <th className="py-2 px-4 text-left">Status</th>
          <th className="py-2 px-4 text-left">Sales</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b">
            <td className="py-2 px-4">{product.name}</td>
            <td className="py-2 px-4">{product.status}</td>
            <td className="py-2 px-4">{product.sales}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductList;
