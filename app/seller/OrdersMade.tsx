import React from 'react'
import ModalWrapper from '../components/Modal/ModalWrapper'
import { TimesIcon } from '../components/SVGs/SVGicons';
import Image from 'next/image';
import images from '@/public/images';

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
            <div className='bg-white w-[90%] max-h-[90vh] overflow-y-auto mx-auto md:w-full rounded-[34px] p-7'>
                <div className="flex flex-col gap-3 mb-5">
                    <span onClick={() => setVisibility(false)} className='cursor-pointer flex items-end justify-end ml-auto w-fit'><TimesIcon /></span>
                    <div className="flex flex-col gap-1 text-start text-[#2C7865]">
                        <h2 className='text-2xl font-medium'>3 Items </h2>
                        <p className='text-lg'>Order #2344435555</p>
                    </div>
                </div>
                <div className="flex flex-col gap-8 mb-5">
                    <div className="flex gap-6">
                        <div className="relative min-w-[101px] h-[132px]">
                            <Image src={images.cart_prooduct_image} alt='product image' fill className='object-contain' />
                        </div>
                        <div className="text-[#1E1E1E] flex flex-col gap-3">
                            <p className='max-w-[400px]'>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</p>
                            <h4 className='font-medium text-xl'>&pound;566</h4>
                            <p className='text-[#828282] text-xs'>Quantity: <span className='text-[#1E1E1E] text-base'>1</span></p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="relative min-w-[101px] h-[132px]">
                            <Image src={images.cart_prooduct_image} alt='product image' fill className='object-contain' />
                        </div>
                        <div className="text-[#1E1E1E] flex flex-col gap-3">
                            <p className='max-w-[400px]'>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</p>
                            <h4 className='font-medium text-xl'>&pound;566</h4>
                            <p className='text-[#828282] text-xs'>Quantity: <span className='text-[#1E1E1E] text-base'>1</span></p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="relative min-w-[101px] h-[132px]">
                            <Image src={images.cart_prooduct_image} alt='product image' fill className='object-contain' />
                        </div>
                        <div className="text-[#1E1E1E] flex flex-col gap-3">
                            <p className='max-w-[400px]'>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</p>
                            <h4 className='font-medium text-xl'>&pound;566</h4>
                            <p className='text-[#828282] text-xs'>Quantity: <span className='text-[#1E1E1E] text-base'>1</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default OrdersMade