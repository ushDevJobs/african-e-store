import React from 'react'
import SellerStorePage from './SellerStorePage'

type Props = {
    params: { storeId: string }
}

const SellerStore = ({ params }: Props) => {
  return (
      <SellerStorePage params={params}/>
  )
}

export default SellerStore