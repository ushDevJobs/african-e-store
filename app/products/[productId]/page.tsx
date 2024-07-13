import React from 'react'
import SingleProductPage from './SingleProductPage'

type Props = {
    params: { productId: string }
}

const SingleProduct = ({params}: Props) => {
  return (
      <SingleProductPage params={params}/>
  )
}

export default SingleProduct