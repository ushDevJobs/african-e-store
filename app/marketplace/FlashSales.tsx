"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useFetchSellerProducts } from '../api/apiClients'; // Custom hook for fetching flash sales products
import { createCustomErrorMessages } from "../components/constants/catchError"; // Custom error message handler
import { toast } from "sonner"; // Notification library
import { FlashSaleProductResponse } from "../components/models/IFlashSaleProduct"; // Product response model
import { FullPageLoader } from "../Loader/ComponentLoader"; // Loader component
import { useFetchFlashSalesProducts } from "../components/hooks/useFetchFlashSalesProducts";

export default function FlashSales() {
  const fetchFlashSalesProducts = useFetchFlashSalesProducts();

  const [isFetchingFlashSalesProducts, setIsFetchingFlashSalesProducts] =
    useState<boolean>(true);
  const [products, setProducts] = useState<FlashSaleProductResponse[]>();

  async function handleFetchFlashSalesProducts() {
    // Start loader
    setIsFetchingFlashSalesProducts(true);

    await fetchFlashSalesProducts()
      .then((response) => {
        // Assuming the API response contains a 'flashSales' field with the product data
        setProducts(response.data.flashSales);
      })
      .catch((error) => {
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsFetchingFlashSalesProducts(false);
      });
  }

  useEffect(() => {
    handleFetchFlashSalesProducts();
  }, []);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold text-center mb-4">Flash Sales</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.slice(0, 8).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      {!products && isFetchingFlashSalesProducts && (
        <div className="h-[30vh]">
          <FullPageLoader />
        </div>
      )}
      {!products && !isFetchingFlashSalesProducts && (
        <p className="text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[20vh]">
          No flash sales product found
        </p>
      )}
    </section>
  );
}
