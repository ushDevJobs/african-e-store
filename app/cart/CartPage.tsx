import React from 'react'
import styles from './Cart.module.scss'
import { UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'
import RecentlyViewed from '../components/RecentlyViewed'
import Recommendations from '../components/Recommendations'
import SummarySection from '../components/SummarySection'

type Props = {}

const CartPage = (props: Props) => {
    return (
        <div className={styles.cartSection}>
            <h1>My Cart(2)</h1>
            <div className={styles.cartContainer}>
                <div className={styles.lhs}>
                    <div className={styles.card}>
                        <p className={styles.productName}><UserIcon /><span>Chavo global mobile device store LTD.</span></p>
                        <div className={styles.cartItem}>
                            <div className={styles.item}>
                                <div className={styles.image}>
                                    <Image src={images.cart_prooduct_image} fill alt='product image' />
                                </div>
                                <div className={styles.name}>
                                    <h3>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</h3>
                                    <p className={styles.condition}>Condition: Brand new</p>
                                    <p className={styles.qty}>
                                        Quantity: <span>1</span>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.price}>
                                <h3>US $164.99</h3>
                                <p className={styles.shipping}>
                                    Shipping US $164.99
                                </p>
                                <p className={styles.returns}>
                                    Returns accepted
                                </p>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button>Remove Item</button>
                            <button>Save for later </button>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <p className={styles.productName}><UserIcon /><span>Chavo global mobile device store LTD.</span></p>
                        <div className={styles.cartItem}>
                            <div className={styles.item}>
                                <div className={styles.image}>
                                    <Image src={images.cart_prooduct_image} fill alt='product image' />
                                </div>
                                <div className={styles.name}>
                                    <h3>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</h3>
                                    <p className={styles.condition}>Condition: Brand new</p>
                                    <p className={styles.qty}>
                                        Quantity: <span>1</span>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.price}>
                                <h3>US $164.99</h3>
                                <p className={styles.shipping}>
                                    Shipping US $164.99
                                </p>
                                <p className={styles.returns}>
                                    Returns accepted
                                </p>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button>Remove Item</button>
                            <button>Save for later </button>
                        </div>
                    </div>

                </div>
          <SummarySection/>
            </div>

            <RecentlyViewed/>
            <Recommendations/>
        </div>
    )
}

export default CartPage