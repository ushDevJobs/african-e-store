import React, { useEffect, useState } from 'react';
import styles from '../products/[productId]/SingleCategory.module.scss';
import QuantityButton from './QuantityButton';
import { FavoriteIcon, FilledLoveIcon, RatingIcon, ShoppingIcon } from './SVGs/SVGicons';
import Image from 'next/image';
import Link from 'next/link';
import useResponsiveness from './hooks/responsiveness-hook';
import PlaceABidComponent from '../products/[productId]/PlaceABidComponent';
import { ProductResponse } from './models/IProduct';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../redux/store';
import { decrement, increment, productQtyInCartSelector } from '../redux/features/cart/cartSlice';
import { useAccountStatus } from '../context/AccountStatusContext';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { FullPageLoader } from '../Loader/ComponentLoader';

type Props = {
    product: ProductResponse | undefined;
    isFetchingProduct: boolean;
    handleAddProductToFavorite: (id: string) => Promise<void>
    handleRemoveProductFromFavorite: (id: string) => Promise<void>
};

const AddProductToCart = ({ product, isFetchingProduct, handleAddProductToFavorite, handleRemoveProductFromFavorite }: Props) => {
    const dispatch = useDispatch();
    const { accountStatus, fetchAccountStatus } = useAccountStatus();
    const quantityInCart = useSelector((state: RootState) => productQtyInCartSelector(state, product?.id as string));
    const router = useRouter();
    const [isPlaceABidVisible, setIsPlaceABidVisible] = useState(false);

    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile === 'boolean' && isMobile;
    const onDesktop = typeof isMobile === 'boolean' && !isMobile;
    // console.log({product})
    let imagesUrls: string[] = [];

    if (product && product.images) {
        let imageUrlsArray: string[];

        if (typeof product.images === 'string') {
            imageUrlsArray = JSON.parse(product.images);
        } else {
            imageUrlsArray = product.images;
        }

        imagesUrls = imageUrlsArray.map(image => image);
    }

    const [mainImage, setMainImage] = useState(imagesUrls[0]);
    // console.log({ mainImage })
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
                            <div className="relative h-[350px] w-full overflow-hidden rounded-[14px] p-8">
                                <Image className='object-cover' src={mainImage ?? product.coverImage} alt='product image' fill />
                            </div>
                            <div className={styles.gallery}>
                                {imagesUrls.map((image, index) => (
                                    <div className="h-[100px] w-full rounded-[14px] cursor-pointer border border-[#ede9e9] relative" key={index}>
                                        <Image
                                            src={image}
                                            alt='product image'
                                            fill
                                            className={`${image === mainImage ? styles.active : 'object-cover'}`}
                                            onClick={() => setMainImage(image)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.rhs}>
                            {onMobile && (
                                <div className="flex items-center justify-between mt-3 mb-7">
                                    {!quantityInCart && (
                                        <span className='border border-[#828282] rounded-3xl py-2 px-16 cursor-pointer' onClick={() => dispatch(increment(product as ProductResponse))}><ShoppingIcon /> </span>
                                    )}
                                    <span
                                        className='border border-[#828282] cursor-pointer ml-auto rounded-3xl py-2 px-16'
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent navigation on click
                                            if (product.favourite.length === 0) {
                                                handleAddProductToFavorite(product.id);
                                            } else {
                                                handleRemoveProductFromFavorite(product.id);
                                            }
                                        }}>
                                        {product.favourite.length === 0 ? <FavoriteIcon /> : <FilledLoveIcon />}
                                    </span>
                                </div>
                            )}
                            <h1 className={styles.productName}>{product?.name}</h1>
                            <p className='text-[#828282] text-base mt-1 mb-1 md:mt-1 md:mb-2'> {product?.details}</p>
                            {/* {onDesktop && <p className={styles.shipping}>{product?.shippingDetails}</p>} */}
                            {onDesktop && <h2 className={styles.price}>&pound;{product?.amount.toLocaleString()}</h2>}
                            <p className='text-[#828282] text-base mb-8 md:mb-5'>Condition: {product?.itemCondition}</p>
                            {onMobile && (
                                <div className={`${styles.rating} -mt-7`}>
                                    {/* <span className='flex items-center'>
                                        {[...Array(maxRating)].map((_, index) => (
                                            <span key={index} className={index !== maxRating - 1 ? 'mr-1' : ''}>
                                                {index < filledRatings.length ? (
                                                    <RatingIcon colored={true} /> // Render filled rating icon
                                                ) : (
                                                    <RatingIcon /> // Render empty rating icon
                                                )}
                                            </span>
                                        ))}
                                    </span> */}
                                    <p className=' text-[#2C7865] text-sm'>(121 review)</p>
                                </div>
                            )}
                            {onDesktop && (
                                <div className={styles.bid}>
                                    {product.endBiddingDate && <p>{product.name} <span className='text-[#FD6A02] text-base'>7 Bids at US $168 </span>(Bidding ends on {moment(product.endBiddingDate).format('DD-MM-YYYY')}) <button onClick={() => setIsPlaceABidVisible(true)}>Place Bid </button></p>}
                                    <Link href={'/contact-seller'}><button className='mt-1'>Contact seller</button></Link>
                                </div>
                            )}
                            {onDesktop && (
                                <div className={styles.rating}>
                                    {/* <span className='flex items-center'>
                                        {[...Array(maxRating)].map((_, index) => (                                
                                            <span key={index} className={index !== maxRating - 1 ? 'mr-1' : ''}>
                                                {index < filledRatings.length ? (
                                                    <RatingIcon colored={true} /> // Render filled rating icon
                                                ) : (
                                                    <RatingIcon /> // Render empty rating icon
                                                )}
                                            </span>
                                        ))}
                                    </span> */}
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
                            )}
                            {onMobile && <h2 className='text-[#1E1E1E] font-semibold mb-3 text-xl'>&pound;{product?.amount.toLocaleString()}</h2>}
                            {quantityInCart && (
                                <QuantityButton
                                    onIncrease={() => dispatch(increment(product as ProductResponse))}
                                    onDecrease={() => dispatch(decrement(product as ProductResponse))}
                                    qty={quantityInCart ?? 0}
                                />
                            )}
                            <div className={styles.buyNow}>
                                <Link href={'/checkout'}> Buy Now</Link>
                                {onDesktop && (
                                    <>
                                        {!quantityInCart && (
                                            <span className={`${styles.icon} cursor-pointer`} onClick={() => dispatch(increment(product as ProductResponse))}><ShoppingIcon /></span>
                                        )}
                                        <span
                                            className={`${styles.icon} bg-white p-3 cursor-pointer rounded-full`}
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent navigation on click
                                                if (product.favourite.length === 0) {
                                                    handleAddProductToFavorite(product.id);
                                                } else {
                                                    handleRemoveProductFromFavorite(product.id);
                                                }
                                            }}>
                                            {product.favourite.length === 0 ? <FavoriteIcon /> : <FilledLoveIcon />}
                                        </span>
                                    </>
                                )}
                            </div>
                            {onMobile && (
                                <div className={`${styles.bid} mt-4`}>
                                    <p>Estimated between Tue, Jun 18 and Tue, Jul 16 to 502001 Please note the delivery estimate is greater than 38 business days. Seller ships within 1 day after receiving cleared payment. <br /><br />
                                        <span className='text-[#FD6A02] text-base'>7 Bids at US $168 </span>(Bidding ends on 27th May 2024) <button onClick={() => setIsPlaceABidVisible(true)}>Place Bid</button></p>
                                    <Link href={'/contact-seller'}><button className='mt-1'>Contact seller</button></Link>
                                </div>
                            )}
                        </div>
                    </>
                )}
                {!product && isFetchingProduct && (
                    <FullPageLoader />
                )}
                {!product && !isFetchingProduct && (
                    <p className='text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[50vh]'>No product found</p>
                )}
            </div>
        </>
    );
};

export default AddProductToCart;
