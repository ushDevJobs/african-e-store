import React from 'react'
import styles from './Orders.module.scss'
import RecentlyViewed from '../components/RecentlyViewed'
import Recommendations from '../components/Recommendations'
import { UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'

type Props = {}

const OrdersPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h1>All orders (10)</h1>

               <div className={styles.orders}>
                    <div className={styles.order}>
                        <div className={styles.item}>
                            <div className={styles.storeName}>
                                <UserIcon /> <span>Chavo global mobile device store LTD.</span>
                            </div>

                            <div className={styles.productInfos}>
                                <div className={styles.image}>
                                    <Image src={images.cart_prooduct_image} alt='product image' fill />
                                </div>
                                <div className={styles.info}>
                                    <h4>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</h4>
                                    <p>Condition: Brand new</p>
                                    <h5>Quantity <span>1</span></h5>
                                </div>
                            </div>
                            <div className={styles.status}>
                                <p>status</p>
                            </div>
                        </div>

                        <div className={styles.price}>
                            <h3>US $164.99</h3>
                            <p>Shipping US $164.99</p>
                            <p>Returns accepted</p>
                        </div>

                        <div className={styles.trackOrder}>
                            <button>Track order</button>
                        </div>
                    </div>
               </div>
            </div>
            <RecentlyViewed />

            <Recommendations />
        </div>
    )
}

export default OrdersPage