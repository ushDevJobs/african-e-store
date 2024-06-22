'use client'
import React, { useEffect, useState } from 'react'
import styles from '../products/[productId]/SingleCategory.module.scss'
import QuantityButton from './QuantityButton'
import { FavoriteIcon, RatingIcon, ShoppingIcon } from './SVGs/SVGicons'
import images from '@/public/images'
import Image from 'next/image'
import Link from 'next/link'
import useResponsiveness from './hooks/responsiveness-hook'
import PlaceABidComponent from '../products/[productId]/PlaceABidComponent'
import { ProductResponse } from './models/IProduct'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../redux/store'
import { decrement, increment, productQtyInCartSelector } from '../redux/features/cart/cartSlice'
import ComponentLoader from './Loader/ComponentLoader'
import { useAccountStatus } from '../context/AccountStatusContext'
import { useRouter } from 'next/navigation'

type Props = {
    product: ProductResponse | undefined
    isFetchingProduct: boolean
}

const AddProductToCart = ({ product, isFetchingProduct }: Props) => {
    const dispatch = useDispatch();
    const { accountStatus, fetchAccountStatus } = useAccountStatus();
    const quantityInCart = useSelector((state: RootState) => productQtyInCartSelector(state, product?.id as string))
    // console.log({ quantityInCart })
    const router = useRouter();
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
    useEffect(() => {
        fetchAccountStatus();
    }, []);
    return (
        <>
            <PlaceABidComponent visibility={isPlaceABidVisible} setVisibility={setIsPlaceABidVisible} />
            <div className={styles.productInfo}>
                {product && (
                    <>
                        <div className={styles.lhs}>
                            <Image className={styles.mainImage} src={mainImage.url} alt='product image' />
                            <div className={styles.gallery}>
                                {imageUrl.map((image, index) => (
                                    <Image src={image.url}
                                        alt='product image'
                                        key={index}
                                        className={`${image.url === mainImage.url ? styles.active : ''}`}
                                        onClick={() => setMainImage(imageUrl[index])} />
                                ))}
                            </div>
                        </div>
                        <div className={styles.rhs}>
                            {onMobile && (
                                <div className="flex items-center justify-between mt-3 mb-7">
                                    {!quantityInCart && (
                                        <span className='border border-[#828282] rounded-3xl py-2 px-16 cursor-pointer' onClick={() => dispatch(increment(product as ProductResponse))}><ShoppingIcon /> </span>
                                    )}
                                    <Link className='border border-[#828282] ml-auto rounded-3xl py-2 px-16' href={'/'}>
                                        <span><FavoriteIcon /></span>
                                    </Link></div>
                            )
                            }
                            <h1 className={styles.productName}>
                                {product?.name}
                            </h1>
                            {onDesktop &&
                                <p className={styles.shipping}>
                                    {/* {product?.shippingDetails} */}
                                    shipping details here
                                </p>}
                            {onDesktop && <h2 className={styles.price}>&pound;{product?.amount.toLocaleString()}</h2>}
                            <p className='text-[#828282] text-base mb-8 md:mb-5'>Condition: {product?.itemCondition} </p>
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
                                    <p>{product.name} <span className='text-[#FD6A02] text-base'>7 Bids at US $168 </span>(Bidding ends on 27th May 2024) <button onClick={() => setIsPlaceABidVisible(true)}>Place Bid </button></p>
                                    <Link href={'/contact-seller'}><button className='mt-1'>Contact seller </button></Link>
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
                            {onMobile && <h2 className='text-[#1E1E1E] font-semibold mb-3 text-xl'>&pound;{product?.amount.toLocaleString()}</h2>}
                            {quantityInCart &&
                                <QuantityButton
                                    onIncrease={() => dispatch(increment(product as ProductResponse))}
                                    onDecrease={() => dispatch(decrement(product as ProductResponse))}
                                    qty={quantityInCart ?? 0}
                                />
                            }
                            <div className={styles.buyNow}>
                                    <button onClick={() => {
                                        accountStatus && accountStatus.accountType == 'BUYER' ?
                                            router.push('/checkout') :
                                            router.push('/login')
                                    }}>Buy Now</button>
                                {onDesktop && (
                                    <>
                                        {!quantityInCart && (
                                            <span className={`${styles.icon} cursor-pointer`} onClick={() => dispatch(increment(product as ProductResponse))}><ShoppingIcon /> </span>
                                        )}
                                        <Link className={styles.icon} href={'/'}>
                                            <span><FavoriteIcon /></span>
                                        </Link>
                                    </>
                                )}
                            </div>
                            {onMobile && <div className={`${styles.bid} mt-4`}>
                                <p>Estimated between Tue, Jun 18 and Tue, Jul 16 to 502001 Please note the delivery estimate is greater than 38 business days. Seller ships within 1 day after receiving cleared payment. <br /> <br />
                                    <span className='text-[#FD6A02] text-base'>7 Bids at US $168 </span>(Bidding ends on 27th May 2024) <button onClick={() => setIsPlaceABidVisible(true)}>Place Bid </button></p>
                                <Link href={'/contact-seller'}><button className='mt-1'>Contact seller </button></Link>
                            </div>}
                        </div>
                    </>
                )}
                {!product && isFetchingProduct && (
                    <div className="min-h-[60vh]">
                        <ComponentLoader lightTheme svgStyle={{ width: '62px' }} />
                    </div>
                )}
                {!product && !isFetchingProduct &&
                    <p className='text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[50vh]'>No product found</p>
                }
            </div>
        </>
    )
}

export default AddProductToCart



