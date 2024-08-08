'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles/RecentlyViewed.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { createCustomErrorMessages } from './constants/catchError'
import { toast } from 'sonner'
import { useFetchReviewedProduct } from '../api/apiClients'
import { ReviewedProductResponse } from './models/IRecommended'
import { FullPageLoader } from '../Loader/ComponentLoader'

type Props = {}

const RecentlyViewed = (props: Props) => {
    const fetchReviewedProducts = useFetchReviewedProduct()

    const [isFetchingReviewedProducts, setIsFetchingReviewedProducts] = useState<boolean>(true);
    const [products, setProducts] = useState<ReviewedProductResponse[]>()

    async function handleFetchReviewedProducts() {

        // Start loader
        setIsFetchingReviewedProducts(true);

        await fetchReviewedProducts()
            .then((response) => {
                // console.log("Response: ", response.data.reviewed);
                setProducts(response.data.reviewed);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingReviewedProducts(false);
            });
    }
    useEffect(() => {
        handleFetchReviewedProducts()
    }, [])
    return (
        <div className={styles.main}>
            <h1>Recently viewed</h1>
            <div className={styles.cards}>
             {products?.map((product, index) => (
                 <div className={styles.card} key={index}>
                     <div className={styles.image}>
                         <Image fill src={product.product.coverImage} alt='product image' />
                     </div>
                     <p>{product.product.name} </p>
                     <h4>&pound;{product.product.amount.toLocaleString()}</h4>
                 </div>
             ))}
            </div>
            {!products && isFetchingReviewedProducts && (
                <div className="h-[30vh]">
                    <FullPageLoader />
                </div>
            )}
            {!products && !isFetchingReviewedProducts && (
                <p className='text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[20vh]'>No recently viewed product found</p>
            )}
        </div>
    )
}

export default RecentlyViewed