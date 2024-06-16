'use client'
import React, { useEffect, useState } from 'react'
import styles from './Stores.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { FavoriteIcon, FilledLoveIcon, SearchIcon, UkIcon } from '../components/SVGs/SVGicons'
import { CategoriesHeader } from '../components/CategoriesHeader'
import { useFetchAllStores } from '../api/apiClients'
import { AllStoresResponse } from '../components/models/IStores'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import ComponentLoader from '../components/Loader/ComponentLoader'

type Props = {}

const StorePage = (props: Props) => {
    const isFavorite = true
    const fetchStores = useFetchAllStores()
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
                                {isFavorite ? <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FilledLoveIcon /></span>
                                    : <span className='absolute right-2 top-2 bg-white p-3 cursor-pointer rounded-full'><FavoriteIcon /></span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className='text-[#828282] text-base'>{store.name} </h4>
                                <p className='text-[#828282] text-sm'>{store.description ? store.description : 'lorem ipsum'}</p>
                                <span className='flex items-center gap-2'>{store.location == 'Nigeria' ? '' : <UkIcon />} {store.location}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {!stores && !filteredStores && isFetchingStores && (
                <ComponentLoader lightTheme svgStyle={{ width: '62px' }} />
            )}
            {!stores ||
                (filteredStores?.length == 0 && !isFetchingStores && (
                    <p className={styles.loaderText}>There are no stores available</p>
                ))}
        </div>
    )
}

export default StorePage