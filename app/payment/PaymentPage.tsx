import React from 'react'
import styles from '../checkout/Checkout.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { RectangleIcon } from '../components/SVGs/SVGicons'
import QuantityButton from '../components/QuantityButton'

type Props = {}

const PaymentPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <h1>Pay with card </h1>
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
                        <QuantityButton/>
                                <div className={styles.delivery}>
                                    <h3>Delivery</h3>
                                    <p className='mb-4 max-w-[300px]'>Delivery
                                        Estimated delivery: Jun 19 - Jul 18Est. delivery: Jun 19 - Jul 18
                                        Rayvvin International Shipping
                                        US $31.00</p>

                                    <span className={styles.fees}>Authorities may apply duties, fees, and taxes upon delivery</span>
                                </div>
                                <div className={styles.delivery}>
                                    <h3>Ship to </h3>
                                    <p>User address from google </p>
                                    <p>Country</p>
                                    <p>Number</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.rhs}>
                    <form action="" className={styles.formContainer}>
                        <div className={styles.formField}>
                            <label htmlFor=""><span>*</span>Card number </label>
                            <input type="text" name="" id="" placeholder='XXX XXX XXX XXX' />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor=""><span>*</span>CVV </label>
                            <input type="text" name="" id="" placeholder='***' />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor=""><span>*</span>MM/YY </label>
                            <input type="text" name="" id="" placeholder='' />
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor=""><span>*</span>Card pin </label>
                            <input type="text" name="" id="" placeholder='' />
                        </div>

                        <button>Continue to pay $195.99</button>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default PaymentPage