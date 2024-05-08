import React from 'react'
import styles from './Stores.module.scss'
import CategoriesHeader from '../components/CategoriesHeader'
import Image from 'next/image'
import images from '@/public/images'
import { SearchIcon } from '../components/SVGs/SVGicons'

type Props = {}

const StorePage = (props: Props) => {
    return (
        <div className={styles.main}>
            <CategoriesHeader mainText='Explore different stores on Rayvvin ' subText='Search for any store of your choice, rayvvin ensures the authenticity of vendors ' />

            <div className={styles.contents}>
                <div className={styles.fieldContainer}>
                    <SearchIcon />
                    <input type="text" placeholder='Search name of store ' />
                </div>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                        </div>
                        <p>Dog food 3 pcs bag </p>
                        <h4>$250</h4>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                        </div>
                        <p>Dog food 3 pcs bag </p>
                        <h4>$250</h4>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                        </div>
                        <p>Dog food 3 pcs bag </p>
                        <h4>$250</h4>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <Image fill src={images.cashew} alt='product image' />
                        </div>
                        <p>Dog food 3 pcs bag </p>
                        <h4>$250</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StorePage