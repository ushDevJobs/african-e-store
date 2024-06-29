import React from 'react'
import styles from '../styles/SummarySection.module.scss'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { totalPriceSelector } from '../redux/features/cart/cartSlice'
import { RootState } from '../redux/store'
type Props = {}

const SummarySection = (props: Props) => {
    const totalPrice = useSelector(totalPriceSelector);

    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    return (
        <div className={styles.rhs}>
            <div className={styles.summaryItem}>
                <p>Item ({cartItems.length})</p>
                <h3>&pound;{totalPrice.toLocaleString()}</h3>
            </div>
            <div className={styles.summaryItem}>
                <p>Shipping</p>
                <h3>{cartItems.map((item) => item.product.shippingDetails)}</h3>
            </div>
            <div className={styles.total}>
                <p>Subtotal </p>
                <h3>&pound;{totalPrice.toLocaleString()}+ shipping fee</h3>
                {/* add shipping fee  */}
            </div>
            <Link href={'/checkout'}>
                <button>Pay &pound;{totalPrice.toLocaleString()} + shipping fee</button>
                {/* add shipping fee  */}
            </Link>
        </div>
    )
}

export default SummarySection