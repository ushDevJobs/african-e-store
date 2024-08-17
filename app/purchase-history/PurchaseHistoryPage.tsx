'use client'
import React, { useEffect, useState } from 'react'
import styles from '../saved-store/SavedStore.module.scss'
import { CheckIcon, EmptyStarIcon, UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'
import ReviewModal from '../components/Modal/ReviewModal'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useFetchPurchaseHistory } from '../api/apiClients'
import { PurchaseHistoryResponse, PurchaseOrderDetails } from '../components/models/IUserOrder'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import { FullPageLoader } from '../Loader/ComponentLoader'
type Props = {}

const PurchaseHistoryPage = (props: Props) => {
    const fetchPurchaseHistory = useFetchPurchaseHistory();
    const router = useRouter()
    const [reviewModal, setReviewModal] = useState(false)

    const [histories, setHistories] = useState<PurchaseHistoryResponse[]>();
    const [selectedHistory, setSelectedHistory] = useState<PurchaseOrderDetails>();
    const [isFetchingHistories, setIsFetchingHistories] = useState<boolean>(true);

    async function handleFetchHistories({ clearPreviousHistories = false }) {

        // Show loader

        if (clearPreviousHistories) {
            // Clear previous configurations
            setHistories(undefined);
            // Show loader
            setIsFetchingHistories(true);
        }
        await fetchPurchaseHistory()
            .then((response) => {
                console.log("Response: ", response.data.data);
                setHistories(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingHistories(false);
            });
    }
    useEffect(() => {
        handleFetchHistories({ clearPreviousHistories: true })
    }, []);

    return (
        <>
            <ReviewModal visibility={reviewModal} setVisibility={setReviewModal} selectedHistory={selectedHistory} handleFetchHistories={handleFetchHistories}/>
            <div className={styles.main}>
                <h2 className='text-2xl text-[#828282] mb-4 font-medium'>Purchase history  </h2>
                <p className='text-[#828282] text-base mb-8'>See items you have bought on Rayvvin  </p>
                <div className='flex flex-col gap-8'>
                    {histories?.map((history, index) => (
                        <div key={index} className="flex flex-col gap-8 bg-[#F7FAFA] rounded-lg py-5 px-7">
                            {history.orderDetails.map((detail, index) => (
                                <div key={index}>
                                    <div className="flex gap-2 items-center mb-2">
                                        <span className='bg-[#2C7865] h-fit p-3 rounded-full'><UserIcon /></span>
                                        <p className='font-medium text-[#828282] w-fit border-b border-b-[#828282] text-base md:text-xl'>{detail.store.name}</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:gap-10 md:items-center md:justify-between">
                                        <div className="flex items-center gap-10 mb-8 md:mb-0">
                                            <div className="relative w-[100px] h-[100px] md:w-[113px] md:h-[137px]"> <Image src={detail.product.coverImage} fill alt='product image' /></div>
                                            <div className="flex flex-col gap-3">
                                                <h2 className=' text-[#1E1E1E] w-fit text-base md:text-xl border-b border-b-[#1E1E1E]'>{detail.product.name}</h2>
                                                <h3 className='font-medium text-[#1E1E1E] text-base md:text-xl'>&pound;{detail.amount}</h3>
                                                <ul className='flex flex-wrap gap-3 text-[#828282] text-sm'>
                                                    <li>Shipping &pound;{detail.shippingFee}</li>
                                                    {/* <li>Status: Auction</li>
                                                    <li>20-08-24</li>
                                                    <li>Home Delivery</li> */}
                                                </ul>
                                                <p className='flex items-center gap-3 text-[#2C7865] text-sm font-bold'><span className='p-3 rounded-full bg-[#C4E7B1]'><CheckIcon /></span>{detail.status == 'DELIVERED' && 'Delivered successfully '}</p>
                                            </div>
                                        </div>

                                        <button onClick={() => {
                                            setSelectedHistory(detail)
                                            setReviewModal(true)
                                        }} className='bg-[#2C7865] flex items-center gap-2 whitespace-nowrap text-white text-sm font-medium rounded-3xl py-4 px-8'><EmptyStarIcon /> Leave a review</button>
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-5 items-center text-sm font-medium">
                                {/* <button className='text-[#2C7865] border-b border-b-[#2C7865]'>See Details</button> */}
                                <Link href='/report-item' className='text-[#FD6A02] border-b border-b-[#FD6A02]'>Report item</Link>
                            </div>
                        </div>
                    ))}
                </div>
                {!histories && isFetchingHistories && (
                    <FullPageLoader />
                )}
                {!histories && !isFetchingHistories &&
                    <p className={styles.loaderText}>No result found</p>
                }
            </div>
        </>
    )
}

export default PurchaseHistoryPage