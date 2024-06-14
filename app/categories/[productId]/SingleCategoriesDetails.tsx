'use client'
import React, { useState } from 'react'
import styles from './SingleCategory.module.scss'
import { CartIcon, DeliveryIcon, PaymentIcon, ReturnIcon, ReturnsIcon, ShippingIcon } from '@/app/components/SVGs/SVGicons'
import useResponsiveness from '@/app/components/hooks/responsiveness-hook'
import { FaShippingFast, FaTruck, FaUndo, FaCreditCard, FaCartPlus, FaChevronDown } from 'react-icons/fa';

type Props = {}

const SingleCategoriesDetails = (props: Props) => {

    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };
    return (
        <>
            {onDesktop && (
                <div className={styles.categoriesDetails}>
                    <div className={styles.header}>
                        <span className='border border-[#2C7865] text-[#2C7865] rounded-full py-2 px-12'>Product details</span>
                        <span className='border border-[#828282] text-[#828282] rounded-full py-2 px-12'>Specifications</span>
                        <span className='border border-[#828282] text-[#828282] rounded-full py-2 px-12'>Shipping & returns</span>
                    </div>
                    <div className={styles.detailContents}>
                        <div className={styles.lhs}>
                            <h3 className='text-xl text-[#4B4B4B] mb-3 font-bold'>Item Details</h3>
                            <span className='text-xs text-[#828282] leading-5 font-normal'>
                                Seller assumes all responsibility for this listing. <br />
                                Rayvinn item number:195952185806 <br />
                                Last updated on Apr 23, 2024 15:32:35 WAT
                            </span>

                            <p className='text-base text-[#4B4B4B] font-normal leading-9 mt-6 mb-5'>
                                Grade C - Condition 5/10 <br />
                                At first glance, the device appears to be very used. <br />
                                The screen has heavily visible scratches under normal light. <br />
                                The back cover has heavy use signs including scratches visible under normal light. <br />
                                The housing of the device will show heavy signs of wear, scuffs and dings or dents. <br />
                                Note: These details are derived from looking at the device under normal light from approximately arm length <br />
                                Model Number: SM-G991U <br />
                                Storage: 128GB <br />
                                Color: Phantom Gray <br />
                                Carrier: Factory Unlocked <br />
                                Lock Status: Unlocked
                            </p>
                            <div className={styles.return}>
                                <div className={styles.returnLhs}>
                                    <p className='text-[#828282] leading-5 text-xs font-normal'>What is in the package?
                                        <span>
                                            Device <br />
                                            Generic Charging Cable</span>
                                    </p>
                                </div>
                                <div className={styles.returnRhs}>
                                    <h4 className='text-[#828282] text-xs font-bold'>
                                        Return Policy? <br /> <br />
                                        We accept returns within 30 days of the original receipt date of your order
                                    </h4>
                                    <p className='text-[#828282] text-sm leading-6 mt-3'>
                                        Please ensure your item is in the original condition that you received it in with the original packaging, it has been factory reset, and all accessories are included to avoid any potential restocking fees on your return.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className={styles.rhs}>
                            <div className={styles.item}>
                                <span><ShippingIcon /> Shipping</span>
                                <p>US $31.00 Rayvvin International Shipping. See details for shipping <br />
                                    Located in: Clive, Iowa, United States <br /> <br />
                                    Authorities may apply duties, fees, and taxes upon delivery</p>
                            </div>
                            <div className={styles.item}>
                                <span><DeliveryIcon /> Delivery</span>
                                <p>
                                    Estimated between Tue, Jun 18 and Tue, Jul 16 to 502001 <br />
                                    Please note the delivery estimate is greater than 38 business days. <br />
                                    <span className='text-[#FD6A02]'>Seller ships within 1 day after receiving cleared payment.</span>
                                </p>
                            </div>
                            <div className={styles.item}>
                                <span><ReturnsIcon /> Returns</span>
                                <p>
                                    30 days returns. Buyer pays for return shipping. See details
                                </p>
                            </div>
                            <div className={styles.item}>
                                <span><PaymentIcon /> Payment</span>
                                <p>
                                    Payment
                                </p>
                            </div>

                            <button>Add to cart <CartIcon /></button>
                        </div>
                    </div>
                </div>
            )}

            {onMobile && (
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer" onClick={() => toggleSection('Product details')}>
                            <span className='text-[#828282] text-sm'>Product details</span>
                            <FaChevronDown className='text-[#828282]' />
                        </div>
                        {openSection === 'Product details' && (
                            <div className="p-4 bg-white border border-gray-200">
                                <h3 className='text-xl text-gray-800 mb-3 font-bold'>Item Details</h3>
                                <span className='text-xs text-gray-500 leading-5 font-normal'>
                                    Seller assumes all responsibility for this listing. <br />
                                    Rayvinn item number:195952185806 <br />
                                    Last updated on Apr 23, 2024 15:32:35 WAT
                                </span>
                                <p className='text-xs text-gray-800 font-normal leading-8 mt-3 mb-5'>
                                    Grade C - Condition 5/10 <br />
                                    At first glance, the device appears to be very used. <br />
                                    The screen has heavily visible scratches under normal light. <br />
                                    The back cover has heavy use signs including scratches visible under normal light. <br />
                                    The housing of the device will show heavy signs of wear, scuffs and dings or dents. <br />
                                    Note: These details are derived from looking at the device under normal light from approximately arm length <br />
                                    Model Number: SM-G991U <br />
                                    Storage: 128GB <br />
                                    Color: Phantom Gray <br />
                                    Carrier: Factory Unlocked <br />
                                    Lock Status: Unlocked
                                </p>
                                <div className="flex flex-col gap-y-4">
                                    <div>
                                        <p className='text-gray-500 leading-5 text-xs font-normal'>
                                            What is in the package? <br />
                                            Device <br />
                                            Generic Charging Cable
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className='text-gray-500 text-xs font-bold'>
                                            Return Policy? <br /><br />
                                            We accept returns within 30 days of the original receipt date of your order
                                        </h4>
                                        <p className='text-gray-500 text-xs leading-6 mt-3'>
                                            Please ensure your item is in the original condition that you received it in with the original packaging, it has been factory reset, and all accessories are included to avoid any potential restocking fees on your return.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer" onClick={() => toggleSection('Specifications')}>
                            <span className='text-[#828282] text-sm'>Specifications</span>
                            <FaChevronDown className='text-[#828282]' />
                        </div>
                        {openSection === 'Specifications' && (
                            <div className="p-4 bg-white border border-gray-200">
                                Specifications
                            </div>
                        )}

                        <div className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer" onClick={() => toggleSection('Shipping & returns')}>
                            <span className='text-[#828282] text-sm'>Shipping & returns</span>
                            <FaChevronDown className='text-[#828282]' />
                        </div>
                        {openSection === 'Shipping & returns' && (
                            <div className="p-4 bg-white border border-gray-200">
                                <div className="mb-4">
                                    <span className="flex items-center"><FaShippingFast className="mr-2" /> Shipping</span>
                                    <p className="text-xs leading-5 text-gray-700">
                                        US $31.00 Rayvvin International Shipping. See details for shipping <br />
                                        Located in: Clive, Iowa, United States <br /><br />
                                        Authorities may apply duties, fees, and taxes upon delivery
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <span className="flex items-center"><FaTruck className="mr-2" /> Delivery</span>
                                    <p className="text-xs leading-5 text-gray-700">
                                        Estimated between Tue, Jun 18 and Tue, Jul 16 to 502001 <br />
                                        Please note the delivery estimate is greater than 38 business days. <br />
                                        <span className="text-orange-600">Seller ships within 1 day after receiving cleared payment.</span>
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <span className="flex items-center"><FaUndo className="mr-2" /> Returns</span>
                                    <p className="text-xs leading-5 text-gray-700">
                                        30 days returns. Buyer pays for return shipping. See details
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <span className="flex items-center"><FaCreditCard className="mr-2" /> Payment</span>
                                    <p className="text-sm text-gray-700">Payment</p>
                                </div>
                                <button className="flex items-center justify-center px-4 py-2 border border-[#2C7865] text-[#2C7865] rounded-full w-full text-center mx-auto">
                                    Add to cart <FaCartPlus className="ml-2" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )
            }
        </>
    )
}

export default SingleCategoriesDetails