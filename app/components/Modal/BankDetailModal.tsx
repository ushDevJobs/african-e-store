import React, { useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { useFetchBankDetail, useUpdateBankDetail } from '@/app/api/apiClients';
import { BankDetailRequest, BankDetailResponse } from '../models/IBankDetails';
import { toast } from 'sonner';
import { createCustomErrorMessages } from '../constants/catchError';
import { TimesIcon } from '../SVGs/SVGicons';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const BankDetailModal = ({ visibility, setVisibility }: Props) => {
    const updateBankDetail = useUpdateBankDetail();
    const fetchBankDetail = useFetchBankDetail();
    const [formValues, setFormValues] = useState<BankDetailRequest>({ accountNumber: '', bank: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingInput, setIsEditingInput] = useState(false);

    const [bankDetail, setBankDetail] = useState<BankDetailResponse>();
    const [isFetchingBankDetail, setIsFetchingBankDetail] = useState<boolean>(true);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value } as BankDetailRequest);
    }

    async function handleUpdateBankDetail() {
        setIsEditing(true);

        await updateBankDetail(formValues as BankDetailRequest)
            .then((response) => {
                toast.success('Success, bank detail updated');
                handleFetchBankDetail(); // Refresh the bank details
                setIsEditingInput(false);
                setVisibility(false);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data);
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsEditing(false);
            });
    }

    async function handleFetchBankDetail() {
        setIsFetchingBankDetail(true);

        await fetchBankDetail()
            .then((response) => {
                console.log(response);
                setBankDetail(response.data.data);
                // Initialize form values with fetched data
                setFormValues({
                    accountNumber: response.data.data.bankDetails.accountNumber,
                    bank: response.data.data.bankDetails.bank
                });

            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data);
                // toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingBankDetail(false);
            });
    }

    useEffect(() => {
        handleFetchBankDetail();
    }, []);

    const handleEdit = () => {
        setIsEditingInput(true)
    };

    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: "transparent" }}
        >
            <div className="bg-white rounded-[34px] md:w-[600px] w-full flex flex-col md:py-7 py-4 px-4 md:px-[32px]">
                <span onClick={() => {
                    setVisibility(false)
                    setIsEditingInput(false)
                }}
                    className='ml-auto cursor-pointer mb4 hover:bg-green-200 hover:rounded'><TimesIcon /></span>
                <div className='flex flex-col w-full md:w-[70%] mx-auto gap-7'>
                    {isEditingInput ? (
                        <>
                            <div className="gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Enter account number</label>
                                <input
                                    type="text"
                                    name='accountNumber'
                                    placeholder='Enter account number'
                                    value={formValues.accountNumber ? formValues.accountNumber : bankDetail?.bankDetails.accountNumber}
                                    onChange={handleChange}
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none'
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Enter bank</label>
                                <input
                                    type="text"
                                    name='bank'
                                    placeholder='Enter bank'
                                    value={formValues.bank ? formValues.bank : bankDetail?.bankDetails.bank}
                                    onChange={handleChange}
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none'
                                />
                            </div>
                            <button disabled={isEditing} onClick={handleUpdateBankDetail} className='py-2 bg-[#2C7865] hover:bg-opacity-80 text-white w-full rounded-full cursor-pointer disabled:opacity-60 disabled:pointer-events-none'>
                                Proceed
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Enter account number</label>
                                <input
                                    type="text"
                                    name='accountNumber'
                                    value={bankDetail?.bankDetails ? bankDetail?.bankDetails.accountNumber : formValues.accountNumber}
                                    disabled
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none disabled:opacity-50 disabled:pointer-events-none'
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Enter bank</label>
                                <input
                                    type="text"
                                    name='bank'
                                    value={bankDetail?.bankDetails ? bankDetail?.bankDetails.bank : formValues.bank}
                                    disabled
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none disabled:opacity-50 disabled:pointer-events-none'
                                />
                            </div>
                            <button onClick={handleEdit} className='py-2 bg-[#2C7865] hover:bg-opacity-80 text-white w-full rounded-full cursor-pointer'>
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>
        </ModalWrapper>
    );
};

export default BankDetailModal;
