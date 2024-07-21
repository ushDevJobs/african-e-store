import React from 'react'
import ModalWrapper from '../components/Modal/ModalWrapper'
import { TimesIcon } from '../components/SVGs/SVGicons';
import Image from 'next/image';
import images from '@/public/images';
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
                        <h2 className='text-2xl font-medium'>{orders?.length} {orders && orders?.length > 1 ? 'items' : 'item'} </h2>
                        <p className='text-lg'>Order #2344435555</p>
                    </div>
                </div>
                <div className="flex flex-col gap-8 mb-5">
                    {orders?.map((order, index) => (
                        <>
                            {order.products.map((product, index) => (
                                <div className="flex gap-6" key={index}>
                                    <div className="relative min-w-[101px] h-[132px]">
                                        <Image src={product.coverImage} alt='product image' fill className='object-contain' />
                                    </div>
                                    <div className="text-[#1E1E1E] flex flex-col gap-3">
                                        <p className='max-w-[400px]'>{product.name}</p>
                                        <h4 className='font-medium text-xl'>&pound;{product.amount.toLocaleString()}</h4>
                                    </div>
                                </div>
                            ))}
                            < p className='text-[#828282] text-xs' > Quantity: <span className='text-[#1E1E1E] text-base'>{order.quantity.length}</span></p>

                        </>

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