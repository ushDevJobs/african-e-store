import React from 'react'
import styles from './SellerStore.module.scss';

type Props = {}

const AboutSeller = (props: Props) => {
    return (
        <div>
            <h2 className='text-[#000000] text-2xl mb-4 font-medium'>About</h2>
            <form action="">
                <textarea name="" id="" placeholder='Enter  description about your store here'></textarea>
                <button>Save</button>
            </form>
        </div>
    )
}

export default AboutSeller