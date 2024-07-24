import React from 'react'
import ModalWrapper from '../components/Modal/ModalWrapper'
import { TimesIcon } from '../components/SVGs/SVGicons';
import Image from 'next/image';
import { StoreOrderResponse } from '../components/models/ISellerStore';
import { FullPageLoader } from '../Loader/ComponentLoader';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    orders: StoreOrderResponse[] | undefined
    isFetchingOrders: boolean
}

const OrdersMade = ({ visibility, setVisibility, orders, isFetchingOrders }: Props) => {
    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: "transparent", overflowX: 'auto' }}
        >
            <div className='bg-white w-full md:min-w-[400px] max-h-[90vh] overflow-y-auto mx-auto md:w-full rounded-[34px] p-7'>
                <div className="flex flex-col gap-3 mb-5">
                    <span onClick={() => setVisibility(false)} className='cursor-pointer flex items-end justify-end ml-auto w-fit'><TimesIcon /></span>
                    <div className="flex flex-col gap-1 text-start text-[#2C7865]">
                        {orders?.map((order, index) => (
                            <div key={index}>
                                <h2 className='text-2xl font-medium'>{order.products.length} {orders && order.products.length > 1 ? 'items' : 'item'} </h2>
                                <p key={index} className='text-lg'>Order {order.orderId}</p>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="flex flex-col ">
                    {orders?.map((order, index) => (
                        <div className="flex flex-col gap-6" key={index}>
                            {order.products.map((product, index) => (
                                <div className="flex gap-6">
                                    <div key={index} className="relative min-w-[101px] rounded-lg h-[132px]">
                                        <Image src={product.coverImage} alt='product image' fill className='object-cover rounded-lg ' />
                                    </div>
                                    <div className="text-[#1E1E1E] flex flex-col" key={index}>
                                        <p className='max-w-[400px]'>{product.name}</p>
                                        <h4 className='font-medium text-xl'>&pound;{product.amount.toLocaleString()}</h4>

                                        < p className='text-[#828282] text-xs' > Quantity: <span className='text-[#1E1E1E] text-base'>{order.quantity.find((q) => q.id === product.id)
                                            ?.quantity || 0}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    ))}
                </div>
                {!orders && isFetchingOrders && (
                    <FullPageLoader />
                )}
                {!orders && !isFetchingOrders && (
                    <p className='text-center text-[#333333]'>No order available</p>
                )}
            </div>
        </ModalWrapper>
    )
}

export default OrdersMade