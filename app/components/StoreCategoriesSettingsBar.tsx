import React, { useState } from 'react'
import styles from '../styles/CategoriesSettingsBar.module.scss'
import { StoreSettingsBarSkeletonLoader } from '../stores/StoresSkeleton';
import { StoreCategoriesResponse } from './models/IStores';

type Props = {
    storeCategories: StoreCategoriesResponse | undefined
    isFetchingStoreCategories: boolean
    activeCategory: string
}

const StoreCategoriesSettingsBar = ({ storeCategories, isFetchingStoreCategories, activeCategory }: Props) => {

    return (
        <>
            {!storeCategories?.categories && isFetchingStoreCategories ? <StoreSettingsBarSkeletonLoader /> : (
                <div className={styles.settingsBar}>
                    <div className={styles.catgoriesFilter}>
                        <h3>Categories</h3>
                        <ul>
                            {storeCategories?.categories && storeCategories.categories.map((category) => (
                                <li key={category.id}
                                    className={activeCategory === category.name ? styles.active : ''}
                                >
                                    {category.name}
                                </li>
                            ))}
                            {storeCategories &&
                                <li className='text-center flex flex-col items-center justify-center mt-4 text-gray-400 text-base'>
                                    No category available</li>
                            }
                        </ul>

                    </div>

                    <div className={styles.condition}>
                        <h3>Condition</h3>
                        <div className={styles.field}>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">New (12)</label>
                        </div>
                        <div className={styles.field}>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Used (12)</label>
                        </div>
                    </div>
                    <div className={styles.priceFilter}>
                        <h3>price</h3>
                    </div>
                    <div className={styles.condition}>
                        <h3>Delivery options</h3>
                        <div className={styles.field}>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Free</label>
                        </div>
                        <div className={styles.field}>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Pickup</label>
                        </div>
                    </div>
                </div>
            )
            }
        </>

    )
}

export default StoreCategoriesSettingsBar