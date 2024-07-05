import images from "@/public/images";
import Image from "next/image";
import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "../components/SVGs/SVGicons";
import { SellerProductsResponse } from "../components/models/ISellerStore";
import ComponentLoader from "../components/Loader/ComponentLoader";
import { useRemoveProduct } from "../api/apiClients";
import { toast } from "sonner";
import { createCustomErrorMessages } from "../components/constants/catchError";

type Props = {
    products: SellerProductsResponse[] | undefined;
    isFetchingProducts: boolean;
    setIsAddProductModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    handleFetchProducts: ({ clearPreviousProducts }: {
        clearPreviousProducts?: boolean | undefined;
    }) => Promise<void>
};

const SellerProduct = ({
    products,
    isFetchingProducts,
    setIsAddProductModalVisible,
    handleFetchProducts
}: Props) => {
    console.log({ products })
    const removeProduct = useRemoveProduct()
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
    async function handleRemoveProduct(id: string) {
        setIsDeletingId(id);
        await removeProduct(id)
            .then((response) => {

                handleFetchProducts({ clearPreviousProducts: true });
                // Display success 
                toast.success('Product Deleted.');

            })
            .catch((error) => {
                // Display error
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage)
            })
            .finally(() => {

                // Close laoder 
                setIsDeletingId(null);
            })
    };
    return (
        <main className="overflow-y-auto max-h-[500px] w-full">
            <div className="flex flex-col gap-10">
                {products?.map((product) => (
                    <div className="flex gap-4" key={product.id}>
                        <div className="relative h-[174px] min-w-[221px]">
                            {product.coverImage &&
                                <Image
                                    src={product.coverImage}
                                    alt="product image"
                                    fill
                                    className="object-cover rounded-[22px]"
                                />
                            }
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[#828282] text-lg">{product.name}</h2>
                            <p className="text-[#1E1E1E] text-sm mb-1">{product.details}</p>
                            <h3 className="font-medium text-base text-[#1E1E1E] mb-14">
                                &pound;{product.amount.toLocaleString()}
                            </h3>
                            <div className="flex items-center gap-4">
                                <button className="border flex items-center justify-center cursor-pointer gap-1 border-[#2C7865] text-[#2C7865] rounded-[37px] py-3 px-14">
                                    <EditIcon /> Edit
                                </button>
                                {/* <button type="button" onClick={() => handleRemoveProduct(product.id)} disabled={isDeleting} className="border flex items-center justify-center cursor-pointer gap-1 border-[#FD6A02] text-[#FD6A02] rounded-[37px] py-3 px-14 disabled:pointer-events-none disabled:opacity-60">
                                    <DeleteIcon /> {isDeleting ? "Deleting..." : "Remove"}
                                </button> */}
                                <button
                                    key={product.id}
                                    type="button"
                                    onClick={() => handleRemoveProduct(product.id)}
                                    disabled={isDeletingId !== null}
                                    className="border flex items-center justify-center cursor-pointer gap-1 border-[#FD6A02] text-[#FD6A02] rounded-[37px] py-3 px-14 disabled:pointer-events-none disabled:opacity-60"
                                >
                                    <DeleteIcon /> {isDeletingId === product.id ? "Deleting..." : "Remove"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!products && isFetchingProducts && (
                <p className="h-[30vh]">
                    <ComponentLoader lightTheme svgStyle={{ width: "62px" }} />
                </p>
            )}
            {products?.length == 0 && (
                <div className="flex flex-col lg:-translate-x-48 gap-5 items-center justify-center text-center">
                    <Image
                        src={images.noProduct}
                        alt="empty state image"
                        className="object-cover h-[147px] w-[236px]"
                    />
                    <p>No current item in your store </p>
                    <button
                        onClick={() => setIsAddProductModalVisible(true)}
                        className="rounded-[13px] text-sm bg-[#2C7865] py-4 w-full cursor-pointer md:w-fit md:px-8 text-white"
                    >
                        Add products to store
                    </button>
                </div>
            )}
        </main>
    );
};

export default SellerProduct;
