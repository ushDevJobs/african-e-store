"use client";
import React, { useEffect, useState } from "react";
import styles from "./SingleCategory.module.scss";
import AddProductToCart from "@/app/components/AddProductToCart";
import Recommendations from "@/app/components/Recommendations";
import SingleCategoryReviews from "./SingleCategoryReviews";
import SingleCategoriesDetails from "./SingleCategoriesDetails";
import {
  useAddProductsToFavorite,
  useFetchProduct,
  useRemoveProductFromFavorite,
} from "@/app/api/apiClients";
import { createCustomErrorMessages } from "@/app/components/constants/catchError";
import { toast } from "sonner";
import { ProductResponse } from "@/app/components/models/IProduct";
import { useAccountStatus } from "@/app/context/AccountStatusContext";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    productId: string;
  };
};

const SingleProductPage = ({ params }: Props) => {
  const fetchProduct = useFetchProduct();
  const router = useRouter();
  const productId = params.productId;
  const [product, setProduct] = useState<ProductResponse>();
  const [isFetchingProduct, setIsFetchingProduct] = useState<boolean>(true);
  console.log({ productId });
  const addProductToFavorite = useAddProductsToFavorite();
  const removeProductFromFavorite = useRemoveProductFromFavorite();
  const { accountStatus, fetchAccountStatus } = useAccountStatus();

  useEffect(() => {
    if (product) {
      console.log(product);
    }
  }, [product]);

  async function handleFetchProduct() {
    // Start loader
    setIsFetchingProduct(true);

    await fetchProduct(productId)
      .then((response) => {
        // console.log("Response: ", response.data.data);
        setProduct(response.data.data);
      })
      .catch((error) => {
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
        // console.log(errorMessage);
      })
      .finally(() => {
        setIsFetchingProduct(false);
      });
  }

  async function handleAddProductToFavorite(id: string) {
    await addProductToFavorite(id)
      .then((response) => {
        // Log response
        // console.log(response);

        handleFetchProduct();

        // Display success
        toast.success("Product added to favorite successfully.");
      })
      .catch((error) => {
        // console.log(error.response?.data.errorCode);
        // Display error
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);

        if (error.response?.data.errorCode === 2003) {
          // console.log('User not authenticated, redirecting to login...');
          router.push(`/login?redirect=/products/${productId}`);
          return;
        }
      })
      .finally(() => {
        // Close laoder
        // setIsLoading(false);
      });
  }

  async function handleRemoveProductFromFavorite(id: string) {
    await removeProductFromFavorite(id)
      .then((response) => {
        // Log response
        // console.log(response);

        handleFetchProduct();
        // Display success
        toast.success("Product removed from favorite successfully.");
      })
      .catch((error) => {
        // Display error
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
      })
      .finally(() => {
        // Close laoder
        // setIsLoading(false);
      });
  }

  useEffect(() => {
    handleFetchProduct();
  }, []);

  // useEffect(() => {
  //     if (accountStatus === null) {
  //         // router.push(`/login?redirect=/products/${productId}`);
  //         // router.push(`/login`);
  //     }
  // }, [accountStatus !== null, productId]);

  // useEffect(() => {
  //     if (router && !accountStatus?.accountType && !isFetchingProduct) {
  //             router.push('/login');
  //         }
  // }, [accountStatus, isFetchingProduct, router]);

  return (
    <div className={styles.main}>
      <AddProductToCart
        handleAddProductToFavorite={handleAddProductToFavorite}
        product={product}
        handleRemoveProductFromFavorite={handleRemoveProductFromFavorite}
        isFetchingProduct={isFetchingProduct}
      />
      <SingleCategoriesDetails product={product} />
      <SingleCategoryReviews product={product} />
      <Recommendations />
    </div>
  );
};

export default SingleProductPage;
