import React, { useEffect, useState } from 'react'
import { SellerStoreResponse } from '../components/models/ISellerStore'
import { AboutStoreSkeletonLoader } from '../stores/StoresSkeleton'
import { useFetchStoreSummary } from '../api/apiClients'
import { StoreSummary } from '../components/models/IProduct'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import { IncomeIcon, OrderIcon, SmallLineIcon, StockIcon, UserMessageIcon } from '../components/SVGs/SVGicons'
import Link from 'next/link'

type Props = {
    store: SellerStoreResponse | undefined
    isFetchingStore: boolean
}

const AboutSeller = ({ store, isFetchingStore }: Props) => {
    const fetchSummary = useFetchStoreSummary()

    const [summary, setSummary] = useState<StoreSummary>()
    const [isFetchingSummary, setIsFetchingSummary] = useState<boolean>(true)

    async function handleFetchSummary() {

        // Show loader
        setIsFetchingSummary(true);
        await fetchSummary()
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setSummary(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingSummary(false);
            });
    }
    useEffect(() => {
        handleFetchSummary()
    }, [])
    return (
        <div className=''>

            {!store && summary && isFetchingSummary && isFetchingStore ? <AboutStoreSkeletonLoader /> : (
                <div className='flex flex-col gap-20'>
                    <div className="flex gap-10 w-full h-full hideScrollBar overflow-x-auto">
                        <Link href={`/income`} className="bg-transparent shadow overflow-hidden min-w-[194px] p-4 flex flex-col gap-2 text-[#828282] rounded-[14px]">
                            <p className='flex items-center gap-2 mb-2'><IncomeIcon /> Income</p>
                            <h2 className='text-2xl mb-2 font-medium'>&pound;{summary?.income.toLocaleString()}</h2>
                            <p className='flex items-center justify-between whitespace-nowrap gap-3'>This month <SmallLineIcon /></p>
                        </Link>
                        <div className="bg-transparent shadow overflow-hidden min-w-[194px] p-4 flex flex-col gap-2 text-[#828282] rounded-[14px]">
                            <p className='flex items-center gap-2  mb-2'><StockIcon /> Stock</p>
                            <h2 className='text-2xl mb-2 font-medium'>{summary?.stock}</h2>
                            <p className='flex items-center justify-between whitespace-nowrap gap-3'>Items</p>
                        </div>
                        <div className="bg-transparent shadow overflow-hidden min-w-[194px] p-4 flex flex-col gap-2 text-[#828282] rounded-[14px]">
                            <p className='flex items-center gap-2  mb-2'><UserMessageIcon /> User messages </p>
                            <h2 className='text-2xl mb-2 font-medium text-[#2C7865]'>{summary?.messages}</h2>
                            <p className='flex items-end justify-end whitespace-nowrap gap-3'><SmallLineIcon /></p>
                        </div>
                        <div className="bg-transparent shadow overflow-hidden min-w-[194px] p-4 flex flex-col gap-2 text-[#828282] rounded-[14px]">
                            <p className='flex items-center gap-2  mb-2'><OrderIcon /> Fulfilled orders</p>
                            <h2 className='text-2xl mb-2 font-medium'>&pound;{summary?.fufilledOrders}</h2>
                            <p className='flex items-center justify-between whitespace-nowrap gap-3'>All time</p>
                        </div>
                    </div>

                    <div className="">
                        <h2 className='text-black text-2xl mb-2 font-medium'>About</h2>
                        <p className='text-sm text-gray-500 leading-5'>{store?.storeDetails.description}</p>
                    </div></div>
            )
            }
        </div>
    )
}

export default AboutSeller