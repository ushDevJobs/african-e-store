import images from "@/public/images";
import Image from "next/image";
import React from "react";
import { DeleteIcon, EditIcon } from "../components/SVGs/SVGicons";
import { SellerProductsResponse } from "../components/models/ISellerStore";
import ComponentLoader from "../components/Loader/ComponentLoader";

type Props = {
    products: SellerProductsResponse[] | undefined;
    isFetchingProducts: boolean;
    setIsAddProductModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const SellerProduct = ({
    products,
    isFetchingProducts,
    setIsAddProductModalVisible,
}: Props) => {
    console.log({ products })
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
                            <h3 className="font-medium text-base text-[#1E1E1E] mb-14">
                                &pound;{product.amount.toLocaleString()}
                            </h3>
                            <div className="flex items-center gap-4">
                                <button className="border flex items-center justify-center cursor-pointer gap-1 border-[#2C7865] text-[#2C7865] rounded-[37px] py-3 px-14">
                                    <EditIcon /> Edit
                                </button>
                                <button className="border flex items-center justify-center cursor-pointer gap-1 border-[#FD6A02] text-[#FD6A02] rounded-[37px] py-3 px-14">
                                    <DeleteIcon /> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!products && isFetchingProducts && (
                <p className="h-[20vh]">
                    <ComponentLoader lightTheme svgStyle={{ width: "62px" }} />
                </p>
            )}
            {!products && !isFetchingProducts && (
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
