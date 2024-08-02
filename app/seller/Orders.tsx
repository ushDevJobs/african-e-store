import React, { Fragment, useRef, useState } from "react";
import {
    BoxIcon,
    CalenderIcon,
    DownArrowIcon,
    LocationIcon,
    TimeIcon,
} from "../components/SVGs/SVGicons";
import SellerDeliveryStatus from "./SellerDeliveryStatus";
import OrdersMade from "./OrdersMade";
import { StatusEnums, StoreOrderResponse } from "../components/models/ISellerStore";
import { FullPageLoader } from "../Loader/ComponentLoader";
import moment from "moment";
import useOuterClick from "../components/hooks/useOuterClick";

type Props = {
    orders: StoreOrderResponse[] | undefined;
    isFetchingOrders: boolean;
    handleFetchOrders({ clearPreviousOrders }: {
        clearPreviousOrders?: boolean | undefined;
    }): Promise<void>
};

const Orders = ({ orders, isFetchingOrders, handleFetchOrders }: Props) => {
    const [isDeliveryModalVisible, setIsDeliveryModalVisible] =
        useState<boolean>(false);
    const [isOrderModalVisible, setIsOrderModalVisible] =
        useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<StoreOrderResponse>();
    const [filterOrder, setFilterOrder] = useState<StatusEnums | 'all'>('all');
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    const getStatusLabel = (status: StatusEnums) => {
        switch (status) {
            case StatusEnums.Pending:
                return "Pending";
            case StatusEnums.Dispatched:
                return "Dispatched";
            case StatusEnums.Delivered:
                return "Delivered";
            default:
                return "Pending";
        }
    };

    const getStatusColor = (status: StatusEnums) => {
        switch (status) {
            case StatusEnums.Pending:
                return "#FD6A02";
            case StatusEnums.Delivered:
                return "#2C7865";
            default:
                return "#6f6f6f"; // Default color for other statuses
        }
    };

    const filteredOrders = orders?.filter(order => {
        if (filterOrder === 'all') return true;
        return order.status.some(status => status.status === filterOrder);
    });
    const statusRef = useRef<HTMLDivElement>(null);
    useOuterClick(statusRef, setIsDropdownVisible);
    return (
        <>
            <SellerDeliveryStatus
                visibility={isDeliveryModalVisible}
                setVisibility={setIsDeliveryModalVisible}
                selectedOrder={selectedOrder}
                handleFetchOrders={handleFetchOrders}
            />

            <OrdersMade
                visibility={isOrderModalVisible}
                setVisibility={setIsOrderModalVisible}
                selectedOrder={selectedOrder}
                isFetchingOrders={isFetchingOrders}
            />

            <section className="flex flex-col gap-8 overflow-x-auto hideScrollBar">
                <div className="flex flex-col gap-2">
                    <div className="relative" ref={statusRef}>
                        <h1
                            className="text-[#2C7865] w-fit flex items-center gap-2 text-xl font-bold cursor-pointer"
                            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                        >
                            Orders <span><DownArrowIcon /></span>
                        </h1>
                        {isDropdownVisible && (
                            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                                <ul>
                                    <li
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filterOrder === 'all' ? 'bg-gray-200' : ''}`}
                                        onClick={() => {
                                            setFilterOrder('all')
                                            setIsDropdownVisible(false);
                                        }}
                                    >
                                        All
                                    </li>
                                    <li
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filterOrder === StatusEnums.Pending ? 'bg-gray-200' : ''}`}
                                        onClick={() => {
                                            setFilterOrder(StatusEnums.Pending)
                                            setIsDropdownVisible(false);
                                        }}
                                    >
                                        Pending
                                    </li>
                                    <li
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filterOrder === StatusEnums.Dispatched ? 'bg-gray-200' : ''}`}
                                        onClick={() => {
                                            setFilterOrder(StatusEnums.Dispatched)
                                            setIsDropdownVisible(false);
                                        }}
                                    >
                                        Dispatched
                                    </li>
                                    <li
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filterOrder === StatusEnums.Delivered ? 'bg-gray-200' : ''}`}
                                        onClick={() => {
                                            setFilterOrder(StatusEnums.Delivered)
                                            setIsDropdownVisible(false);
                                        }}
                                    >
                                        Delivered
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <p className="text-base max-w-[700px] md:max-w-[600px] text-[#828282] leading-6">
                        A list of all orders from your shop, pls use the button to update
                        the delivery status and keep your customers updated
                    </p>
                </div>

                <div className="flex flex-col gap-14">
                    {filteredOrders?.map((order, index) => (
                        <div className="flex gap-4" key={index}>
                            <div className="bg-[#D9EDBF] text-[#2C7865] text-xl font-medium rounded-2xl flex flex-col gap-1 justify-center items-center min-w-[168px] h-[219px]">
                                {order.products.length}{" "}
                                {order.products.length > 1 ? "items" : "item"}
                                <BoxIcon />
                            </div>

                            <div className="">
                                {order.products.slice(0, 1).map((product, index) => (
                                    <>
                                        <p className="text-[#6F6F6F] text-lg mb-2">
                                            {product.name}
                                        </p>
                                        <span className="text-[#1E1E1E] text-lg mb-4">
                                            Item number: {order.orderId}
                                        </span>
                                        <h4 className="font-medium text-xl text-[#1E1E1E] mb-1">
                                            &pound;
                                            {(
                                                order?.products
                                                    .map(
                                                        (product) =>
                                                            product.amount *
                                                            (order.quantity.find((q) => q.id === product.id)
                                                                ?.quantity || 0)
                                                    )
                                                    .reduce((x, y) => x + y, 0) || 0
                                            ).toLocaleString()}
                                        </h4>
                                        <div className={`text-sm mb-6 whitespace-nowrap`}>
                                            {order.status.map((status) => (
                                                <p key={status.id}
                                                    style={{ color: getStatusColor(status.status) }}
                                                >{getStatusLabel(status.status)}</p>
                                            ))}
                                        </div>
                                    </>
                                ))}
                                <div className="flex items-center gap-5 text-[#6F6F6F] text-sm mb-6 whitespace-nowrap">
                                    <p className="flex items-center gap-1">
                                        <span className="bg-[#2C4A78] rounded-full text-[10px] text-white px-[9px] py-[1px]">
                                            {order.user.fullname.charAt(0)}
                                        </span>
                                        {order.user.fullname}
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <span>
                                            <LocationIcon />
                                        </span>
                                        {order.user.address.city}, {order.user.address.country}
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <span>
                                            <CalenderIcon />
                                        </span>
                                        {moment(order.createdAt).format("DD MMMM, YYYY")}
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <span>
                                            <TimeIcon />
                                        </span>
                                        {moment(order.createdAt).format("hh:mm A")}
                                    </p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setIsDeliveryModalVisible(true);
                                        }}
                                        className="border border-[#2C7865] bg-[#2C7865] text-white rounded-[13px] min-w-[204px] py-4 cursor-pointer"
                                    >
                                        Update delivery status
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setIsOrderModalVisible(true)
                                        }}
                                        className="border border-[#2C7865] rounded-[13px] bg-transparent text-[#2C7865]  min-w-[204px] py-4 cursor-pointer"
                                    >
                                        See products
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!orders && !filteredOrders && isFetchingOrders && <FullPageLoader />}
                {orders?.length == 0 && !isFetchingOrders && (
                    <p className="h-52 w-full grid place-items-center text-[#333333]">
                        No order available
                    </p>
                )}
                {filteredOrders?.length == 0 && !isFetchingOrders && (
                    <p className="h-52 w-full grid place-items-center text-[#333333]">
                        No order available
                    </p>
                )}
            </section>
        </>
    );
};

export default Orders;
