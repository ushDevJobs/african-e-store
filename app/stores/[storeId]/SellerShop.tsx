import React from 'react'
import styles from './SellerStore.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import images from '@/public/images'
import { StoreCategoriesResponse } from '@/app/components/models/IStores'

type Props = {
    storeCategories: StoreCategoriesResponse | undefined;
    isFetchingStoreCategories: boolean
}

const SellerShop = ({ storeCategories, isFetchingStoreCategories }: Props) => {
    return (
       <div className='flex flex-col gap-10'>
            {storeCategories?.categories.map((category) => (
                <div className='flex flex-col'
                    key={category.id}
                >
                    <h3 className='text-lg  md:text-xl text-[#2c7865] mb-5 font-semibold underline'>{category.name}</h3>
                    <div className={styles.cards}>
                        {category.products.map((product, index) => (
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
}

export default SellerShop