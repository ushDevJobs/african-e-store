import React from 'react'
import styles from '../styles/HomePage/ExclusiveSection.module.scss'
import Image from 'next/image'
import images from '@/public/images'
type Props = {}

const ExclusiveItemSection = (props: Props) => {
    return (
        <div className={styles.main}>
            <h2>Exclusive items for Africans </h2>
            <p>Get africa-only goods, exclusive to africans only </p>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.images}>
                        <Image src={images.cashew} alt='product iamge' fill />
                    </div>
                    <span>Cashew bag, 120kg with additional add ons and an extra bowl</span>
                    <h4>$250</h4>
                </div>
                <div className={styles.card}>
                    <div className={styles.images}>
                        <Image src={images.cashew} alt='product iamge' fill />
                    </div>
                    <span>Cashew bag, 120kg with additional add ons and an extra bowl</span>
                    <span>Pre-owned</span>
                    <h4>$250</h4>
                </div>
                <div className={styles.card}>
                    <div className={styles.images}>
                        <Image src={images.cashew} alt='product iamge' fill />
                    </div>
                    <span>Cashew bag, 120kg with additional add ons and an extra bowl</span>
                    <span>Pre-owned</span>
                    <h4>$250</h4>
                </div>
                <div className={styles.card}>
                    <div className={styles.images}>
                        <Image src={images.cashew} alt='product iamge' fill />
                    </div>
                    <span>Cashew bag, 120kg with additional add ons and an extra bowl</span>
                    <span>Pre-owned</span>
                    <h4>$250</h4>
                </div>
                <div className={styles.card}>
                    <div className={styles.images}>
                        <Image src={images.cashew} alt='product iamge' fill />
                    </div>
                    <span>Cashew bag, 120kg with additional add ons and an extra bowl</span>
                    <span>Pre-owned</span>
                    <h4>$250</h4>
                </div>


            </div>
        </div>
    )
}

export default ExclusiveItemSection