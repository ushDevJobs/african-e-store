import React, { Fragment, useState } from 'react'
import { BoxIcon, CalenderIcon, LocationIcon, TimeIcon } from '../components/SVGs/SVGicons'
import SellerDeliveryStatus from './SellerDeliveryStatus'
import OrdersMade from './OrdersMade'
import { StoreOrderResponse } from '../components/models/ISellerStore'
import { FullPageLoader } from '../Loader/ComponentLoader'
import moment from 'moment'

type Props = {
    orders: StoreOrderResponse[] | undefined
    isFetchingOrders: boolean
}

const Orders = ({ orders, isFetchingOrders }: Props) => {
    const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState<boolean>(false)
    const [isOrderModalVisible, setIsOrderModalVisible] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<StoreOrderResponse>()
    return (
        <>
            <SellerDeliveryStatus
                visibility={isDeliveryModalVisible}
                setVisibility={setIsDeliveryModalVisible}
                selectedOrder={selectedOrder}
            />

            <OrdersMade
                visibility={isOrderModalVisible}
                setVisibility={setIsOrderModalVisible}
                orders={orders}
                isFetchingOrders={isFetchingOrders}
            />

            <section className='flex flex-col gap-8'>
                <div className="flex flex-col gap-2">
                    <h1 className='text-[#2C7865] text-xl font-bold'>Orders</h1>
                    <p className='text-base max-w-[700px] md:max-w-[600px] text-[#828282] leading-6'>A list of all orders from your shop, pls use the button to update the delivery status and keep your customers updated</p>
                </div>

                <div className="flex flex-col gap-14">
                    {orders?.map((order, index) => (
                        <div className="flex gap-4" key={index}>
                            <div className="bg-[#D9EDBF] text-[#2C7865] text-xl font-medium rounded-2xl flex flex-col gap-1 justify-center items-center min-w-[168px] h-[219px]">
                                {order.products.length} {order.products.length > 1 ? 'items' : 'item'}
                                <BoxIcon />
                            </div>

                            <div className="">
                                {order.products.slice(0, 1).map((product, index) => (
                                    <Fragment key={index}>
                                        <p className='text-[#6F6F6F] text-lg mb-2'>{product.name}</p>
                                        <span className='text-[#1E1E1E] text-lg mb-4'>Item number: 2324</span>
                                        <h4 className='font-medium text-xl text-[#1E1E1E] mb-6'>&pound;{product.amount.toLocaleString()}</h4>
                                    </Fragment>
                                ))}
                                <div className="flex items-center gap-5 text-[#6F6F6F] text-sm mb-6 whitespace-nowrap">
                                    <p className='flex items-center gap-1'>
                                        <span className='bg-[#2C4A78] rounded-full text-[10px] text-white px-[9px] py-[1px]'>T</span>
                                        {order.user.fullname}
                                    </p>
                                    <p className='flex items-center gap-1'>
                                        <span><LocationIcon /></span>
                                        {order.user.address ?? 'Location here'}
                                    </p>
                                    <p className='flex items-center gap-1'>
                                        <span><CalenderIcon /></span>
                                        {moment(order.createdAt).format('DD MMMM, YYYY')}
                                    </p>
                                    <p className='flex items-center gap-1'>
                                        <span><TimeIcon /></span>
                                        {moment(order.createdAt).format('hh:mm A')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <button onClick={() => {
                                        setSelectedOrder(order)
                                        setIsDeliveryModalVisible(true)
                                    }} className='border border-[#2C7865] bg-[#2C7865] text-white rounded-[13px] min-w-[204px] py-4 cursor-pointer'>Update delivery status</button>
                                    <button onClick={() => setIsOrderModalVisible(true)} className='border border-[#2C7865] rounded-[13px] bg-transparent text-[#2C7865]  min-w-[204px] py-4 cursor-pointer'>See products</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!orders && isFetchingOrders && (
                    <FullPageLoader />
                )}
                {orders?.length == 0 && !isFetchingOrders && (
                    <p className='h-52 w-full grid place-items-center text-[#333333]'>No order available</p>
                )}
            </section>
        </>

    )
}

export default Orders