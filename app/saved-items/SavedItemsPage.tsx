'use client'
import React, { useEffect, useState } from 'react'
import styles from '../saved-store/SavedStore.module.scss'
import { CheckIcon, EmptyStarIcon, FilledLoveIcon, UserIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import images from '@/public/images'
import useResponsiveness from '../components/hooks/responsiveness-hook'
import { useFetchFavoriteProducts, useRemoveProductFromFavorite } from '../api/apiClients'
import { SavedProductsResponse } from '../components/models/ISavedStore'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import ComponentLoader from '../components/Loader/ComponentLoader'
import Link from 'next/link'
type Props = {}

const SavedItemsPage = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    const fetchSavedProducts = useFetchFavoriteProducts()
    const [savedProducts, setSavedProducts] = useState<SavedProductsResponse[]>()
    const [isFetchingSavedProducts, setIsFetchingSavedProducts] = useState<boolean>(true);
    const removeProductFromFavorite = useRemoveProductFromFavorite()

    async function handleFetchSavedProducts() {

        // Start loader
        setIsFetchingSavedProducts(true);

        await fetchSavedProducts()
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setSavedProducts(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingSavedProducts(false);
            });
    }

    async function handleRemoveProductFromFavorite(id: string) {

        await removeProductFromFavorite(id)
            .then((response) => {

                handleFetchSavedProducts()
                // Display success 
                toast.success('Store removed from favorites successfully.');

            })
            .catch((error) => {
                // Display error
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage)
            })
            .finally(() => {

                // Close laoder 
                // setIsLoading(false);
            })
    };

    useEffect(() => {
        handleFetchSavedProducts();
    }, []);
    return (
        <div className={styles.main}>
            <h2 className='text-2xl text-[#828282] mb-4 font-medium'>Saved Items  </h2>
            <p className='text-[#828282] text-base mb-8'>All your saved items from the store </p>
            <div className='flex flex-col gap-8'>
                {onDesktop && (
                    savedProducts?.map((product) => (
                        <div className="flex flex-col bg-[#F7FAFA] rounded-lg py-5 px-7" key={product.id}>
                            <span
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent navigation on click
                                    handleRemoveProductFromFavorite(product.id);
                                }}
                                className='p-3 rounded-full w-fit cursor-pointer ml-auto border border-[#828282]'><FilledLoveIcon /></span>
                            <div className="flex flex-col gap-8">
                                <div className="flex gap-2 items-center">
                                    {product.store.image ?
                                        <div className="relative h-[50px] w-[50px]">
                                            <Image
                                                src={product.store.image}
                                                alt="Logo"
                                                fill
                                                className="object-cover rounded-full"
                                            />
                                        </div> :
                                        <span className="bg-[#2C7865] h-fit p-3 rounded-full">
                                            <UserIcon />
                                        </span>
                                    }
                                    <Link className='font-medium text-[#828282] border-b border-b-[#828282] text-lg' href={`/stores/${product.store.id}`}>{product.store.name}</Link>
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-10">
                                        <div className="relative w-[80px] h-[80px]"> <Image src={product.coverImage} fill alt='product image' /></div>
                                        <div className="flex flex-col gap-3">
                                            <h2 className=' text-[#1E1E1E] text-xl border-b border-b-[#1E1E1E]'>{product.name}</h2>
                                            <p className='text-[#828282] text-sm'>Condition: {product.itemCondition}</p>
                                            <p className='text-[#828282] text-sm'>Status: {product.salesType}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h3 className='text-[#1E1E1E] text-xl font-medium'>&pound;{product.amount}</h3>
                                        <p className='text-[#6F6F6F] text-sm '>Shipping &pound;shipping fee here</p>
                                        <p className='text-[#6F6F6F] text-sm '>{product.returnPolicy == 'true' ? 'Returns accepted' : 'Returns not accepted'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                )}
                {onMobile && (
                    savedProducts?.map((product) => (
                        <div className="flex gap-7" key={product.id}>
                            <div className="relative w-[85px] h-[104px]">
                                <Image src={product.coverImage} fill alt='product image' />
                                <span onClick={(e) => {
                                    e.preventDefault(); // Prevent navigation on click
                                    handleRemoveProductFromFavorite(product.id);
                                }} className="absolute -top-3 -right-3 px-[5px] py-[6px] bg-white cursor-pointer rounded-full border border-[#828282]">
                                    <FilledLoveIcon />
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link className='font-medium text-[#828282] border-b border-b-[#828282] text-lg' href={`/stores/${product.store.id}`}>{product.store.name}</Link>
                                <h2 className='text-[#1E1E1E] max-w-[207px] text-sm leading-4'>{product.name}</h2>
                                <h3 className='text-[#1E1E1E] text-sm font-medium'>&pound;{product.amount} + €16 shipping </h3>
                                <p className='text-[#828282] text-xs'>Condition: {product.itemCondition} </p>
                                <p className='text-[#828282] text-xs'>Status: {product.salesType}</p>
                            </div>
                        </div>
                    ))

                )}
            </div>
            {isFetchingSavedProducts && (
                <p className='h-[50vh]'>
                    <ComponentLoader lightTheme svgStyle={{ width: '62px' }} />
                </p>
            )}
            {savedProducts?.length == 0 &&
                <p className={styles.loaderText}>No saved product found</p>
            }
        </div>
    )
}

export default SavedItemsPage