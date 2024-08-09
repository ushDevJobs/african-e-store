import { ASingleStoreResponse } from '@/app/components/models/IStores'
import React from 'react'
import { AboutStoreSkeletonLoader } from '../StoresSkeleton'

type Props = {
    store: ASingleStoreResponse | undefined
    isFetchingStore: boolean
}

const AboutSeller = ({ store, isFetchingStore }: Props) => {
    return (
        <div className="h-[20vh] overflow-y-auto">
            <h2 className="text-black text-2xl mb-2 font-medium">About</h2>
            {isFetchingStore ? (
                <AboutStoreSkeletonLoader />
            ) : store ? (
                <p className="text-sm text-gray-500 leading-5">
                    {store.storeDetails?.description || "No Description Found"}
                </p>
            ) : (
                <p className='text-center mx-auto w-full'>No Description Found</p>
            )}
        </div>

    )
}

export default AboutSeller