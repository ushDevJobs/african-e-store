import React, { useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';
import { useUpdateUserAddress } from '@/app/api/apiClients';
import { toast } from 'sonner';
import { createCustomErrorMessages } from '../constants/catchError';
import { TimesIcon } from '../SVGs/SVGicons';
import { useUserAddress } from '@/app/context/UserAddressContext';
import { UserAddressRequest } from '../models/IUserAddress';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAddressModal = ({ visibility, setVisibility }: Props) => {
    const updateUserAddress = useUpdateUserAddress();

    const [formValues, setFormValues] = useState<UserAddressRequest>({ city: '', postCode: 0, street: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingInput, setIsEditingInput] = useState(false);

    const { userAddress, fetchUserAddress } = useUserAddress();

    const [isFetchingUserAddress, setIsFetchingUserAddress] = useState<boolean>(true);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target; 
        // Convert postCode to a number if the field being changed is postCode
        setFormValues({
            ...formValues,
            [name]: name === 'postCode' ? Number(value) : value
        } as UserAddressRequest);
    }

    async function handleUpdateUserAddress() {
        setIsEditing(true);

        await updateUserAddress(formValues as UserAddressRequest)
            .then((response) => {
                toast.success('Success, address updated');
                fetchUserAddress(); 
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


    useEffect(() => {
        fetchUserAddress();
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
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Your city</label>
                                <input
                                    type="text"
                                    name='city'
                                    placeholder='Enter your city'
                                    value={formValues.city ? formValues.city : ''}
                                    onChange={handleChange}
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none'
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Postal/Zip code</label>
                                <input
                                    type="text"
                                    name='postCode'
                                    placeholder='Enter postal/zip code'
                                    value={formValues.postCode ? formValues.postCode : ''}
                                    onChange={handleChange}
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none'
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Your address</label>
                                <input
                                    type="text"
                                    name='street'
                                    placeholder='Enter your home/delivery address'
                                    value={formValues.street ? formValues.street : ''}
                                    onChange={handleChange}
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none'
                                />
                            </div>
                            <button disabled={isEditing} onClick={handleUpdateUserAddress} className='py-2 bg-[#2C7865] hover:bg-opacity-80 text-white w-full rounded-full cursor-pointer disabled:opacity-60 disabled:pointer-events-none'>
                                Proceed
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Your city</label>
                                <input
                                    type="text"
                                        name='city'
                                    value={userAddress?.city ? userAddress?.city : ''}
                                    disabled
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none disabled:opacity-50 disabled:pointer-events-none'
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Postal/Zip code</label>
                                <input
                                    type="text"
                                        name='postCode'
                                    value={userAddress?.postCode ? userAddress?.postCode : ''}
                                    disabled
                                    className='rounded-lg border w-full border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none disabled:opacity-50 disabled:pointer-events-none'
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className='text-[#1E1E1E]' htmlFor=""><span className='text-[#FD6A02]'>*</span>Your address</label>
                                <input
                                    type="text"
                                        name='street'
                                    value={userAddress?.street ? userAddress?.street : ''}
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

export default EditAddressModal;
