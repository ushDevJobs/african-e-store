import React, { useEffect, useState } from 'react'
import styles from './SellerStore.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import images from '@/public/images'
import { StoreCategories, StoreCategoriesResponse } from '@/app/components/models/IStores'
import { StoreCategoriesSkeletonLoader } from '../StoresSkeleton'

type Props = {
    isFetchingStoreCategories: boolean;
    handleFetchStoreCategories: () => Promise<void>
    filteredStoreCategories: StoreCategories[] | undefined
}

const SellerShop = ({ filteredStoreCategories, isFetchingStoreCategories, handleFetchStoreCategories }: Props) => {
    return (
        <>
            {isFetchingStoreCategories ? (
                <StoreCategoriesSkeletonLoader />
            ) : (
                (filteredStoreCategories === undefined || filteredStoreCategories.length === 0) ? (
                    <p className='text-center text-gray-600'>No product found</p>
                ) : (
                    <div className='flex flex-col gap-10'>
                        {filteredStoreCategories?.map((category) => (
                            <div className='flex flex-col' key={category.id} id={category.id.toString()}>
                                <h3 className='text-lg md:text-xl text-[#2c7865] mb-5 font-semibold underline'>{category.name}</h3>
                                <div className={styles.cards}>
                                    {category.products.map((product) => (
                                        <div className={styles.card} key={product.id} id={category.id.toString()}>
                                            <div className={styles.image}>
                                                <Image fill src={images.cashew} alt='product image' />
                                            </div>
                                            <p>{product.name} </p>
                                            <h4>&#8358;{product.amount.toLocaleString()}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </>
    )
}

export default SellerShop