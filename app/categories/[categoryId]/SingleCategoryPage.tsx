import React from 'react'
import styles from './SingleCategory.module.scss'
import AddProductToCart from '@/app/components/AddProductToCart'
import Recommendations from '@/app/components/Recommendations'

type Props = {}

const SingleCategoryPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <AddProductToCart />
            <Recommendations />
        </div>
    )
}

export default SingleCategoryPage