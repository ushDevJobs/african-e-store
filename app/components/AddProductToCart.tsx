'use client'
import React, { useState } from 'react'
import styles from '../categories/[categoryId]/SingleCategory.module.scss'
import QuantityButton from './QuantityButton'
import { FavoriteIcon, RatingIcon, ShoppingIcon } from './SVGs/SVGicons'
import images from '@/public/images'
import Image from 'next/image'
import Link from 'next/link'
import useResponsiveness from './hooks/responsiveness-hook'
import PlaceABidComponent from '../categories/[categoryId]/PlaceABidComponent'

type Props = {}

const AddProductToCart = (props: Props) => {

    const [isPlaceABidVisible, setIsPlaceABidVisible] = useState(false)

    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const imageUrl = [
        { url: images.singleProduct },
        { url: images.singleProduct2 },
        { url: images.singleproduct3 },
        { url: images.singleProduct2 },
        { url: images.singleproduct3 },
    ]

    const [mainImage, setMainImage] = useState(imageUrl[0])

    return (
     <>
     <PlaceABidComponent visibility={isPlaceABidVisible} setVisibility={setIsPlaceABidVisible}/>
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
                    {onMobile && (
                        <div className="flex items-center justify-between mt-3 mb-7">
                            <Link className='border border-[#828282] rounded-3xl py-2 px-16' href={'/cart'} >
                                <span><ShoppingIcon /></span>
                            </Link>
                            <Link className='border border-[#828282] rounded-3xl py-2 px-16' href={'/'}>
                                <span><FavoriteIcon /></span>
                            </Link></div>
                    )
                    }
                    <h1 className={styles.productName}>
                        Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C
                    </h1>
                    {onDesktop &&
                        <p className={styles.shipping}>
                            Free Shipping, Free 30 Day Returns Shipping from South Africa specific town
                        </p>}
                    {onDesktop && <h2 className={styles.price}>US $164.99</h2>}
                    <p className='text-[#828282] text-base mb-8'>Condition: Brand new  </p>
                    {onMobile &&
                        <div className={`${styles.rating} -mt-7`}>
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
                            <p className=' text-[#2C7865] text-sm'>(121 review)</p>
                        </div>}

                    {onDesktop &&
                        <div className={styles.bid}>
                            <p>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C <span className='text-[#FD6A02] text-base'>7 Bids at US $168 </span>(Bidding ends on 27th May 2024) <button onClick={() => setIsPlaceABidVisible(true)}>Place Bid </button></p>
                            <button className='mt-1'>Contact seller </button>
                        </div>}

                    {onDesktop && <div className={styles.rating}>
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
                    </div>}
                    {onMobile && <h2 className='text-[#1E1E1E] font-semibold mb-3 text-xl'>US $164.99</h2>}
                    <QuantityButton />

                    <div className={styles.buyNow}>
                        <Link href={'/checkout'}>
                            <button>Buy Now</button>
                        </Link>
                        {onDesktop && (
                            <>
                                <Link className={styles.icon} href={'/cart'}>
                                    <span><ShoppingIcon /></span>
                                </Link>
                                <Link className={styles.icon} href={'/'}>
                                    <span><FavoriteIcon /></span>
                                </Link>
                            </>
                        )}
                    </div>
                    {onMobile && <div className={`${styles.bid} mt-4`}>
                        <p>Estimated between Tue, Jun 18 and Tue, Jul 16 to 502001 Please note the delivery estimate is greater than 38 business days. Seller ships within 1 day after receiving cleared payment. <br /> <br />
                            <span className='text-[#FD6A02] text-base'>7 Bids at US $168 </span>(Bidding ends on 27th May 2024) <button onClick={() => setIsPlaceABidVisible(true)}>Place Bid </button></p>
                        <button className='mt-1'>Contact seller </button>
                    </div>}
                </div>
            </div>
     </>
    )
}

export default AddProductToCart



