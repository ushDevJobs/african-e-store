import React from 'react'
import styles from '../checkout/Checkout.module.scss'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentCheckoutPage from './PaymentCheckoutPage'
import convertToSubcurrency from '@/lib/convertToSubcurrency'

type Props = {}

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const PaymentFormPage = (props: Props) => {
    const amount = 49.99;
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
            <Elements
                stripe={stripePromise}
                options={{
                    mode: 'payment',
                    amount: convertToSubcurrency(amount),
                    currency: "gbp",
                }}
            >
                <PaymentCheckoutPage amount={amount} />
            </Elements>
        </main>
    )
}

export default PaymentFormPage