"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Assuming you have a reusable ProductCard component
import { useFetchRecommendedProduct } from "../api/apiClients";
import { createCustomErrorMessages } from "./constants/catchError";
import { toast } from "sonner";
import { RecommendedResponse } from "./models/IRecommended";
import { FullPageLoader } from "../Loader/ComponentLoader";
import useResponsiveness from "./hooks/responsiveness-hook";
import { LeftArrowIcon, LongArrowIcon, RightArrowIcon } from "./SVGs/SVGicons";
import Link from "next/link";

type Props = {};

const Recommendations = (props: Props) => {
  const windowRes = useResponsiveness();
  const isMobile = windowRes.width && windowRes.width < 768;
  const onMobile = typeof isMobile == "boolean" && isMobile;
  const onDesktop = typeof isMobile == "boolean" && !isMobile;
  const fetchRecommendedProducts = useFetchRecommendedProduct();

  const [isFetchingRecommendedProducts, setIsFetchingRecommendedProducts] =
    useState<boolean>(true);
  const [products, setProducts] = useState<RecommendedResponse[]>();

  async function handleFetchRecommendedProducts() {
    // Start loader
    setIsFetchingRecommendedProducts(true);

    await fetchRecommendedProducts()
      .then((response) => {
        setProducts(response.data.recommended);
      })
      .catch((error) => {
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsFetchingRecommendedProducts(false);
      });
  }

  useEffect(() => {
    handleFetchRecommendedProducts();
  }, []);

  return (
    <section className="my-2 sm:my-2 md:my-4 lg:my-6 xl:my-12 !mt-3">
      <div className="flex justify-start gap-2">
        <div className="flex w-3 bg-[#d9edbf]"></div>
        <p className="!mx-0 !text-start">Recommeded</p>
      </div>
      <div className="flex justify-between items-center gap-2 mt-1 mb-6">
        <h2 className="!mx-0 !text-start text-[24px] lg:text-[26px] text-[#6f6f6f]">
          For You
        </h2>
        {!isMobile && (
          <div className="flex gap-2">
            {/* <div
              className={`w-9 h-9 bg-[#2c7865] p-[14px] text-[20px] rounded-full justify-center`}
              role="button"
              onClick={() => {
                // scrollLeft();
              }}
            >
              <LeftArrowIcon />
            </div>
            <div
              className={`w-9 h-9 bg-[#2c7865] p-[14px] text-[20px] rounded-full justify-center`}
              role="button"
              onClick={() => {
                // scrollRight();
              }}
            >
              <RightArrowIcon />
            </div> */}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products?.slice(0, 8).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="flex justify-end mt-8">
        <Link
          href="/recommeded"
          className="bg-[#d9edbf] text-[#2c7865] flex items-center text-center w-fit py-[10px] px-[18px] gap-6 rounded-sm"
          role="button"
        >
          View More
          {/* <LongArrowIcon /> */}
        </Link>
      </div>
      {!products && isFetchingRecommendedProducts && (
        <div className="h-[30vh]">
          <FullPageLoader />
        </div>
      )}
      {!products && !isFetchingRecommendedProducts && (
        <p className="text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[20vh]">
          No recommended product found
        </p>
      )}
    </section>
  );
};

export default Recommendations;
