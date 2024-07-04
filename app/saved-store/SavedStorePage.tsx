'use client'
import React, { useEffect, useState } from 'react'
import styles from './SavedStore.module.scss'
import { DotIcon, FavoriteIcon, FilledLoveIcon, UserIcon } from '../components/SVGs/SVGicons'
import { SavedStoreResponse } from '../components/models/ISavedStore'
import { useAddStoreToFavorite, useFetchAllStores, useFetchFavoriteStores, useRemoveStoreFromFavorite } from '../api/apiClients'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import ComponentLoader from '../components/Loader/ComponentLoader'
import { AllStoresResponse } from '../components/models/IStores'
type Props = {}

const SavedStorePage = (props: Props) => {
    const fetchSavedStores = useFetchFavoriteStores()
    const [savedStoreStores, setSavedStoreStores] = useState<SavedStoreResponse[]>()
    const [isFetchingSavedStores, setIsFetchingSavedStores] = useState<boolean>(true);
    const removeStoreFromFavorite = useRemoveStoreFromFavorite()

    async function handleFetchSavedStores() {

        // Start loader
        setIsFetchingSavedStores(true);

        await fetchSavedStores()
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setSavedStoreStores(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingSavedStores(false);
            });
    }

    async function handleRemoveStoreFromFavorite(storeId: string) {

        await removeStoreFromFavorite(storeId)
            .then((response) => {

                // Log response 
                // console.log(response);
                const updatedStores = savedStoreStores?.map(store =>
                    store.storeDetails.id === storeId ? { ...store, favourite: [response.data] } : store
                );
                setSavedStoreStores(updatedStores);

                // Display success 
                toast.success('Store removed from favorites successfully.');
                handleFetchSavedStores()
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
        handleFetchSavedStores();
    }, []);

    return (
        <div className={styles.main}>
            <h2 className='text-2xl text-[#828282] mb-4 font-medium'>Saved Sellers </h2>
            <p className='text-[#828282] text-base mb-8'>See sellers that you have saved </p>
            <div className='flex flex-col gap-4 max-h-[500px] overflow-y-auto'>
                {savedStoreStores?.map((store) => (
                    <div className='flex items-center justify-between bg-[#F7FAFA] rounded-lg py-5 px-7' key={store.storeDetails.id}>
                        <div className="flex items-center gap-8">
                            <span className='bg-[#2C7865] h-fit p-8 rounded-full'><UserIcon /></span>
                            <div className="text-[#828282] flex flex-col gap-2">
                                <h2 className='text-xl underline font-medium'>{store.storeDetails.name}</h2>
                                <p className='text-sm mb-2'>{store.storeDetails.description}</p>
                                <div className="flex gap-2 items-center">
                                    <span className='flex items-center gap-1'><DotIcon />{store.feedback}&#37; Feedback </span>
                                    <span className='flex items-center gap-1'><DotIcon />{store?.totalItemSold == 0 ? '0' : store?.totalItemSold} {store?.totalItemSold > 1 ? "Items Sold" : "Item Sold"}</span>
                                </div>
                            </div>
                        </div>
                        <span onClick={(e) => {
                            e.preventDefault(); // Prevent navigation on click
                            handleRemoveStoreFromFavorite(store.storeDetails.id);
                        }}
                            className='p-3 cursor-pointer rounded-full border border-[#828282]'><FilledLoveIcon /></span>
                    </div>
                ))}
            </div>
            {isFetchingSavedStores && (
                <p className='h-[50vh]'>
                    <ComponentLoader lightTheme svgStyle={{ width: '62px' }} />
                </p>
            )}
            {!savedStoreStores && !isFetchingSavedStores &&
                <p className={styles.loaderText}>No stores found</p>
            }
        </div>
    )
}

export default SavedStorePage