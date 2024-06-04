import ModalWrapper from '@/app/components/Modal/ModalWrapper'
import { TimesIcon } from '@/app/components/SVGs/SVGicons'
import images from '@/public/images'
import Image from 'next/image'
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

            <form className="bg-white w-full md:p-">
                <span className='cursor-pointer ml-auto flex items-end w-full justify-end' onClick={() => setVisibility(false)}><TimesIcon /></span>
                <div className="">
                    <h2>Place a bid for this item</h2>
                    <p>Starting price at €200 </p>
                    <div className="">
                        <Image src={images.cart_prooduct_image} alt='product image' />
                    </div>
                    <p>Current bidding at</p>
                    <span>€220</span>
                    <div className="">
                        <input type="text" name="" id="" placeholder='Enter your bidding price here ' />
                        <small>Bidding should be from €221</small>
                    </div>
                    <button type="submit">Place bid </button>
                </div>
            </form>
        </ModalWrapper>
    )
}

export default PlaceABidComponent