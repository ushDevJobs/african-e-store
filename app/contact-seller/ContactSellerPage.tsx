'use client'
import React from 'react'
import styles from './ContactSeller.module.scss'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Props = {}

enum ContactMessage {
    LeaveMessage = 1,
    ProductContact = 2,
}

const ContactSellerPage = (props: Props) => {
    const router = useRouter()
    const [contactMessage, setContactMessage] = React.useState<ContactMessage>(ContactMessage.LeaveMessage)

    const handleRadioChange = () => {
        if (contactMessage == ContactMessage.LeaveMessage) {
            setContactMessage(ContactMessage.ProductContact);
        }
        if (contactMessage == ContactMessage.ProductContact) {
            setContactMessage(ContactMessage.LeaveMessage);
        }
    };

    return (
        <section className={styles.section}>
            <h2 className='font-medium text-2xl text-[#828282] tracking-wide mb-12'>Contact seller Chuks stores </h2>

            <div className="flex flex-col gap-6 md:gap-0 md:flex-row justify-between">
                <div className={`${styles.type} flex-1`}>
                    <div className={styles.content}>
                        <div className={styles.custom_radio}>
                            <div className={styles.formContainer}>
                                <input
                                    type='radio'
                                    id='radioButton1'
                                    className={styles.radio_input}
                                    name='radioGroup'
                                    onChange={handleRadioChange}
                                    checked={contactMessage == ContactMessage.LeaveMessage}
                                />
                                <label htmlFor='radioButton1'>
                                    Leave a message
                                </label>

                                {contactMessage == ContactMessage.LeaveMessage && (
                                    <Link href={'/message-seller'} className='bg-[#2C7865] w-fit rounded-lg text-sm text-white py-4 px-10 cursor-pointer'>Continue</Link>
                                )}
                            </div>

                            <div className={styles.formDeliveryContainer}>
                                <input
                                    type='radio'
                                    id='radioButton2'
                                    className={styles.radio_input}
                                    name='radioGroup'
                                    onChange={handleRadioChange}
                                    checked={contactMessage == ContactMessage.ProductContact}
                                />

                                <label htmlFor='radioButton2'>
                                    Contact for a product
                                </label>
                                {contactMessage == ContactMessage.ProductContact && (
                                    <div className="flex flex-col gap-1 mt-2">
                                        <span className='text-[#1E1E1E] text-base'>Enter product number</span>
                                        <div className="flex border border-[#ACACAC] rounded-lg w-fit p-1 gap-6">
                                            <input className='text-base w-full outline-none pl-5 placeholder:text-xs' type="text" name="" id="" placeholder='Please enter the product number' />
                                            <button onClick={() => router.push('/product-contact')} className='bg-[#2C7865] rounded-lg text-sm text-white py-4 px-8 cursor-pointer'>Continue</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 text-[#828282] bg-[#ECF8F5] py-10 px-5 rounded-3xl md:max-w-[35%] flex-1">
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
        </section>
    )
}

export default ContactSellerPage