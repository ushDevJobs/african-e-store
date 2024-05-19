import React from 'react'
import styles from './SellerStore.module.scss'
import CategoriesSettingsBar from '../components/CategoriesSettingsBar'
import Link from 'next/link'
import Image from 'next/image'
import images from '@/public/images'

type Props = {}

const SellerShop = (props: Props) => {
    return (
        <div className={styles.cards}>
            <Link href={'/categories/2'}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image fill src={images.cashew} alt='product image' />
                    </div>
                    <p>Dog food 3 pcs bag </p>
                    <h4>$250</h4>
                </div>
            </Link>
            <Link href={'/categories/2'}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image fill src={images.cashew} alt='product image' />
                    </div>
                    <p>Dog food 3 pcs bag </p>
                    <h4>$250</h4>
                </div>
            </Link>
            <Link href={'/categories/2'}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image fill src={images.cashew} alt='product image' />
                    </div>
                    <p>Dog food 3 pcs bag </p>
                    <h4>$250</h4>
                </div>
            </Link>
            <Link href={'/categories/2'}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image fill src={images.cashew} alt='product image' />
                    </div>
                    <p>Dog food 3 pcs bag </p>
                    <h4>$250</h4>
                </div>
            </Link>
            <Link href={'/categories/2'}>
                <div className={styles.card}>
                    <div className={styles.image}>
                        <Image fill src={images.cashew} alt='product image' />
                    </div>
                    <p>Dog food 3 pcs bag </p>
                    <h4>$250</h4>
                </div>
            </Link>

        </div>
    )
}

export default SellerShop