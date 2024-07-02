import React, { useEffect, useState } from 'react'
import styles from './SellerStore.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import images from '@/public/images'
import { StoreCategoriesResponse, StoreProducts } from '@/app/components/models/IStores'
import { StoreCategoriesSkeletonLoader } from '../StoresSkeleton'

type Props = {
    isFetchingProducts: boolean
    handleFetchStoreCategories: () => Promise<void>
    filteredStoreProducts: StoreProducts[] | undefined
}

const SellerShop = ({ filteredStoreProducts, isFetchingProducts, handleFetchStoreCategories }: Props) => {
    return (
        <>
            {isFetchingProducts ? (
                <StoreCategoriesSkeletonLoader />
            ) : (
                (filteredStoreProducts === undefined || filteredStoreProducts.length === 0) ? (
                    <p className='text-center text-gray-600'>No product found</p>
                ) : (
                    <div className='flex flex-col gap-10'>
                        <div className={styles.cards}>
                                    {filteredStoreProducts.map((product) => (
                                // id = { category.id.toString() }
                                <Link href={`/products/${product.id}`} className={styles.card} key={product.id}>
                                    <div className={styles.image}>
                                        <Image fill src={images.cashew} alt='product image' />
                                    </div>
                                    <p>{product.name} </p>
                                    <h4>&pound;{product.amount.toLocaleString()}</h4>
                                </Link>
                            ))}
                        </div>
                        {/* {filteredStoreProducts?.map((product) => (
                            id = { category.id.toString() }
                            <div className='flex flex-col' key={product.id}>
                                <h3 className='text-lg md:text-xl text-[#2c7865] mb-5 font-semibold underline'>{product.name}</h3>
                                
                            </div>
                        ))} */}
                    </div>
                )
            )}
        </>
    )
}

export default SellerShop