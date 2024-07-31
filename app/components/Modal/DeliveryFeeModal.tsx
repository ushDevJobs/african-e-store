import React, { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { TimesIcon } from '../SVGs/SVGicons';
import { useUpdateShippingFee } from '@/app/api/apiClients';
import { ShippingFeeRequest } from '../models/IShippingFee';
import { toast } from 'sonner';
import { createCustomErrorMessages } from '../constants/catchError';

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeliveryFeeModal = ({ visibility, setVisibility }: Props) => {

    const updateShippingFee = useUpdateShippingFee();

    const [isEditing, setIsEditing] = useState(false);

    const [shippingFee, setShippingFee] = useState('');

    async function handleUpdateShippingFee(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //show loader
        setIsEditing(true);

        const updatedShippingFee: ShippingFeeRequest = {
            fee: Number(shippingFee),
        };

        await updateShippingFee(updatedShippingFee)
            .then((response) => {
                // Log response
                console.log(response);

                // Display success
                toast.success('Success, shipping fee updated');

                setShippingFee('');
            })
            .catch((error) => {
                // Display error
                const errorMessage = createCustomErrorMessages(error.response?.data);
                toast.error(errorMessage);
            })
            .finally(() => {
                // Close loader
                setIsEditing(false);
            });
    }

    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: "transparent" }}
        >
            <div className="bg-white rounded-[34px] md:w-[600px] w-full text-center flex flex-col py-7 px-[32px]">
                <span onClick={() => setVisibility(false)} className='ml-auto cursor-pointer mb4 hover:bg-green-200 hover:rounded'><TimesIcon /></span>
                <h2 className="text-[#828282] font-medium text-2xl mb-2">Update delivery fees </h2>
                <p className="text-[#828282] font-normal text-base mb-8">Kindly update your delivery fee for all your products </p>
                <form className='flex flex-col w-full md:w-[70%] mx-auto gap-7' onSubmit={(e) => handleUpdateShippingFee(e)}>
                    <input type="text"
                        placeholder='Enter amount here '
                        value={shippingFee}
                        onChange={(e) => setShippingFee(e.target.value)}
                        className='rounded-lg border border-[#ACACAC] text-base placeholder:text-[#828282] p-4 outline-none'
                    />
                    <button disabled={isEditing} type='submit' className='py-2 bg-[#2C7865] hover:bg-opacity-80 text-white w-full rounded-full cursor-pointer disabled:opacity-60 disabled:pointer-events-none'>
                        Update fee
                    </button>
                </form>
            </div>
        </ModalWrapper>
    )
}

export default DeliveryFeeModal