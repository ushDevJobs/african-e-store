import React, { useEffect, useRef, useState } from "react";
import styles from "../checkout/Checkout.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCheckoutPage from "./PaymentCheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ApiRoutes from "../api/apiRoutes";

type Props = {};
// if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
//     throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
// }
const stripePromise = loadStripe(
    "pk_live_51NaLL2L2BlwVomd9t8cHkPgzVcAidN6NmSqZygA5y5mspCmqvUdlL5lrtyTiyLiaUJkRGPK2GHWE66jLBkISeBEV00hlgad3vC"
);
const PaymentFormPage = (props: Props) => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const [amount, setAmount] = useState(0);
    const runOnce = useRef(0);

    useEffect(() => {
        if (runOnce.current === 0) {
            fetch(`${ApiRoutes.BASE_URL_DEV}/api/payment/amount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: cartItems.map((cart) => ({
                        id: cart.product.id,
                        quantity: cart.qty,
                    })),
                }),
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setAmount(data.data && data.data.amount));

            runOnce.current++;
        }
    }, []);
    //   console.log(!!amount, amount);

    return (
        <main className="p-5 text-white text-center rounded-md bg-[#f7fafa]">
            {!!amount ? (
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: convertToSubcurrency(amount),
                        currency: "gbp",
                    }}
                >
                    <PaymentCheckoutPage amount={amount} />
                </Elements>
            ) : (
                ""
            )}
        </main>
    );
};

export default PaymentFormPage;
