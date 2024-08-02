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
    // Step 1: Extract the store IDs
    const storeIds = cartItems.map(item => item.product.store.id);
    const storeShippingFee = cartItems[0].product.store.shippingFee;

    // Step 2: Make the store IDs unique
    const uniqueStoreIds = Array.from(new Set(storeIds));

    // Step 3: Calculate the shipping fee
    const shippingFee = uniqueStoreIds.length * storeShippingFee;
    return (
        <div className={styles.rhs}>
            <div className={styles.summaryItem}>
                <p>Item ({cartItems.length})</p>
                <h3>&pound;{totalPrice.toLocaleString()}</h3>
            </div>
            <div className={styles.summaryItem}>
                <p>Shipping</p>
                <h3>&pound;{shippingFee}</h3>
            </div>
            <div className={styles.total}>
                <p>Subtotal </p>
                <h3>&pound;{(totalPrice + shippingFee).toLocaleString()}</h3>
                {/* add shipping fee  */}
            </div>
            <Link href={'/checkout'}>
                <button>Pay &pound;{(totalPrice + shippingFee).toLocaleString()}</button>
                {/* add shipping fee  */}
            </Link>
        </div>
    )
}

export default SummarySection