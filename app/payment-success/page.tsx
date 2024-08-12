import React from 'react'
import PaymentSuccessPage from './PaymentSuccessPage'

type Props = {

}

const PaymentSuccess = ({
    searchParams: { amount },
}: {
    searchParams: { amount: string };
}) => {
    return (
        <div className="pt-40 pb-10">
            <PaymentSuccessPage amount={amount} />
        </div>
    )
}

export default PaymentSuccess