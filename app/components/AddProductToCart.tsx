'use client'
import React, { useState } from 'react'
import styles from '../categories/[categoryId]/SingleCategory.module.scss'
import QuantityButton from './QuantityButton'
import { FavoriteIcon, ShoppingIcon } from './SVGs/SVGicons'
import images from '@/public/images'
import Image from 'next/image'

type Props = {}

const AddProductToCart = (props: Props) => {
    const imageUrl = [
        { url: images.singleProduct },
        { url: images.singleProduct2 },
        { url: images.singleproduct3 },
        { url: images.singleProduct2 },
        { url: images.singleproduct3 },
    ]

    const [mainImage, setMainImage] = useState(imageUrl[0])

    return (
        <div className={styles.productInfo}>
            <div className={styles.lhs}>
                {/* <> */}
                    < Image className={styles.mainImage} src={mainImage.url} alt='product image' />

                    <div className={styles.gallery}>
                        {imageUrl.map((image, index) => (
                            <Image src={image.url}
                                alt='product image'
                                key={index}
                                className={`${image.url === mainImage.url ? styles.active: ''}`}
                                onClick={() => setMainImage(imageUrl[index])} />
                        ))}
                    </div>
                
                {/* </> */}

            </div>
            <div className={styles.rhs}>
                <h1 className={styles.productName}>
                    Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C
                </h1>
                <p className={styles.shipping}>
                    Free Shipping
                </p>
                <h2 className={styles.price}>US $164.99</h2>
                <p>Condition: Brand new  </p>

                <div className={styles.bid}>
                    <p>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C <span>7 Bids at US $168 </span>(Bidding ends on 27th May 2024) <button>Place Bid </button></p>
                </div>
                <button>Contact seller </button>

                <div className={styles.rating}>4 star(add star images) (121 review)</div>
                <QuantityButton />

                <div className={styles.buyNow}>
                    <button>Buy Now</button>
                    <span><ShoppingIcon /></span>
                    <span><FavoriteIcon /></span>
                </div>
            </div>
        </div>
    )
}

export default AddProductToCart



