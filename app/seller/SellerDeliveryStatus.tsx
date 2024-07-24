import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ModalWrapper from "../components/Modal/ModalWrapper";
import {
    BoxIcon,
    DeliveredIcon,
    DeliveryLineIcon,
    DispatchIcon,
    TimesIcon,
    WhiteBoxIcon,
    WhiteDeliveredIcon,
    WhiteDispatchIcon,
} from "../components/SVGs/SVGicons"; // Added CheckedIcon
import { StoreOrderResponse } from "../components/models/ISellerStore";
import { useUpdateDeliveryStatus } from "../api/apiClients";
import {
    DeliveryStatus,
    StatusEnum,
} from "../components/models/IOrderDeliveryStatus";

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrder: StoreOrderResponse | undefined;
};

const SellerDeliveryStatus = ({
    visibility,
    setVisibility,
    selectedOrder,
}: Props) => {
    const updateStatus = useUpdateDeliveryStatus();

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [selectedStatuses, setSelectedStatuses] = useState<StatusEnum[]>([]);

    useEffect(() => {
        if (selectedOrder) {
            const storedStatuses = localStorage.getItem(
                `selectedStatuses-${selectedOrder.id}`
            );
            if (storedStatuses) {
                setSelectedStatuses(JSON.parse(storedStatuses));
            } else {
                // Default to existing status from selectedOrder if no localStorage data
                const statusForStore = selectedOrder.status.find(
                    (s) => s.storeId === selectedOrder.id
                );
                if (statusForStore) {
                    setSelectedStatuses([statusForStore.status]);
                }
            }
        }
    }, [selectedOrder]);

    async function handleUpdateStatus(
        e: FormEvent<HTMLButtonElement>,
        status: StatusEnum
    ) {
        e.preventDefault();
        setIsUpdating(true);

        const data: DeliveryStatus = {
            status: status,
        };

        try {
            const response = await updateStatus(
                selectedOrder?.status[0].id as string,
                data
            );
            // console.log(response.data.data);
            setSelectedStatuses((prevStatuses) => {
                const newStatuses = [...prevStatuses, status];
                localStorage.setItem(
                    `selectedStatuses-${selectedOrder?.id}`,
                    JSON.stringify(newStatuses)
                );
                return newStatuses;
            });
        } catch (err) {
            console.log(err);
        } finally {
            setIsUpdating(false);
        }
    }

    const isStatusSelected = (status: StatusEnum) =>
        selectedStatuses.includes(status);

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
                            What is the status of this order
                        </h2>
                        <p className="text-lg">
                            Kindly select action to notify Rayvvins admin
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-7 w-full mb-5 overflow-x-auto whitespace-nowrap">
                    <div className="text-center flex flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <button
                                onClick={(e) => handleUpdateStatus(e, StatusEnum.Pending)}
                                className={`w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-pointer bg-[#E7E7E7]
                                ${isStatusSelected(StatusEnum.Pending) && "!bg-[#2C7865]"} hover:bg-[#D9EDBF]`} disabled={isUpdating}
                            >
                                {isStatusSelected(StatusEnum.Pending) ? (
                                    <WhiteBoxIcon />
                                ) : (
                                    <BoxIcon />
                                )}
                            </button>
                            <span>
                                <DeliveryLineIcon />
                            </span>
                        </div>
                        <div className="flex flex-col items-start">
                            <p>Order purchased</p>
                            <span>23-4-2024</span>
                        </div>
                    </div>

                    <div className="text-center flex flex-col gap-3">
                        <div className="flex items-center gap-5">
                            <button
                                onClick={(e) => handleUpdateStatus(e, StatusEnum.Dispatched)}
                                className={`w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-pointer bg-[#E7E7E7]
                                ${isStatusSelected(StatusEnum.Dispatched) && "!bg-[#2C7865]"}  hover:bg-[#D9EDBF]`}
                                disabled={isUpdating}
                            >
                                {isStatusSelected(StatusEnum.Dispatched) ? (
                                    <WhiteDispatchIcon />
                                ) : (
                                    <DispatchIcon />
                                )}
                            </button>
                            <span>
                                <DeliveryLineIcon />
                            </span>
                        </div>
                        <div className="flex flex-col items-start">
                            <p>Order dispatched</p>
                            <span>23-4-2024</span>
                        </div>
                    </div>

                    <div className="text-start flex flex-col gap-3">
                        <button
                            onClick={(e) => handleUpdateStatus(e, StatusEnum.Delivered)}
                            className={`w-[90px] h-[90px] rounded-full flex items-center justify-center cursor-pointer bg-[#E7E7E7]
                            ${isStatusSelected(StatusEnum.Delivered) && "!bg-[#2C7865]"} hover:bg-[#D9EDBF]`}
                            disabled={isUpdating}
                        >
                            {isStatusSelected(StatusEnum.Delivered) ? (
                                <WhiteDeliveredIcon />
                            ) : (
                                <DeliveredIcon />
                            )}
                        </button>
                        <p>Order delivered</p>
                        <span>23-4-2024</span>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default SellerDeliveryStatus;
