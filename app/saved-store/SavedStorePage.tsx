'use client'
import React, { useEffect, useState } from 'react'
import styles from './SavedStore.module.scss'
import { DotIcon, FilledLoveIcon, UserIcon } from '../components/SVGs/SVGicons'
import { SavedStoreResponse } from '../components/models/ISavedStore'
import { useFetchFavoriteStores } from '../api/apiClients'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import ComponentLoader from '../components/Loader/ComponentLoader'
type Props = {}

const SavedStorePage = (props: Props) => {
    const fetchSavedStores = useFetchFavoriteStores()
    const [savedStoreStores, setSavedStoreStores] = useState<SavedStoreResponse[]>()
    const [isFetchingStores, setIsFetchingStores] = useState<boolean>(true);

    async function handleFetchSavedStores() {

        // Start loader
        setIsFetchingStores(true);

        await fetchSavedStores()
            .then((response) => {
                console.log("Response: ", response.data.data);
                setSavedStoreStores(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingStores(false);
            });
    }

    useEffect(() => {
        handleFetchSavedStores();
    }, []);
    return (
        <div className={styles.main}>
            <h2 className='text-2xl text-[#828282] mb-4 font-medium'>Saved Sellers </h2>
            <p className='text-[#828282] text-base mb-8'>See sellers that you have saved </p>
            <div className='flex flex-col gap-4'>
               {savedStoreStores?.map((store) => (
                   <div className='flex items-center justify-between bg-[#F7FAFA] rounded-lg py-5 px-7' key={store.id}>
                       <div className="flex items-center gap-8">
                           <span className='bg-[#2C7865] h-fit p-8 rounded-full'><UserIcon /></span>
                           <div className="text-[#828282] flex flex-col gap-2">
                               <h2 className='text-xl underline font-medium'>{store.name}</h2>
                               <p className='text-sm mb-2'>{store.location}</p>
                               <div className="flex gap-2 items-center">
                                   <span className='flex items-center gap-1'><DotIcon />90% Feedback </span>
                                   <span className='flex items-center gap-1'><DotIcon />30 items sold</span>
                               </div>
                           </div>
                       </div>
                       <span className='p-3 rounded-full border border-[#828282]'><FilledLoveIcon /></span>
                   </div>
               ))}
            </div>
            { isFetchingStores && (
            <p className='h-[50vh]'>
                    <ComponentLoader lightTheme svgStyle={{ width: '62px' }} />
            </p>
            )}
            {!savedStoreStores && !isFetchingStores &&
                <p className={styles.loaderText}>No stores found</p>
            }
        </div>
    )
}

export default SavedStorePage