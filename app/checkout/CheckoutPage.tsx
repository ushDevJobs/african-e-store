import React from 'react'
import styles from './Checkout.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { RectangleIcon } from '../components/SVGs/SVGicons'
import QuantityButton from '../components/QuantityButton'

type Props = {}

const CheckoutPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <h1>Checkout</h1>
            <div className={styles.checkoutContainer}>
                <div className={styles.lhs}>
                    <div className={styles.productInfos}>
                        <h2>Item</h2>
                        <p className={styles.seller}>
                            Seller: Chavo global
                        </p>
                        <div className={styles.info}>
                            <div className={styles.image}>
                                <Image src={images.cart_prooduct_image} alt='product image' fill />
                            </div>
                            <div className={styles.item}>
                                <p className={styles.name}>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</p>
                                <p className={styles.price}>US $164.99</p>
                                <QuantityButton />
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
                            <p>Item (1)</p>
                            <p>US $164.99</p>
                        </div>
                        <div className={styles.shipping}>
                            <p>Shipping </p>
                            <p>UUS $31</p>
                        </div>
                        <div className={styles.terms}>
                            <p>By confirming your order, you agree to the Rayvinn International Shipping terms and conditions. </p>

                            <p>By placing your order, you agree to eBay&apos;s User Agreement and Privacy Notice</p>
                            <button>Pay with  Visa $195.99</button>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default CheckoutPage