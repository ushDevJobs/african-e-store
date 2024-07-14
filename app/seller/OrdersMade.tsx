import React from 'react'
import ModalWrapper from '../components/Modal/ModalWrapper'

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrdersMade = ({ visibility, setVisibility }: Props) => {
  return (
      <ModalWrapper
          visibility={visibility}
          setVisibility={setVisibility}
          styles={{ backgroundColor: "transparent", overflowX: 'auto' }}
      >
    <div>OrdersMade</div>
    </ModalWrapper>
  )
}

export default OrdersMade