'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles/RecentlyViewed.module.scss'
import Image from 'next/image'
import { useFetchRecommendedProduct } from '../api/apiClients'
import { createCustomErrorMessages } from './constants/catchError'
import { toast } from 'sonner'
import { RecommendedResponse } from './models/IRecommended'
import Link from 'next/link'
import { FullPageLoader } from '../Loader/ComponentLoader'

type Props = {}

const Recommendations = (props: Props) => {

    const fetchRecommendedProducts = useFetchRecommendedProduct()

    const [isFetchingRecommendedProducts, setIsFetchingRecommendedProducts] = useState<boolean>(true);
    const [products, setProducts] = useState<RecommendedResponse[]>()

    async function handleFetchRecommendedProducts() {

        // Start loader
        setIsFetchingRecommendedProducts(true);

        await fetchRecommendedProducts()
            .then((response) => {
                // console.log("Response: ", response.data.recommended);
                setProducts(response.data.recommended);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingRecommendedProducts(false);
            });
    }
    useEffect(() => {
        handleFetchRecommendedProducts()
    }, [])

    return (
        <div className={styles.main}>
            <h1 className='mb-3'>Recommended for you</h1>
            <div className={styles.cards}>
                {products?.slice(0, 8).map((product, index) => (
                    <Link href={`/products/${product.id}`} className={styles.card} key={index}>
                        <div className={styles.image}>
                            <Image fill src={product.coverImage} alt='product image' />
                        </div>
                        <p>{product.name} </p>
                        <h4>&pound;{product.amount.toLocaleString()}</h4>
                    </Link>
                ))}
            </div>
            {!products && isFetchingRecommendedProducts && (
                <div className="h-[30vh]">
                    <FullPageLoader />
                </div>
            )}
            {!products && !isFetchingRecommendedProducts && (
                <p className='text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[20vh]'>No recommended product found</p>
            )}
        </div>
    )
}

export default Recommendations