import React from 'react'
import SingleProductPage from './SingleProductPage'

type Props = {
    params: { productId: string }
}

const SingleProduct = ({ params }: Props) => {
    return (
        <div className="pt-24">
            <SingleProductPage params={params} />
        </div>

    )
}

export default SingleProduct