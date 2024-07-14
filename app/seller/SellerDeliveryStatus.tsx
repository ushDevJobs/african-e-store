import React from 'react'
import ModalWrapper from '../components/Modal/ModalWrapper'
import { BoxIcon, DeliveryLineIcon, TimesIcon } from '../components/SVGs/SVGicons';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const SellerDeliveryStatus = ({ visibility, setVisibility }: Props) => {
    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: "transparent", overflowX:'auto' }}
        >
            <div className="bg-white w-[90%] mx-auto md:w-full rounded-[34px] p-7">
                <div className="flex flex-col gap-3 mb-10">
                    <span onClick={() => setVisibility(false)} className='cursor-pointer flex items-end justify-end ml-auto w-fit'><TimesIcon /></span>
                    <div className="flex flex-col gap-1 text-center mx-auto items-center justify-center text-[#828282]">
                        <h2 className='text-2xl font-medium'>What is the status of this order</h2>
                        <p className='text-lg'>Kindly select action to notify Rayvvins admin</p>
                    </div>
                </div>
                <div className="flex items-center gap-7 w-full mb-5 overflow-x-auto whitespace-nowrap">
                    <div className="text-center flex flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <button className="bg-[#E7E7E7] w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D9EDBF]">
                                <BoxIcon />
                            </button>
                            <span><DeliveryLineIcon /></span>
                        </div>
                        <div className="flex flex-col items-start">
                            <p>Order purchased</p>
                            <span>23-4-2024</span>
                        </div>
                    </div>

                    <div className="text-center flex flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <button className="bg-[#E7E7E7] w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D9EDBF]">
                                <BoxIcon />
                            </button>
                            <span><DeliveryLineIcon /></span>
                        </div>
                        <div className="flex flex-col items-start">
                            <p>Order purchased</p>
                            <span>23-4-2024</span>
                        </div>
                    </div>

                    <div className="text-start flex flex-col gap-3">
                        <button className="bg-[#E7E7E7] w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#D9EDBF]">
                            <BoxIcon />
                        </button>
                        <p>Order purchased</p>
                        <span>23-4-2024</span>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default SellerDeliveryStatus