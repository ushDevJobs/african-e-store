import React from 'react'
import styles from './ProductContactPage.module.scss'
import { UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'

type Props = {}

const ProductContactPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <div className='flex flex-col flex-1 md:flex-row md:justify-between'>
                <div className="mb-10 flex flex-col gap-5 md:mb-0">
                    <div className="bg-[#F7FAFA] pb-4 px-3 rounded-xl pt-4 md:pb-8 md:px-7">
                        <div className="flex items-center gap-2 mb-5">
                            <span className='bg-[#2C7865] p-3 rounded-full'><UserIcon /></span>
                            <p className='text-[#828282] font-medium text-sm underline'>Chavo global mobile device store LTD.</p>
                        </div>
                        <div className="flex gap-5">
                            <div className="relative w-16 h-20">
                                <Image fill className='rounded-lg' src={images.cart_prooduct_image} alt="product image" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className='text-[#1E1E1E] text-sm leading-4'>Samsung Galaxy S21 5G SM-G991U Factory Unlocked 128GB Phantom Gray C</p>
                                <p className='text-[#828282] font-medium text-sm'>US $164.99</p>
                                <span className='text-[#1E1E1E] text-sm font-medium'>Item number: 3453664648 </span>
                            </div>
                        </div>
                    </div>
                    <form className="flex flex-col gap-2">
                        <label htmlFor="" className='text-base text-[#1E1E1E]'>Write a message</label>
                        <textarea className='border border-[#ACACAC] rounded-lg outline-none resize-none h-[150px] bg-[#F7FAFA] p-5 text-base' name="" id="" placeholder='Enter message here'></textarea>
                        <div className="mt-8 flex gap-4">
                            <button className='bg-[#2C7865] rounded-3xl text-sm text-white cursor-pointer py-3 px-10'>Send message</button>
                            <button className='bg-transparent rounded-3xl text-sm text-[#828282] cursor-pointer py-3 px-10 border border-[#828282]'>Cancel</button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-3 h-fit text-[#828282] bg-[#ECF8F5] py-10 px-5 rounded-3xl md:max-w-[35%] flex-1">
                    <h3 className='text-base'>Helpful Hints</h3>
                    <p className='text-sm max-w-[364px]'>Rayvvin makes it easy to connect with other members. Follow these tips for a safe, secure, trusted experience.</p>
                    <ul className='leading-6 text-sm list-disc px-5'>
                        <li>Communicate only on Rayvvin</li>
                        <li>  Be respectful at all times</li>
                        <li> Make sure transactions take place on Rayvvin</li>
                        <li>Avoid unsolicited or commercial offers</li>
                    </ul>
                </div>
            </div>
            <p className='mt-10 text-[#828282] text-xs leading-4 md:text-sm md:leading-4'>Don&apos;t exchange contact info to buy or sell outside Rayvvin. We scan and analyze messages to identify potential fraud and policy violations. Sometimes it will keep us from sending your message, even when there is no intention to commit fraud.</p>
        </div>
    )
}

export default ProductContactPage