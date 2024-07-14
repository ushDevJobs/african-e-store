import React, { useState } from 'react'
import { BoxIcon, CalenderIcon, LocationIcon, TimeIcon } from '../components/SVGs/SVGicons'
import SellerDeliveryStatus from './SellerDeliveryStatus'
import OrdersMade from './OrdersMade'

type Props = {}

const Orders = (props: Props) => {
    const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState<boolean>(false)
    const [isOrderModalVisible, setIsOrderModalVisible] = useState<boolean>(false)
    return (
        <>
            <SellerDeliveryStatus
            visibility={isDeliveryModalVisible}
            setVisibility={setIsDeliveryModalVisible}
            />

            <OrdersMade
            visibility={isOrderModalVisible}
            setVisibility={setIsOrderModalVisible}
            />

          <section className='flex flex-col gap-8'>
            <div className="flex flex-col gap-2">
                <h1 className='text-[#2C7865] text-xl font-bold'>Orders</h1>
                <p className='text-base max-w-[700px] md:max-w-[600px] text-[#828282] leading-6'>A list of all orders from your shop, pls use the button to update the delivery status and keep your customers updated</p>
            </div>

            <div className="flex flex-col gap-14">
                <div className="flex gap-4">
                    <div className="bg-[#D9EDBF] text-[#2C7865] text-xl font-medium rounded-2xl flex flex-col gap-1 justify-center items-center min-w-[168px] h-[219px]">
                        3 items
                        <BoxIcon />
                    </div>
                    <div className="">
                        <p className='text-[#6F6F6F] text-lg mb-2'>Cashew bag, 120kg, Samsung s24 Ultra refresh rate 120gh </p>
                        <span className='text-[#1E1E1E] text-lg mb-4'>Item number: 2324</span>
                        <h4 className='font-medium text-xl text-[#1E1E1E] mb-6'>&pound;566</h4>
                        <div className="flex items-center gap-5 text-[#6F6F6F] text-sm mb-6 whitespace-nowrap">
                            <p className='flex items-center gap-1'>
                                <span className='bg-[#2C4A78] rounded-full text-[10px] text-white px-[9px] py-[1px]'>T</span>
                                Tony mahrez
                            </p>
                            <p className='flex items-center gap-1'>
                                <span><LocationIcon /></span>
                                No 24 North Ville Manchester city
                            </p>
                            <p className='flex items-center gap-1'>
                                <span><CalenderIcon /></span>
                                Order date
                            </p>
                            <p className='flex items-center gap-1'>
                                <span><TimeIcon /></span>
                                Order time
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <button onClick={() => setIsDeliveryModalVisible(true)} className='border border-[#2C7865] bg-[#2C7865] text-white rounded-[13px] min-w-[204px] py-4 cursor-pointer'>Update delivery status</button>
                            <button onClick={() => setIsOrderModalVisible(true)} className='border border-[#2C7865] rounded-[13px] bg-transparent text-[#2C7865]  min-w-[204px] py-4 cursor-pointer'>See products</button>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        </>
     
    )
}

export default Orders