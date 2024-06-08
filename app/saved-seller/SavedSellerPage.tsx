import React from 'react'
import styles from './SavedSeller.module.scss'
import { DotIcon, FilledLoveIcon, UserIcon } from '../components/SVGs/SVGicons'
type Props = {}

const SavedSellerPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <h2 className='text-2xl text-[#828282] mb-4 font-medium'>Saved Sellers </h2>
            <p className='text-[#828282] text-base mb-8'>See sellers that you have saved </p>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between bg-[#F7FAFA] rounded-lg py-5 px-7'>
                    <div className="flex items-center gap-8">
                        <span className='bg-[#2C7865] h-fit p-8 rounded-full'><UserIcon /></span>
                        <div className="text-[#828282] flex flex-col gap-2">
                            <h2 className='text-xl underline font-medium'>Chavo global mobile device store LTD.</h2>
                            <p className='text-sm mb-2'>216 broadway United kingdom</p>
                            <div className="flex gap-2 items-center">
                                <span className='flex items-center gap-1'><DotIcon />90% Feedback </span>
                                <span className='flex items-center gap-1'><DotIcon />30 items sold</span>
                            </div>
                        </div>
                    </div>
                    <span className='p-3 rounded-full border border-[#828282]'><FilledLoveIcon /></span>
                </div>
                <div className='flex items-center justify-between bg-[#F7FAFA] rounded-lg py-5 px-7'>
                    <div className="flex items-center gap-8">
                        <span className='bg-[#2C7865] h-fit p-8 rounded-full'><UserIcon /></span>
                        <div className="text-[#828282] flex flex-col gap-2">
                            <h2 className='text-xl underline font-medium'>Chavo global mobile device store LTD.</h2>
                            <p className='text-sm mb-2'>216 broadway United kingdom</p>
                            <div className="flex gap-2 items-center">
                                <span className='flex items-center gap-1'><DotIcon />90% Feedback </span>
                                <span className='flex items-center gap-1'><DotIcon />30 items sold</span>
                            </div>
                        </div>
                    </div>
                    <span className='p-3 rounded-full border border-[#828282]'><FilledLoveIcon /></span>
                </div>
                <div className='flex items-center justify-between bg-[#F7FAFA] rounded-lg py-5 px-7'>
                    <div className="flex items-center gap-8">
                        <span className='bg-[#2C7865] h-fit p-8 rounded-full'><UserIcon /></span>
                        <div className="text-[#828282] flex flex-col gap-2">
                            <h2 className='text-xl underline font-medium'>Chavo global mobile device store LTD.</h2>
                            <p className='text-sm mb-2'>216 broadway United kingdom</p>
                            <div className="flex gap-2 items-center">
                                <span className='flex items-center gap-1'><DotIcon />90% Feedback </span>
                                <span className='flex items-center gap-1'><DotIcon />30 items sold</span>
                            </div>
                        </div>
                    </div>
                    <span className='p-3 rounded-full border border-[#828282]'><FilledLoveIcon /></span>
                </div>
            </div>
        </div>
    )
}

export default SavedSellerPage