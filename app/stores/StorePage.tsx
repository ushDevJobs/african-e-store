'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import styles from './Stores.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { FavoriteIcon, FilledLoveIcon, SearchIcon, UkIcon } from '../components/SVGs/SVGicons'
import { CategoriesHeader } from '../components/CategoriesHeader'
import { useAddStoreToFavorite, useFetchAllStores, useRemoveStoreFromFavorite } from '../api/apiClients'
import { AllStoresResponse } from '../components/models/IStores'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import ComponentLoader from '../components/Loader/ComponentLoader'
import Link from 'next/link'

type Props = {}

const StorePage = (props: Props) => {
    const fetchStores = useFetchAllStores()
    const addStoreToFavorite = useAddStoreToFavorite()
    const removeStoreFromFavorite = useRemoveStoreFromFavorite()
    const [searchQuery, setSearchQuery] = useState('')

    const [stores, setStores] = useState<AllStoresResponse[]>();
    const [isFetchingStores, setIsFetchingStores] = useState<boolean>(true);


    async function handleFetchStores() {

        // Start loader
        setIsFetchingStores(true);

        await fetchStores()
            .then((response) => {
                console.log("Response: ", response.data.data);

                setStores(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingStores(false);
            });
    }

    const filteredStores = stores?.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    async function handleAddStoreToFavorite(storeId: string) {

        await addStoreToFavorite(storeId)
            .then((response) => {

                // Log response 
                console.log(response);
                const updatedStores = stores?.map(store =>
                    store.id === storeId ? { ...store, favourite: [response.data] } : store
                );
                setStores(updatedStores);
                handleFetchStores()
                // Display success 
                toast.success('Store added successfully.');
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
    async function handleRemoveStoreFromFavorite(storeId: string) {

        await removeStoreFromFavorite(storeId)
            .then((response) => {

                // Log response 
                console.log(response);
                const updatedStores = stores?.map(store =>
                    store.id === storeId ? { ...store, favourite: [response.data] } : store
                );
                setStores(updatedStores);
                handleFetchStores()
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
        handleFetchStores();
    }, []);
    return (
        <div className={styles.main}>
            <CategoriesHeader mainText='Explore different stores on Rayvvin ' subText='Search for any store of your choice, rayvvin ensures the authenticity of vendors ' />

            <div className={styles.contents}>
                <div className={styles.fieldContainer}>
                    <SearchIcon />
                    <input type="text"
                        placeholder='Search name of store'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.cards}>
                    {filteredStores?.map((store, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.image}>
                                <Image fill src={images.cashew} alt='product image' />
                                <span
                                    className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent navigation on click
                                        if (store.favourite.length === 0) {
                                            handleAddStoreToFavorite(store.id);
                                        } else {
                                            handleRemoveStoreFromFavorite(store.id);
                                        }
                                    }}>
                                    {store.favourite.length === 0 ? <FavoriteIcon /> : <FilledLoveIcon />}                                </span>
                            </div>
                            <Link href={`/stores/${store.id}`} className="flex flex-col gap-2 w-fit">
                                <h4 className='text-[#828282] text-base'>{store.name} </h4>
                                <p className='text-[#828282] text-sm'>{store.description ? store.description : 'lorem ipsum'}</p>
                                <span className='flex items-center gap-2'>{store.location == 'Nigeria' ? '' : <UkIcon />} {store.location}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            {!stores && !filteredStores && isFetchingStores && (
                <ComponentLoader lightTheme svgStyle={{ width: '62px' }} />
            )}
            {!stores && !isFetchingStores &&
                <p className={styles.loaderText}>No stores found</p>
            }
            {filteredStores?.length == 0 && !isFetchingStores &&
                <p className={styles.loaderText}>No result found</p>
            }
        </div>
    )
}

export default StorePage