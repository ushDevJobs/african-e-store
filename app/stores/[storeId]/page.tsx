import React from 'react'
import SellerStorePage from './SellerStorePage'

type Props = {
    params: { storeId: string }
}

const SellerStore = ({ params }: Props) => {
    return (
        <div className="pt-24">
            <SellerStorePage params={params} />
        </div>

    )
}

export default SellerStore