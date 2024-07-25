'use client'
import React from 'react'
import styles from '../checkout/Checkout.module.scss'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import PaymentFormPage from './PaymentFormPage'

type Props = {}

const PaymentPage = (props: Props) => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    return (
        <div className={styles.main}>
            <h1>Pay with card </h1>
            <div className={styles.checkoutContainer}>
                <div className={styles.lhs}>
                    <div className={styles.productInfos}>
                        {/* <h2>Item</h2> */}
                        {cartItems && cartItems.length > 0 && cartItems.map((item, index) => (
                            <div className={styles.card} key={index}>
                                <p className={styles.seller}>
                                    Seller: {item.product.store.name}
                                </p>
                                <div className={styles.info}>
                                    <div className={styles.image}>
                                        <Image src={item.product.coverImage} alt='product image' fill />
                                    </div>
                                    <div className={styles.item}>
                                        <p className={styles.name}>{item.product.name}</p>
                                        <p className={styles.price}>&pound;{item.product.amount.toLocaleString()} ({item.qty})</p>
                                        <div className={`${styles.delivery} -mt-2`}>
                                            {/* <h3 className='mb-1'>Delivery</h3> */}
                                            {/* <p className='mb-4 max-w-[300px]'>Shipping &pound;2.99</p> */}

                                            <span className={styles.fees}>Authorities may apply duties, fees, and taxes upon delivery</span>
                                        </div>
                                        <div className={styles.delivery}>
                                            <h3>Ship to </h3>
                                            <p>User address from google </p>
                                            {/* <p>Country</p>
                                            <p>Number</p> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.rhs}>
                    <PaymentFormPage />
                </div>
            </div>
        </div>
    )
}

export default PaymentPage