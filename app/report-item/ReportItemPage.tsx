'use client'
import React from 'react'
import styles from './ReportItem.module.scss'
import { UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {}

const ReportItemPage = (props: Props) => {
    const router = useRouter()
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>Report an item that has not returned</h2>
                <p>To report, kindly select the item from your list of items, enter the details and select continue. </p>
            </div>
            <div className={styles.container}>
                <div className={styles.lhs}>
                    <div className={`${styles.card}`}>
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

                    <form action="" className={styles.formContainer}>
                        <div className={styles.rowField}>
                            <div className={styles.formField}>
                                <label htmlFor=""><span>*</span>Input email</label>
                                <input type="text" placeholder='Enter your email address here' />
                            </div>
                            <div className={styles.formField}>
                                <label htmlFor=""><span>*</span>Subject</label>
                                <input type="text" placeholder='Enter subject of complaint' />
                            </div>
                        </div>
                        <div className={styles.formField}>
                            <label htmlFor=""><span>*</span>Enter body of message </label>
                            <textarea name="" id="" placeholder='Enter detailed description here'></textarea>
                        </div>

                        <button type='submit'>SEND REPORT </button>
                    </form>
                </div>

                <div className={styles.rhs}></div>
            </div>
        </div>
    )
}

export default ReportItemPage