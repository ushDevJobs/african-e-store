"use client";
import { useState, useEffect } from "react";
import styles from "./Cart.module.scss";
import { UserIcon } from "../components/SVGs/SVGicons";
import Image from "next/image";
import images from "@/public/images";
import RecentlyViewed from "../components/RecentlyViewed";
import Recommendations from "../components/Recommendations";
import SummarySection from "../components/SummarySection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import QuantityButton from "../components/QuantityButton";
import {
    decrement,
    increment,
    productQtyInCartSelector,
    removeProduct,
} from "../redux/features/cart/cartSlice";
import Link from "next/link";
import useResponsiveness from "../components/hooks/responsiveness-hook";

type Props = {};

const CartPage = (props: Props) => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == "boolean" && isMobile;
    const onDesktop = typeof isMobile == "boolean" && !isMobile;
    return (
        <>
            <div className={styles.cartSection}>
                {cartItems && cartItems.length > 0 ? (
                    <>
                        <h1>My Cart({cartItems.length > 0 && <>{cartItems.length}</>})</h1>
                        <div className={styles.cartContainer}>
                            <div className={styles.lhs}>
                                {cartItems.map((item, index) => (
                                    <div className={styles.card} key={index}>
                                        <p className={styles.productName}>
                                            <UserIcon />
                                            <span>
                                                {item.product.store
                                                    ? item.product.store.name
                                                    : "Store Name Needed"}
                                            </span>
                                        </p>
                                        <div className={styles.cartItem}>
                                            <div className={styles.item}>
                                                <div className={styles.image}>
                                                    <Image
                                                        src={item.product.coverImage}
                                                        fill
                                                        alt="product image"
                                                    />
                                                </div>
                                                <div className={styles.name}>
                                                    <h3>{item.product.name}</h3>
                                                    <p className={styles.condition}>
                                                        Condition: {item.product.itemCondition}
                                                    </p>
                                                    {onMobile && (
                                                        <div className={styles.price}>
                                                            <h3 className="font-semibold text-sm">
                                                                &pound;{item.product.amount.toLocaleString()}
                                                            </h3>
                                                            {/* <p className='font-semibold text-sm'>
                                                                    shipping fee here
                                                                </p> */}
                                                            <p className="text-sm text-gray-500">
                                                                {item.product.returnPolicy == "true"
                                                                    ? "Returns accepted"
                                                                    : "Returns not accepted"}
                                                            </p>
                                                            {/* <p className='text-black font-semibold text-sm mb-4 md:mb-0'>
                                                                    Total:
                                                                    <span className='text-gray-600'> &pound;{(item.qty * item.product.amount).toLocaleString()}</span>
                                                                </p> */}
                                                        </div>
                                                    )}

                                                    <QuantityButton
                                                        onIncrease={() => dispatch(increment(item.product))}
                                                        onDecrease={() => dispatch(decrement(item.product))}
                                                        qty={item.qty}
                                                    />
                                                </div>
                                            </div>
                                            {onDesktop && (
                                                <div className={styles.price}>
                                                    <h3>&pound;{item.product.amount.toLocaleString()}</h3>
                                                    {/* <p className={styles.shipping}>
                                                            {item.product.shippingDetails ?? 'Shipping details needed'}
                                                        </p> */}
                                                    <p className={styles.returns}>
                                                        {item.product.returnPolicy == "true"
                                                            ? "Returns accepted"
                                                            : "Returns not accepted"}
                                                    </p>
                                                    <p className="text-black font-semibold mb-4 md:mb-0">
                                                        Total:
                                                        <span className="text-gray-700">
                                                            {" "}
                                                            &pound;
                                                            {(
                                                                item.qty * item.product.amount
                                                            ).toLocaleString()}
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`${styles.actions} -mt-12 md:-mt-6 mb-3`}>
                                            <button
                                                onClick={() => dispatch(removeProduct(item.product))}
                                            >
                                                Remove Item
                                            </button>
                                            {/* <button>Save for later </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <SummarySection />
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyCart}>
                        <Image src={images.emptyCart} alt="empty cart image" />
                        <p>
                            It seems your cart is empty at the moment. Click the button below
                            to start your order now.
                        </p>
                        <Link href="/products">
                            <button>Continue</button>
                        </Link>
                    </div>
                )}
                <RecentlyViewed />
                <Recommendations />
            </div>
        </>
    );
};

export default CartPage;
