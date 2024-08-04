"use client"
import React, { useEffect, useState } from 'react'
import Chart from './Chart'
import styles from '../stores/[storeId]/SellerStore.module.scss';
import { useFetchStoreIncome } from '../api/apiClients';
import { IncomeResponse } from '../components/models/Income';
import { createCustomErrorMessages } from '../components/constants/catchError';
import { toast } from 'sonner';
import { BoxIcon, CalenderIcon, LocationIcon, TimeIcon } from '../components/SVGs/SVGicons';
import { FullPageLoader } from '../Loader/ComponentLoader';
import moment from 'moment';

type Props = {}

const IncomePage = (props: Props) => {
    const fetchIncome = useFetchStoreIncome()

    const [income, setIncome] = useState<IncomeResponse>()

    const [isFetchingIncome, setIsFetchingIncome] = useState<boolean>(true);

    async function handleFetchIncome() {

        // Show loader
        setIsFetchingIncome(true);
        await fetchIncome()
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setIncome(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingIncome(false);
            });
    }

    useEffect(() => {
        handleFetchIncome();
    }, [])

    return (
        <>
            {isFetchingIncome ? (
                <div className="h-[40vh]"><FullPageLoader /></div>
            ) : (
                income ? (
                    <div className={`${styles.main} flex flex-col gap-20`}>
                        <Chart income={income} />
                        <div>
                            <h1 className='text-[#333333] text-2xl font-bold mb-10'>Transactions</h1>
                            <div className="flex flex-col gap-10">
                                {income.transactions.map((transaction, index) => (
                                    <div className='flex gap-6' key={index}>
                                        <div className="bg-[#D9EDBF] text-[#2C7865] text-xl font-medium rounded-2xl flex flex-col gap-1 justify-center items-center min-w-[168px] h-[219px]">
                                            {transaction.products.length}{" "}
                                            {transaction.products.length > 1 ? "items" : "item"}
                                            <BoxIcon />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            {transaction.products.slice(0, 1).map((product, index) => (
                                                <p key={index} className="text-[#6F6F6F] text-lg">{product.name}</p>
                                            ))}
                                            {transaction.status.slice(0, 1).map((status, index) => (
                                                <div className="flex flex-col gap-2" key={index}>
                                                    <p>Item number {status.orderId}</p>
                                                    <h3 className="text-[#000] font-medium text-sm">{status.status}</h3>
                                                </div>
                                            ))}
                                            <h3 className="font-medium text-xl text-[#1E1E1E]">&pound;{transaction.products[0] && transaction.products[0].amount.toLocaleString()}</h3>
                                            <div className="flex items-center gap-5 text-[#6F6F6F] text-sm mb-6 mt-4 whitespace-nowrap">
                                                <p className="flex items-center gap-1">
                                                    <span className="bg-[#2C4A78] rounded-full text-[10px] text-white px-[9px] py-[1px]">
                                                        {transaction.user.fullname.charAt(0)}
                                                    </span>
                                                    {transaction.user.fullname}
                                                </p>
                                                <p className="flex items-center gap-1">
                                                    <span>
                                                        <LocationIcon />
                                                    </span>
                                                    {transaction.user.address ?? "Location here"}
                                                </p>
                                                <p className="flex items-center gap-1">
                                                    <span>
                                                        <CalenderIcon />
                                                    </span>
                                                    {moment(transaction.createdAt).format("DD MMMM, YYYY")}
                                                </p>
                                                <p className="flex items-center gap-1">
                                                    <span>
                                                        <TimeIcon />
                                                    </span>
                                                    {moment(transaction.createdAt).format("hh:mm A")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className='text-center text-[#666666] mt-10 h-[40vh]'>No data available</p>
                )
            )}
        </>
    )
}

export default IncomePage