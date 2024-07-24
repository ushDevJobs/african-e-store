"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ApiRoutes from "../api/apiRoutes";
const PaymentCheckoutPage = ({ amount }: { amount: number }) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const runOnce = useRef(0);
  useEffect(() => {
    if (runOnce.current === 0) {
      fetch(`${ApiRoutes.BASE_URL_DEV}/api/payment/pay`, {
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
        .then((data) => {
          setOrderId(data.data && data.data.orderId);
          setClientSecret(data.data.clientSecret);
        });
      runOnce.current++;
    }
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${ApiRoutes.BASE_URL_DEV}/api/payment/success?o_id=${orderId}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-[#2c7865]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-2 rounded-md outline-none"
    >
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-[#2c7865] mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay £${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default PaymentCheckoutPage;
