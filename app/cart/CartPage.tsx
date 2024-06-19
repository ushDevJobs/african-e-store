'use client'
import { useState, useEffect } from 'react'
import styles from './Cart.module.scss'
import { UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'
import RecentlyViewed from '../components/RecentlyViewed'
import Recommendations from '../components/Recommendations'
import SummarySection from '../components/SummarySection'
import { CartResponse } from '../components/models/IProduct'
import { useFetchCartItems } from '../api/apiClients'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

type Props = {}

const CartPage = (props: Props) => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    return (
        <div className={styles.cartSection}>
            <h1>My Cart({cartItems.length > 0 && <>{cartItems.length}</>})</h1>
            <div className={styles.cartContainer}>
                <div className={styles.lhs}>
                    {cartItems.map((item, index) => (
                        <div className={styles.card} key={index}>
                            <p className={styles.productName}><UserIcon /><span>Store name</span></p>
                            <div className={styles.cartItem}>
                                <div className={styles.item}>
                                    <div className={styles.image}>
                                        <Image src={images.cart_prooduct_image} fill alt='product image' />
                                    </div>
                                    <div className={styles.name}>
                                        <h3>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</h3>
                                        <p className={styles.condition}>Condition: Brand new</p>
                                        <p className={styles.qty}>
                                            Quantity: <span>{item.qty}</span>
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
                    ))}
                </div>
                <SummarySection />
            </div>

            <RecentlyViewed />
            <Recommendations />
        </div>
    )
}

export default CartPage