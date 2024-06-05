import React from 'react'
import styles from '../product-contact/ProductContactPage.module.scss'
type Props = {}

const MessageSellerPage = (props: Props) => {
    return (
        <div className={styles.main}>
            <div className='flex flex-col md:flex-row md:gap-10 md:justify-between'>
                <div className="mb-10 flex flex-1 flex-col gap-5 md:mb-0">
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

export default MessageSellerPage