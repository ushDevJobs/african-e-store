import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { CameraIcon, ImageIcon } from '../SVGs/SVGicons'
import Label from '../ui/label'
import Input from '../ui/input'
import Button from '../ui/button'
import TextArea from '../ui/textarea'
import { ProfileRequest, SellerStoreResponse } from '../models/ISellerStore'
import { useUpdateProfile } from '@/app/api/apiClients'
import { toast } from 'sonner'
import { createCustomErrorMessages } from '../constants/catchError'
import Image from 'next/image'

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    handleFetchStore: () => Promise<void>;
    selectedStore: SellerStoreResponse | undefined
}

const EditProfileModal = ({ visibility, setVisibility, handleFetchStore, selectedStore }: Props) => {
    const updateProfile = useUpdateProfile();
    const [formValues, setFormValues] = useState<ProfileRequest>();
    const [updatedFormValues, setUpdatedFormValues] = useState<ProfileRequest>();
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [userPhoto, setUserPhoto] = useState<string>();
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    console.log(formValues)
console.log({updatedFormValues})

    function onFormValueChange(e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) {

        const { name, value } = e.target;

        setFormValues({ ...formValues as ProfileRequest, [name]: value });
        setUpdatedFormValues({ ...updatedFormValues as ProfileRequest, [name]: value });
    };

    const handleFileUpload = (e: any) => {
        const selectedFile: File = e.target.files[0];
        console.log({ selectedFile })
        if (selectedFile && (selectedFile.type === "image/jpg" || selectedFile.type === "image/png" || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/webp')) {
            setSelectedImageFile(selectedFile);
            const imgURL = URL.createObjectURL(selectedFile);
            setUserPhoto(imgURL);
        }
    };

    async function handleUpdateProfile(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        // Log request 

        // Show loader 
        setIsUpdatingProfile(true);

        await updateProfile(updatedFormValues as ProfileRequest)
            .then((response) => {
                // Log response 
                // console.log(response);

                // Fetch stoore 
                handleFetchStore();

                // Display success
                toast.success('Success, Profile updated..');

                // Close modal 
                setVisibility(false);
            })
            .catch((error) => {
                // Display error 
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {

                // Close loader 
                setIsUpdatingProfile(false);
            })
    };

    useEffect(() => {
        if (selectedStore?.storeDetails) {
            setUserPhoto(selectedStore.storeDetails.image);
        }
    }, [selectedStore?.storeDetails])

    useEffect(() => {
        setFormValues(selectedStore?.storeDetails);
        setUpdatedFormValues(selectedStore?.storeDetails);
    }, [selectedStore?.storeDetails]);
    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: "transparent" }}
        >
            <form className="flex flex-col gap-8 min-w-[400px] bg-[#fff] overflow-y-auto max-h-[90vh] p-10 w-full rounded-[37px]" onSubmit={(e) => handleUpdateProfile(e)}>
                <h2 className='text-2xl text-[#1E1E1E] mb-3 text-center font-medium'>Edit your profile</h2>
                <div className='flex flex-col items-center mb-4 relative w-fit h-fit mx-auto justify-center'>
                    <div className='w-[120px] h-[120px] rounded-full bg-gray-300 grid place-items-center overflow-hidden mb-3 relative '>
                        <span className='inline-flex'><ImageIcon /></span>
                        {/* {userPhoto && <Image src={userPhoto} alt="User photo" fill />} */}
                    </div>
                    <button type='button' className='text-white text-sm font-medium cursor-pointer bg-primary w-10 h-10 grid place-items-center rounded-full absolute bottom-0 right-0 '>
                        <input type="file" className='absolute w-full h-full top-0 left-0 cursor-pointer opacity-0' onChange={(e) => handleFileUpload(e)} />
                        <CameraIcon />
                    </button>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <Label text={<label>Store name </label>} />
                    <Input
                        type="text" name="name"
                        className=' w-full py-[10px] px-4 placeholder:text-sm text-base !rounded-[10px]'
                        onChange={(e) => onFormValueChange(e)}
                        value={formValues?.name}
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <Label text={<label>Brief</label>} />
                    <TextArea
                        name="description"
                        className=' w-full py-[10px] px-4 placeholder:text-sm text-base !rounded-[10px]'
                        onChange={(e) => onFormValueChange(e)}
                        value={formValues?.description}
                    />
                </div>
                <div className="flex items-center ml-auto text-sm gap-5">
                    <Button type='button' onClick={() => setVisibility(false)} className='!bg-transparent !text-[#2C7865] cursor-pointer transition-all ease-in duration-300'>Cancel</Button>
                    <Button type='submit' disabled={isUpdatingProfile} className='px-10 cursor-pointer disabled:opacity-60 disabled:pointer-events-none '>
                        {isUpdatingProfile ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </ModalWrapper>
    )
}

export default EditProfileModal