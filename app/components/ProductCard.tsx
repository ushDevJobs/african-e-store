import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  useAddProductsToFavorite,
  useFetchProduct,
  useRemoveProductFromFavorite,
} from "@/app/api/apiClients";
import router from "next/router";
import { toast } from "sonner";
import { createCustomErrorMessages } from "./constants/catchError";

type ProductCardProps = {
  product: {
    id: string;
    coverImage: string;
    name: string;
    details?: string | null;
    amount: number;
    rating?: number; // New rating field
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const fetchProduct = useFetchProduct();
  const addProductToFavorite = useAddProductsToFavorite();
  const removeProductFromFavorite = useRemoveProductFromFavorite();
  // console.log(product.coverImage);

  //   async function handleFetchProduct() {

  //     // Start loader
  //     setIsFetchingProduct(true);

  //     await fetchProduct(productId)
  //         .then((response) => {
  //             // console.log("Response: ", response.data.data);
  //             setProduct(response.data.data);
  //         })
  //         .catch((error) => {
  //             const errorMessage = createCustomErrorMessages(error.response?.data)
  //             toast.error(errorMessage);
  //             // console.log(errorMessage);
  //         })
  //         .finally(() => {
  //             setIsFetchingProduct(false);
  //         });
  // }

  async function handleAddProductToFavorite(id: string) {
    await addProductToFavorite(id)
      .then((response) => {
        // Log response
        // console.log(response);

        // handleFetchProduct()

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
          router.push(`/login?redirect=/products/${product.id}`);
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

        // handleFetchProduct()
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
  return (
    <div
      className="relative group block border-0 overflow-hidden"
      // shadow-lg hover:shadow-xl transition-shadow rounded-lg
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-32 sm:h-32 md:h-48 lg:h-64 xl:h-48">
          <Image
            src={product.coverImage}
            alt={product.name}
            fill
            className="object-cover !rounded-lg"
          />
        </div>
      </Link>
      <div className="py-2 md:py-3 lg:py-4 pb-4">
        <h3 className="text-sm xs:text-xs sm:text-sm md:text-md lg:text-md xl:text-md font-bold">
          {product.name}
        </h3>
        {product.details && (
          <p className="text-xs my-1 !text-left">{product.details} </p>
        )}
        <span className="block sm:flex md:block lg:flex xl:flex items-stretch justify-between">
          <p className="text-sm sm:text-sm md:text-md lg:text-lg font-semibold text-green-600 mt-1 mx-0 !text-start">
            £{product.amount.toLocaleString()}
          </p>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                className={`h-3 w-3 sm:h-2 md:h-3 lg:h-4  sm:w-2 md:w-3 lg:w-4 ${
                  product.rating && i < product.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </span>
      </div>
      {/* Icons and buttons that appear on hover */}
      <div className="absolute top-2 sm:top-2 md:top-3 lg:top-4 right-2 sm:right-2 md:right-3 lg:right-4 flex flex-col items-end space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Add to Favourites Icon */}
        <button className="text-gray-600 hover:text-red-500 p-1 bg-white rounded-full shadow">
          <AiOutlineHeart size={"24px"} />
        </button>
        {/* Add to Cart Button */}
        <button className="text-gray-600 hover:text-green-600 p-1 bg-white rounded-full shadow">
          <AiOutlineShoppingCart size={"24px"} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
