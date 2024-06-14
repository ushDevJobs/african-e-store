import React from 'react'
import styles from './SingleCategory.module.scss'
import AddProductToCart from '@/app/components/AddProductToCart'
import Recommendations from '@/app/components/Recommendations'
import SingleCategoryReviews from './SingleCategoryReviews'
import SingleCategoriesDetails from './SingleCategoriesDetails'

type Props = {}

const SingleCategoryPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <AddProductToCart />
            <SingleCategoriesDetails />
            <SingleCategoryReviews />
            <Recommendations />
        </div>
    )
}

export default SingleCategoryPage