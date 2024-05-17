import React from 'react'
import styles from './Returns.module.scss'
import { UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'
import Link from 'next/link'

type Props = {}

const ReturnsPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>Start a return</h2>
                <p>Top start  a return kindly place all items in the package and return within the originally <br /> stated date for the product, see return policy. </p>
                <span>Note that you will be charged a shipping fee</span>
            </div>
            <div className={styles.container}>
                <div className={styles.lhs}>
                    <div className={`${styles.card} ${styles.active}`}>
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
                    </div>

                </div>
                <div className={styles.rhs}>
                    <div className={styles.summaryItem}>
                        <p>Item (1)</p>
                        <h3>US $164.99</h3>
                    </div>
                    <div className={styles.summaryItem}>
                        <p>Shipping to Nigeria </p>
                        <h3>US $31</h3>
                    </div>
                    <div className={styles.total}>
                        <p>Subtotal </p>
                        <h3>US $195</h3>
                    </div>
                    <Link href={'/checkout'}>
                        <button>Pay $195.99</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ReturnsPage