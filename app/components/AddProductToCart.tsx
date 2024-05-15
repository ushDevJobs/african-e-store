'use client'
import React, { useState } from 'react'
import styles from '../categories/[categoryId]/SingleCategory.module.scss'
import QuantityButton from './QuantityButton'
import { FavoriteIcon, RatingIcon, ShoppingIcon } from './SVGs/SVGicons'
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
                            className={`${image.url === mainImage.url ? styles.active : ''}`}
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
                    Free Shipping, Free 30 Day Returns Shipping from South Africa specific town
                </p>
                <h2 className={styles.price}>US $164.99</h2>
                <p className='text-[#828282] text-base mb-8'>Condition: Brand new  </p>

                <div className={styles.bid}>
                    <p>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C <span className='text-[#FD6A02] text-base'>7 Bids at US $168 </span>(Bidding ends on 27th May 2024) <button>Place Bid </button></p>
                    <button className='mt-1'>Contact seller </button>
                </div>


                <div className={styles.rating}>
                    <span className='flex items-center'>
                        {[1, 2, 3, 4].map((_, index) => (
                            <span key={index} className={index != 5 ? 'mr-1' : ''}>
                                <RatingIcon colored={true} />
                            </span>
                        ))}
                        {[1].map((_, index) => (
                                    <span key={index}>
                                        <RatingIcon />
                                    </span>
                                ))}
                    </span>
                    <p className='text-base text-[#2C7865]'>(121 review)</p>
                </div>
                <QuantityButton />

                <div className={styles.buyNow}>
                    <button>Buy Now</button>
                    <span className={styles.icon}><ShoppingIcon /></span>
                    <span className={styles.icon}><FavoriteIcon /></span>
                </div>
            </div>
        </div>
    )
}

export default AddProductToCart



