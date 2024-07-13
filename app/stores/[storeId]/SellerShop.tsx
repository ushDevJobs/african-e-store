import React, { useEffect, useState } from "react";
import styles from "./SellerStore.module.scss";
import Link from "next/link";
import Image from "next/image";
import images from "@/public/images";
import {
  Products,
  StoreCategories,
  StoreCategoriesResponse,
  StoreProducts,
} from "@/app/components/models/IStores";
import { StoreCategoriesSkeletonLoader } from "../StoresSkeleton";

type Props = {
  isFetchingProducts: boolean;
  handleFetchStoreCategories: () => Promise<void>;
  storeProducts: StoreCategories[] | undefined;
  filteredCategories:
    | {
        products: Products[];
        id: string;
        name: string;
      }[]
    | undefined;
};

const SellerShop = ({
  storeProducts,
  isFetchingProducts,
  filteredCategories,
  handleFetchStoreCategories,
}: Props) => {
  const noProductsFound =
    !filteredCategories || filteredCategories.length === 0;
  const noProductsInStore = !storeProducts || storeProducts.length === 0;
  return (
    <>
      {isFetchingProducts ? (
        <StoreCategoriesSkeletonLoader />
      ) : noProductsFound || noProductsInStore ? (
        <p className="text-center flex items-center justify-center h-[30vh] text-gray-600">
          No product found
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {filteredCategories.map((store) => (
            <div className="flex flex-col" key={store.id}>
              <h3 className="text-lg font-semibold mb-5 text-[#333]">
                {store.name}
              </h3>
              <div className={styles.cards}>
                {store.products.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    className={styles.card}
                    key={product.id}
                  >
                    <div className={styles.image}>
                      <Image
                        fill
                        src={product.coverImage}
                        alt="product image"
                      />
                    </div>
                    <p>{product.name}</p>
                    <span className="text-gray-400 text-sm mb-2">
                      {product.details}
                    </span>
                    <h4>&pound;{product.amount.toLocaleString()}</h4>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SellerShop;
