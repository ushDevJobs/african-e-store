'use client'
import React from 'react'
import styles from '../saved-seller/SavedSeller.module.scss'
import { CheckIcon, EmptyStarIcon, FilledLoveIcon, UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'
import useResponsiveness from '../components/hooks/responsiveness-hook'
type Props = {}

const SavedItemsPage = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    return (
        <div className={styles.main}>
            <h2 className='text-2xl text-[#828282] mb-4 font-medium'>Saved Items  </h2>
            <p className='text-[#828282] text-base mb-8'>All your saved items from the store </p>
            <div className='flex flex-col gap-8'>
              {onDesktop && (
                    <div className="flex flex-col bg-[#F7FAFA] rounded-lg py-5 px-7">
                        <span className='p-3 rounded-full w-fit ml-auto border border-[#828282]'><FilledLoveIcon /></span>
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-2 items-center">
                                <span className='bg-[#2C7865] h-fit p-3 rounded-full'><UserIcon /></span>
                                <p className='font-medium text-[#828282] border-b border-b-[#828282] text-xl'>Chavo global mobile device store LTD.</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center gap-10">
                                    <div className="relative w-[113px] h-[137px]"> <Image src={images.cart_prooduct_image} fill alt='product image' /></div>
                                    <div className="flex flex-col gap-3">
                                        <h2 className=' text-[#1E1E1E] text-xl border-b border-b-[#1E1E1E]'>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</h2>
                                        <p className='text-[#828282] text-sm'>Condition: Brand new</p>
                                        <p className='text-[#828282] text-sm'>Status: Auction</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className='text-[#1E1E1E] text-xl font-medium'>US $164.99</h3>
                                    <p className='text-[#6F6F6F] text-sm '>Shipping US $164.99</p>
                                    <p className='text-[#6F6F6F] text-sm '>Returns accepted</p>
                                </div>
                            </div>
                        </div>

                    </div>
              )}
              {onMobile && (
                <>
                     <div className="flex gap-7">
                    <div className="relative w-[85px] h-[104px]">
                        <Image src={images.cart_prooduct_image} fill alt='product image' />
                            <span className="absolute -top-3 -right-3 px-[5px] py-[6px] bg-white rounded-full border border-[#828282]">
                            <FilledLoveIcon />
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                            <h2 className='text-[#1E1E1E] max-w-[207px] text-sm leading-4'>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</h2>
                            <h3 className='text-[#1E1E1E] text-sm font-medium'>€164.99 + €16 shipping </h3>
                            <p className='text-[#828282] text-xs'>Condition: Used </p>
                            <p className='text-[#828282] text-xs'>Status: Auction</p>
                    </div>
                  </div>
                </>
             
              )}
            </div>
        </div>
    )
}

export default SavedItemsPage