import React, { useEffect, useRef, useState } from "react";
import styles from "../checkout/Checkout.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCheckoutPage from "./PaymentCheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ApiRoutes from "../api/apiRoutes";

type Props = {};
// if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
//     throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
// }
const stripePromise = loadStripe(
  "pk_test_51PZM1SRuKfeerLkMfjgba7cuAOUVJ4fvhLOEyi9evCGjbSk1Y4t68wKKQJaihdeGZRqBJiaJ2BrGERdNJC2L1Yzg00glfDzD4C"
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
        .then((data) => setAmount(data.data.amount));
      runOnce.current++;
    }
  }, []);
  console.log(!!amount, amount);

  return (
    //   <form action="" className={styles.formContainer}>
    //       <div className={styles.formField}>
    //           <label htmlFor=""><span>*</span>Card number </label>
    //           <input type="text" name="" id="" placeholder='XXX XXX XXX XXX' />
    //       </div>
    //       <div className={styles.formField}>
    //           <label htmlFor=""><span>*</span>CVV </label>
    //           <input type="text" name="" id="" placeholder='***' />
    //       </div>
    //       <div className={styles.formField}>
    //           <label htmlFor=""><span>*</span>MM/YY </label>
    //           <input type="text" name="" id="" placeholder='' />
    //       </div>
    //       <div className={styles.formField}>
    //           <label htmlFor=""><span>*</span>Card pin </label>
    //           <input type="text" name="" id="" placeholder='' />
    //       </div>

    //       <button>Continue to pay $195.99</button>
    //   </form>

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
