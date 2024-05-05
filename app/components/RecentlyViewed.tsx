import React from 'react'
import styles from '../styles/RecentlyViewed.module.scss'
import Image from 'next/image'
import images from '@/public/images'

type Props = {}

const RecentlyViewed = (props: Props) => {
    return (
        <div className={styles.main}>
            <h1>Recently viewed</h1>
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
    )
}

export default RecentlyViewed