import React, { useState } from "react";
import styles from "../stores/[storeId]/SellerStore.module.scss";
import { DotIcon, GreenStarIcon, UserIcon } from "../components/SVGs/SVGicons";
import useResponsiveness from "../components/hooks/responsiveness-hook";
import { SellerStoreResponse } from "../components/models/ISellerStore";
import { StoreStoreRatingSkeletonLoader } from "../stores/StoresSkeleton";
import Image from "next/image";
import ApiRoutes from "../api/apiRoutes";
import EditProfileModal from "../components/Modal/EditProfileModal";

type Props = {
    store: SellerStoreResponse | undefined;
    isFetchingStore: boolean;
    handleFetchStore: () => Promise<void>
    setSelectedStore: React.Dispatch<React.SetStateAction<SellerStoreResponse | undefined>>
    selectedStore: SellerStoreResponse | undefined
};

const SellerPageStoreRating = ({ store, isFetchingStore, handleFetchStore, setSelectedStore, selectedStore }: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == "boolean" && isMobile;
    const onDesktop = typeof isMobile == "boolean" && !isMobile;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <>
            <EditProfileModal
                visibility={isEditModalOpen}
                setVisibility={setIsEditModalOpen}
                handleFetchStore={handleFetchStore}
                selectedStore={selectedStore}
            />
            {!store && isFetchingStore ? (
                <StoreStoreRatingSkeletonLoader />
            ) : (
                <div className={styles.storeInfo}>
                    <div className={styles.storelhs}>
                        {store?.storeDetails?.image ?
                            <div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px]">
                                <Image
                                    src={store.storeDetails.image}
                                    alt="Logo"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div> :
                            <span className="bg-[#2C7865] h-fit p-3 rounded-full">
                                <UserIcon />
                            </span>
                        }


                        <div className={styles.info}>
                            <h3 className="text-lg md:text-xl lg:text-2xl text-[#828282] mb-1 font-semibold underline">
                                {store?.storeDetails.name}
                            </h3>
                                {store?.storeDetails.description && 
                                <p className="text-sm text-[#333333] mb-1">
                                    { store?.storeDetails.description.length > 50
                                        ? `${store.storeDetails.description.slice(0, 50)}...`
                                        : store.storeDetails.description}
                                </p>}
                                
                            <div className="flex gap-2 text-[#1E1E1E] text-sm">
                                <span className="flex text-sm md:text-base items-center gap-1">
                                    <DotIcon />
                                    {store?.feedback}&#37; Feedback
                                </span>
                                <span className="flex text-sm md:text-base items-center gap-1">
                                    <DotIcon />
                                    {store?.totalItemSold}{" "}
                                    {store?.totalItemSold === 1 ? "Item Sold" : "Items Sold"}
                                </span>
                            </div>
                            <button onClick={() => {
                                setSelectedStore(store)
                                setIsEditModalOpen(true)
                            }} className="border mt-5 border-[#2C7865] text-[#2C7865] text-sm cursor-pointer px-8 py-2 rounded-[37px]">Edit profile details</button>
                        </div>
                    </div>
                    <div className={styles.ratings}>
                        <div className={styles.rating}>
                            <div className={styles.average}>
                                <h4 className="flex items-center gap-2">
                                        {store?.avgRating.rating ? store?.avgRating.rating.toFixed(1) : 0}/5{" "}
                                    {onMobile && (
                                        <span className="text-[#828282] font-normal">Rating</span>
                                    )}
                                </h4>
                                {onDesktop && <p className="text-[#828282]">Rating</p>}
                            </div>

                            <div className={styles.ratingProgress}>
                                {store?.ratingWithPercent.map((item, index) => {
                                    return (
                                        <div className={styles.value} key={index}>
                                            <p>
                                                {item.rating}{" "}
                                                <span>
                                                    <GreenStarIcon />
                                                </span>
                                            </p>
                                            <div className={styles.progress}>
                                                <div
                                                    className={styles.bar}
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                            <p className={styles.rangeValue}>
                                                {item.total!.toLocaleString()}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SellerPageStoreRating;
