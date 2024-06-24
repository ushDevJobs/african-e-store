'use client'
import React from 'react'
import styles from './Checkout.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { RectangleIcon } from '../components/SVGs/SVGicons'
import QuantityButton from '../components/QuantityButton'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { decrement, increment, totalPriceSelector } from '../redux/features/cart/cartSlice'

type Props = {}

const CheckoutPage = (props: Props) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const totalPrice = useSelector(totalPriceSelector);
    return (
        <div className={styles.main}>
            <h1>Checkout</h1>
            <div className={styles.checkoutContainer}>
                <div className={styles.lhs}>
                    <div className={styles.productInfos}>
                        {/* <h2>Item</h2> */}
                        {cartItems && cartItems.length > 0 && cartItems.map((item, index) => (
                            <div className={styles.card} key={index}>
                                <p className={styles.seller}>
                                    Seller: Chavo global
                                </p>
                                <div className={styles.info}>
                                    <div className={styles.image}>
                                        <Image src={images.cart_prooduct_image} alt='product image' fill />
                                    </div>
                                    <div className={styles.item}>
                                        <p className={styles.name}>{item.product.name}</p>
                                        <p className={styles.price}>&pound;{item.product.amount.toLocaleString()}</p>
                                        <QuantityButton
                                            onIncrease={() => dispatch(increment(item.product))}
                                            onDecrease={() => dispatch(decrement(item.product))}
                                            qty={item.qty}
                                        />
                                        <div className={styles.delivery}>
                                            <h3>Delivery</h3>
                                            <p>Delivery
                                                Estimated delivery: Jun 19 - Jul 18Est. delivery: Jun 19 - Jul 18
                                                Rayvvin International Shipping
                                                US $31.00</p>
                                        </div>

                                        <span className={styles.fees}>Authorities may apply duties, fees, and taxes upon delivery</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.address}>
                        <h3>Ship to</h3>
                        <p>User address from google </p>
                        <p>Country</p>
                        <p>Number</p>
                        <button className={styles.edit}>Change</button>
                    </div>
                    <div className={styles.coupon}>
                        <h3>Gift cards, coupons</h3>
                        <div className={styles.coupInput}>
                            <input type="text" name="" id="" placeholder='Enter here' />
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
                <div className={styles.rhs}>
                    <div className={styles.method}>
                        <h3>Payment method </h3>

                        <div className={styles.paymentOptions}>
                            <span><RectangleIcon /></span>
                            <select name="" id="">
                                <option value="">Paypal</option>
                            </select>
                        </div>

                    </div>

                    <div className={styles.payment}>
                        <div className={styles.item}>
                            <p>Item  ({cartItems.length})</p>
                            <p>&pound;{totalPrice.toLocaleString()}</p>
                        </div>
                        <div className={styles.shipping}>
                            <p>Shipping </p>
                            <p>shipping price here</p>
                        </div>
                        <div className={styles.terms}>
                            <p>By confirming your order, you agree to the Rayvinn International Shipping terms and conditions. </p>

                            {/* <p>By placing your order, you agree to eBay&apos;s User Agreement and Privacy Notice</p> */}
                            <Link href={'/payment'}>
                                <button>Pay with Visa &pound;{totalPrice.toLocaleString()} + shipping</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage