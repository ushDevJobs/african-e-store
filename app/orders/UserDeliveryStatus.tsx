import React from 'react';
import ModalWrapper from '../components/Modal/ModalWrapper';
import { UserOrderResponse } from '../components/models/IUserOrder';
import { DeliveryLineIcon, TimesIcon, BoxIcon, WhiteBoxIcon, DispatchIcon, WhiteDispatchIcon, DeliveredIcon, WhiteDeliveredIcon } from '../components/SVGs/SVGicons';
import { StatusEnums } from '../components/models/ISellerStore';
import moment from 'moment';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrder: UserOrderResponse | undefined;
};

const UserDeliveryStatus = ({ visibility, setVisibility, selectedOrder }: Props) => {
    const status = selectedOrder?.status[0].status;

    const isActive = (currentStatus: StatusEnums) => {
        if (status === StatusEnums.Pending && currentStatus === StatusEnums.Pending) return true;
        if (status === StatusEnums.Dispatched && (currentStatus === StatusEnums.Pending || currentStatus === StatusEnums.Dispatched)) return true;
        if (status === StatusEnums.Delivered) return true;
        return false;
    };

    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: "transparent", overflowX: "auto" }}
        >
            <div className="bg-white w-[90%] mx-auto md:w-full rounded-[34px] p-7">
                <div className="flex flex-col gap-3 mb-10">
                    <span
                        onClick={() => setVisibility(false)}
                        className="cursor-pointer flex items-end justify-end ml-auto w-fit"
                    >
                        <TimesIcon />
                    </span>
                    <div className="flex flex-col gap-1 text-center mx-auto items-center justify-center text-[#828282]">
                        <h2 className="text-2xl font-medium">
                            Your package {selectedOrder?.orderId} is on the way
                        </h2>
                    </div>
                </div>
                <div className="flex items-center gap-7 w-full mb-5 overflow-x-auto whitespace-nowrap">
                    <div className="text-center flex flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <button
                                className={`w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-default ${isActive(StatusEnums.Pending) ? 'bg-[#2C7865]' : 'bg-[#E7E7E7]'}`}
                            >
                                {isActive(StatusEnums.Pending) ? <WhiteBoxIcon /> : <BoxIcon />}
                            </button>
                            <span>
                                <DeliveryLineIcon />
                            </span>
                        </div>
                        <div className="flex flex-col items-start">
                            <p>Order purchased</p>
                            <span>{moment(selectedOrder?.status[0].createdAt).format("DD-MM-YYYY")}</span>
                        </div>
                    </div>

                    <div className="text-center flex flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <button
                                className={`w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-default ${isActive(StatusEnums.Dispatched) ? 'bg-[#2C7865]' : 'bg-[#E7E7E7]'}`}
                            >
                                {isActive(StatusEnums.Dispatched) ? <WhiteDispatchIcon /> : <DispatchIcon />}
                            </button>
                            <span>
                                <DeliveryLineIcon />
                            </span>
                        </div>
                        <div className="flex flex-col items-start">
                            <p>Order dispatched</p>
                            <span>{moment(selectedOrder?.status[0].createdAt).format("DD-MM-YYYY")}</span>
                        </div>
                    </div>

                    <div className="text-start flex flex-col gap-3">
                        <button
                            className={`w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-default ${isActive(StatusEnums.Delivered) ? 'bg-[#2C7865]' : 'bg-[#E7E7E7]'}`}
                        >
                            {isActive(StatusEnums.Delivered) ? <WhiteDeliveredIcon /> : <DeliveredIcon />}
                        </button>
                        <p>Order delivered</p>
                            <span>{moment(selectedOrder?.status[0].createdAt).format("DD-MM-YYYY")}</span>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default UserDeliveryStatus;
