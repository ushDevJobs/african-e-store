'use client'
import React, { useEffect, useState } from 'react'
import styles from './Orders.module.scss'
import RecentlyViewed from '../components/RecentlyViewed'
import Recommendations from '../components/Recommendations'
import { useFetchUserOrders } from '../api/apiClients'
import { UserOrderResponse } from '../components/models/IUserOrder'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import { FullPageLoader } from '../Loader/ComponentLoader'
import { StatusEnums } from '../components/models/ISellerStore'
import useResponsiveness from '../components/hooks/responsiveness-hook'
import UserDeliveryStatus from './UserDeliveryStatus'
import Image from 'next/image'
import { UserIcon } from '../components/SVGs/SVGicons'

type Props = {}

const OrdersPage = (props: Props) => {

    const fetchOrders = useFetchUserOrders()

    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == "boolean" && isMobile;
    const onDesktop = typeof isMobile == "boolean" && !isMobile;

    const [selectedOrder, setSelectedOrder] = useState<UserOrderResponse>()
    const [orders, setOrders] = useState<UserOrderResponse[]>()
    const [isFetchingOrders, setIsFetchingOrders] = useState<boolean>(true);
    const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState<boolean>(false);

    async function handleFetchOrders({ clearPreviousOrders = false }) {

        // Show loader

        if (clearPreviousOrders) {
            // Clear previous configurations
            setOrders(undefined);
            // Show loader
            setIsFetchingOrders(true);
        }
        await fetchOrders()
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setOrders(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingOrders(false);
            });
    }
    const getStatusColor = (status: StatusEnums) => {
        switch (status) {
            case StatusEnums.Pending:
                return 'text-[#FD6A02]';
            case StatusEnums.Delivered:
                return 'text-[#2C7865]';
            case StatusEnums.Dispatched:
                return 'text-#6f6f6f';
            default:
                return 'text-#6f6f6f';
        }
    }

    useEffect(() => {
        handleFetchOrders({ clearPreviousOrders: true })
    }, []);

    return (
        <>
            {isDeliveryModalVisible &&
                <UserDeliveryStatus
                    visibility={isDeliveryModalVisible}
                    setVisibility={setIsDeliveryModalVisible}
                    selectedOrder={selectedOrder}
                />
            }

            <div className={styles.main}>
                {isFetchingOrders ? (
                    <div className="h-[40vh] flex flex-col items-center justify-center">
                        <FullPageLoader />
                    </div>
                ) : (
                    <>
                        {orders && orders.length > 0 ? (
                            <>
                                <div className={styles.content}>
                                    <h1>All orders ({orders.length})</h1>
                                    {onDesktop && (
                                        <div className={styles.orders}>
                                            {orders.map(order => (
                                                <div key={order.id} className={styles.order}>
                                                    <div className={styles.item}>
                                                        {order.orderDetails.map((detail,index)=>(
                                                            <div className={styles.storeName} key={index}>
                                                                <div className="relative w-10 h-10 rounded-full">
                                                                    {detail.product.store.image ? <Image src={detail.product.coverImage} alt='store image' className='rounded-full object-cover' fill /> : <UserIcon />}
                                                                </div>
                                                                <span>{detail.product.store.name}</span>
                                                            </div>
                                                        ))}
                                                        {order.orderDetails.slice(0, 1).map((detail, index) => (
                                                            <div className={styles.productInfos} key={index}>
                                                                <div className={styles.image}>
                                                                    <Image src={detail.product.coverImage} alt='product image' fill />
                                                                </div>
                                                                <div className={styles.info}>
                                                                    <h4>{detail.product.name}</h4>
                                                                    <p>Condition: {detail.product.itemCondition}</p>
                                                                    <h5>Quantity <span> {detail.quantity} </span></h5>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {order.orderDetails.slice(0, 1).map((status,index) => (
                                                            <p style={{ fontSize: '12px' }} className={getStatusColor(status.status)} key={index}>{status.status}</p>
                                                        ))}
                                                    </div>
                                                    {order.orderDetails.map((detail, index) => (
                                                        <div className={styles.price} key={index}>
                                                            <h3>&pound;{(detail.quantity * detail.amount).toLocaleString()}</h3>
                                                        </div>
                                                    ))}
                                                    <div className={styles.trackOrder}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedOrder(order)
                                                                setIsDeliveryModalVisible(true)
                                                            }}
                                                        >Track order</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {onMobile && (
                                        <div className='flex flex-col gap-10 max-h-[700px] bg-[#F7FAFA] px-4 pt-5 pb-7 rounded-lg overflow-y-auto'>
                                            {orders.map(order => (
                                                <div key={order.id} className='flex flex-col'>
                                                    <div className='flex flex-col gap-4'>
                                                        {order.orderDetails.slice(0, 1).map((detail, index) => (
                                                            <div className='flex items-center gap-3' key={index}>
                                                                <div className="relative w-8 h-8">
                                                                    {detail.product.store.image ? <Image src={detail.product.store.image} alt='store image' fill className='rounded-full object-cover' /> : <UserIcon />}
                                                                </div>
                                                                <span>{detail.product.store.name}</span>
                                                            </div>
                                                        ))}
                                                        {order.orderDetails.slice(0, 1).map((detail, index) => (
                                                            <div className='flex gap-4' key={index}>
                                                                <div className="relative w-14 h-14 rounded-full">
                                                                    <Image src={detail.product.coverImage} alt='product image' fill className='rounded-xl object-cover' />
                                                                </div>
                                                                <div className=''>
                                                                    <h4>{detail.product.name}</h4>
                                                                    <p>Condition: {detail.product.itemCondition}</p>
                                                                    {/* <h5>Quantity <span> {order.quantity.find((q) => q.id === product.id)
                                                                        ?.quantity || 0}</span>
                                                                    </h5> */}
                                                                    <h5>Quantity <span> {detail.quantity} </span></h5>

                                                                    {/* {order.orderDetails.status.slice(0, 1).map(status => ( */}
                                                                        <p style={{ fontSize: '12px', marginTop: '4px' }} className={getStatusColor(detail.status)} key={detail.id}>{detail.status}</p>
                                                                    {/* ))} */}
                                                                    <div className='mt-1'>
                                                                        {/* <h3 className='font-medium text-lg'>&pound;{order.amount.toLocaleString()}</h3> */}

                                                                        <h3>&pound;{(detail.quantity * detail.amount).toLocaleString()}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedOrder(order)
                                                            setIsDeliveryModalVisible(true)
                                                        }}
                                                        className='bg-[#2c7865] mt-6 text-white w-full cursor-pointer font-semibold py-3 hover:bg-opacity-60 rounded-full'>Track order</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* <RecentlyViewed /> */}
                                <Recommendations />
                            </>
                        ) : (
                            <p className='text-gray-500 text-center flex flex-col items-center justify-center h-[30vh]'>No orders</p>
                        )}
                    </>
                )}
            </div>
        </>

    )
}

export default OrdersPage