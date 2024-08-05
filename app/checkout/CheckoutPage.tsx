"use client";
import React, { useEffect } from "react";
import styles from "./Checkout.module.scss";
import Image from "next/image";
import QuantityButton from "../components/QuantityButton";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
    decrement,
    increment,
    totalPriceSelector,
} from "../redux/features/cart/cartSlice";
import { useUserAddress } from "../context/UserAddressContext";

type Props = {};

const CheckoutPage = (props: Props) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const totalPrice = useSelector(totalPriceSelector);
    const { userAddress } = useUserAddress();
    // Step 1: Extract the store IDs
    const storeIds = cartItems.map(item => item.product.store.id);
    const storeShippingFee = cartItems[0].product.store.shippingFee;

    // Step 2: Make the store IDs unique
    const uniqueStoreIds = Array.from(new Set(storeIds));

    // Step 3: Calculate the shipping fee
    const shippingFee = uniqueStoreIds.length * storeShippingFee;

    return (
        <div className={styles.main}>
            <h1>Checkout</h1>
            <div className={styles.checkoutContainer}>
                <div className={styles.lhs}>
                    <div className={styles.productInfos}>
                        {/* <h2>Item</h2> */}
                        {cartItems &&
                            cartItems.length > 0 &&
                            cartItems.map((item, index) => (
                                <div className={styles.card} key={index}>
                                    <p className={styles.seller}>
                                        Seller:{" "}
                                        {item.product.store
                                            ? item.product.store.name
                                            : "Store Name Needed"}
                                    </p>
                                    <div className={styles.info}>
                                        <div className={styles.image}>
                                            <Image
                                                src={item.product.coverImage}
                                                alt="product image"
                                                fill
                                            />
                                        </div>
                                        <div className={styles.item}>
                                            <p className={styles.name}>{item.product.name}</p>
                                            <p className={styles.price}>
                                                &pound;{item.product.amount.toLocaleString()}
                                            </p>
                                            <QuantityButton
                                                onIncrease={() => dispatch(increment(item.product))}
                                                onDecrease={() => dispatch(decrement(item.product))}
                                                qty={item.qty}
                                            />
                                            {/* <div className={styles.delivery}>
                                                <h3>Delivery</h3>
                                                <p>Rayvvin International Shipping &pound;2.99</p>
                                            </div> */}

                                            <span className={styles.fees}>
                                                Authorities may apply duties, fees, and taxes upon
                                                delivery
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className={styles.address}>
                        <h3>Ship to</h3>
                        {userAddress ? <p>{userAddress?.city}<br /> <br /> {userAddress?.country}</p> : <p>No address available</p>}
                        {/* <p>{userAddress.}</p> */}
                        <button className={styles.edit}>Change</button>
                    </div>
                    <div className={styles.coupon}>
                        <h3>Gift cards, coupons</h3>
                        <div className={styles.coupInput}>
                            <input type="text" name="" id="" placeholder="Enter here" />
                            <button>Apply</button>
                        </div>
                    </div>
                </div>
                <div className={styles.rhs}>
                    <div className={styles.payment}>
                        <div className={styles.item}>
                            <p>Item ({cartItems.length})</p>
                            <p>&pound;{totalPrice.toLocaleString()}</p>
                        </div>
                        <div className={styles.shipping}>
                            <p>Shipping </p>
                            <p> &pound;{shippingFee}</p>
                        </div>
                        <div className={styles.terms}>
                            <p>
                                By confirming your order, you agree to the Rayvvin International
                                Shipping terms and conditions.{" "}
                            </p>

                            {/* <p>By placing your order, you agree to eBay&apos;s User Agreement and Privacy Notice</p> */}
                            <Link href={"/payment"}>
                                <button>
                                    Pay &pound;{(totalPrice + shippingFee).toLocaleString()}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
