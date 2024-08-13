import React from 'react'
import styles from '../../styles/MobileCategoriesSettingsBar.module.scss'
import Link from 'next/link';
import { motion } from "framer-motion";
import { TimesIcon } from '../SVGs/SVGicons';
import { StoreCategoriesResponse } from '../models/IStores';
import { mobileMenuVariant } from '../animations/navbarAnimations';

type Props = {
    activeCategory?: string;
    onCategoryClick: (categoryId: string) => void;
    setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
    storeCategories: StoreCategoriesResponse[] | undefined
}

const MobileStoreSettingsBar = ({
    activeCategory,
    onCategoryClick,
    setIsFilterOpen,
    storeCategories
}: Props) => {
    return (
        <motion.div className={`${styles.settingsBar}`} variants={mobileMenuVariant({ direction: "fromLeft" })}>
            <span onClick={() => setIsFilterOpen(false)} className='ml-auto cursor-pointer flex items-end justify-end mb-4 w-fit'>
                <TimesIcon />
            </span>

            <div className={`${styles.catgoriesFilter} mb-3`}>
                <h3>Categories</h3>
                {storeCategories &&
                    <ul>
                        {storeCategories && storeCategories.map((category) => (
                            <li key={category.id}
                                className={activeCategory === category.name ? styles.active : ''}
                                onClick={() => {
                                    onCategoryClick(category.id)
                                    setIsFilterOpen(false)
                                }
                                }
                            >
                                {category.name}
                            </li>
                        ))}

                        {storeCategories && storeCategories.length === 0 &&
                            <li className='text-center flex flex-col items-center justify-center mt-4 text-gray-400 text-base'>
                                No category available</li>
                        }
                    </ul>}
                {/* {retrievedCategories &&
                    <ul>
                        {retrievedCategories.map((category) => (
                            <Link href={`/categories/${category.id}?${category.name}`} key={category.id} onClick={() => setIsFilterOpen(false)}>
                                <li>
                                    {category.name}
                                </li>
                            </Link>
                        ))}
                        {categories && categories.length === 0 &&
                            <li className='text-center flex flex-col items-center justify-center mt-4 text-gray-400 text-base'>
                                No category available</li>
                        }
                    </ul>} */}
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
        </motion.div >
    )
}

export default MobileStoreSettingsBar