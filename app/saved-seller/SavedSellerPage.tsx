import React from 'react'
import styles from './SavedSeller.module.scss'
import { UserIcon } from '../components/SVGs/SVGicons'
type Props = {}

const SavedSellerPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <h2 className='text-2xl text-[#828282] mb-4 font-medium'>Saved Sellers </h2>
            <p className='text-[#828282] text-base mb-8'>See sellers that you have saved </p>
            <div>
                <div className='flex items-center justify-between'>
                    <span className='bg-[#2C7865] h-fit p-3 rounded-full'><UserIcon /></span>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default SavedSellerPage