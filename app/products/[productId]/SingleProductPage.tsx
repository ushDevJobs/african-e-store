'use client'
import React, { useEffect, useState } from 'react'
import styles from './SingleCategory.module.scss'
import AddProductToCart from '@/app/components/AddProductToCart'
import Recommendations from '@/app/components/Recommendations'
import SingleCategoryReviews from './SingleCategoryReviews'
import SingleCategoriesDetails from './SingleCategoriesDetails'
import { useFetchProduct } from '@/app/api/apiClients'
import { createCustomErrorMessages } from '@/app/components/constants/catchError'
import { toast } from 'sonner'
import { ProductResponse } from '@/app/components/models/IProduct'

type Props = {
    params: {
        productId: string;
    }
}

const SingleProductPage = ({params}: Props) => {
    const fetchProduct = useFetchProduct()
    const productId = params.productId;
    const [product, setProduct] = useState<ProductResponse>();
    const [isFetchingProduct, setIsFetchingProduct] = useState<boolean>(true);
   
    async function handleFetchProduct() {

        // Start loader
        setIsFetchingProduct(true);

        await fetchProduct(productId)
            .then((response) => {
                console.log("Response: ", response.data.data);
                setProduct(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingProduct(false);
            });
    }

    useEffect(() => {
        handleFetchProduct();
    }, []);
    return (
        <div className={styles.main}>
            <AddProductToCart product={product} isFetchingProduct={isFetchingProduct} />
            <SingleCategoriesDetails product={product} />
            <SingleCategoryReviews product={product} />
            <Recommendations />
        </div>
    )
}

export default SingleProductPage