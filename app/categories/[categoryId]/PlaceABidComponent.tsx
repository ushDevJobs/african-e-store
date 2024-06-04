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

            <form className=" bg-white w-full p-4 rounded-xl md:px-5 md:w-[50vw] lg:w-[40vw] md:py-4 overflow-y-auto min-h-[90%]">
                <span className='cursor-pointer ml-auto flex items-end w-full justify-end' onClick={() => setVisibility(false)}><TimesIcon /></span>
                <div className="flex px-6 mx-auto flex-col items-center justify-center mt-7">
                    <h2 className='mb-3 font-medium text-[#6F6F6F] text-2xl'>Place a bid for this item</h2>
                    <p className='text-[#828282] text-lg mb-8'>Starting price at €200 </p>
                    <div className="relative w-[200px] h-[200px] overflow-hidden mb-10">
                        <Image fill className='rounded-xl w-full h-full' src={images.cart_prooduct_image} alt='product image' />
                    </div>
                    <p className='text-[#000000] text-base'>Current bidding at</p>
                    <span className='text-xl mb-3 text-[#2C7865] font-semibold'>€220</span>
                    <div className="flex flex-col w-full gap-3">
                        <input type="text" name="" id="" placeholder='Enter your bidding price here' className='w-full border border-[#ACACAC] rounded-lg outline-none pl-3 py-3 md:w-[80%] md:mx-auto' />
                        <small className='text-center text-xs text-[#FD6A02]'>Bidding should be from €221</small>
                    </div>
                    <button type="submit">Place bid </button>
                </div>
            </form>
        </ModalWrapper>
    )
}

export default PlaceABidComponent