import React, { useState } from 'react'
import { DeliveryFeeIcon, HomeIcon, LeftArrowIcon, LeftCaretArrowIcon, LogoutIcon, MessageIcon, UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import styles from '../stores/[storeId]/SellerStore.module.scss'
import Link from 'next/link'
import { accountStyle } from '../styles'
import { SellerStoreResponse } from '../components/models/ISellerStore'
import DeliveryFeeModal from '../components/Modal/DeliveryFeeModal'
import BankDetailModal from '../components/Modal/BankDetailModal'
import { FullPageLoader } from '../Loader/ComponentLoader'

type Props = {
    isFetchingStore: boolean
    store: SellerStoreResponse | undefined
    // Logout: () => Promise<void>
}

const SellerAccountPage = ({ isFetchingStore, store }: Props) => {
    const [isDeliveryFeeModalVisible, setIsDeliveryFeeModalVisible] = useState(false);
    const [isBankDetailModalVisible, setIsBankDetailModalVisible] = useState(false);

    return (
        <>
            <DeliveryFeeModal
                visibility={isDeliveryFeeModalVisible}
                setVisibility={setIsDeliveryFeeModalVisible}
            />

            <BankDetailModal
                visibility={isBankDetailModalVisible}
                setVisibility={setIsBankDetailModalVisible}
            />

            <div className={styles.main}>
                <Link href={'/seller'} className="flex items-center w-full whitespace-nowrap gap-2 mb-8 mt-6">
                    <span className='bg-[#ECF8F5] w-9 h-9 rounded-full grid place-items-center'><LeftCaretArrowIcon /></span>
                    <h1 className='text-[#828282] text-2xl md:text-4xl font-medium'> My Account</h1>
                </Link>
                {isFetchingStore && !store ? (
                    <div className="h-[30vh]">
                        <FullPageLoader />
                    </div>
                ) : store && !isFetchingStore ? (
                    <div className="flex items-center gap-5 mb-10">
                        {store.storeDetails?.image ? (
                            <div className="relative h-[70px] w-[70px] md:h-[190px] md:w-[190px]">
                                <Image
                                    src={store.storeDetails.image}
                                    alt="Logo"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div>
                        ) : (
                            <span className="bg-[#2C7865] h-fit p-3 rounded-full">
                                <UserIcon />
                            </span>
                        )}
                        <div className="flex flex-col">
                            <h3 className="text-lg md:text-xl lg:text-2xl text-[#828282] mb-1 font-medium">
                                {store.storeDetails?.name}
                            </h3>
                            {store.storeDetails?.description && (
                                <p className="text-sm text-[#333333] mb-1">
                                    {store.storeDetails.description.length > 50
                                        ? `${store.storeDetails.description.slice(0, 50)}...`
                                        : store.storeDetails.description}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className='text-[#828282] text-center'>No store found</p>
                )}


                {store && (
                    <div className="flex flex-col gap-4">
                        <p onClick={() => setIsBankDetailModalVisible(true)} className={`${accountStyle}`}><span><HomeIcon /></span> Bank Details</p>
                        <p onClick={() => setIsDeliveryFeeModalVisible(true)} className={`${accountStyle}`}><span><DeliveryFeeIcon /></span> Delivery fee</p>
                        <p className={`${accountStyle}`}><span><MessageIcon /></span> Messages</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default SellerAccountPage