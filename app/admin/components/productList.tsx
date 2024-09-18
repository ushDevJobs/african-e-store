// components/ProductList.tsx
import { Products } from "../../components/models/AllCategories";
import React from "react";

interface Product {
  amount?: number;
  id: number;
  name: string;
  status: string;
  sales: number;
}



interface ProductListProps {
  products: Products[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Products</h2>
    <div className=" min-w-full h-[500px] overflow-x-auto overflow-y-auto">
      <table className="min-w-full w-max">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Amount</th>
            <th className="py-2 px-4 text-left">Quantity/Status</th>
            <th className="py-2 px-4 text-left">Condition</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-4"><div className="max-w-[250px] truncate">{product.name}</div></td>
              <td className="py-2 px-4">£{product.amount}</td>
              <td className="py-2 px-4">{product.quantity}</td>
              <td className="py-2 px-4">{product.itemCondition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProductList;
