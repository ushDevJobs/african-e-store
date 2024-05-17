'use client'
import React from 'react'
import styles from './Report.module.scss'
import { UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {}

const ReportPage = (props: Props) => {
    const router = useRouter()
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>Report an item that has not returned</h2>
                <p>To report, kindly select the item from your list of items, enter the details and select continue. </p>
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
                        <div className={styles.actions}>
                            <button onClick={() => router.push('/report-item')}>Report Item</button>
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

                <div className={styles.rhs}></div>
            </div>
        </div>
    )
}

export default ReportPage