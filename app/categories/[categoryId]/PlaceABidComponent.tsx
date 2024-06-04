import ModalWrapper from '@/app/components/Modal/ModalWrapper'
import React from 'react'

type Props = {
    visibility: boolean
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const PlaceABidComponent = ({ visibility, setVisibility }: Props) => {
  return (
      <ModalWrapper
          visibility={visibility}
          setVisibility={setVisibility}
          styles={{ backgroundColor: 'transparent' }}
      >
<h1>hello</h1>
      </ModalWrapper>
  )
}

export default PlaceABidComponent