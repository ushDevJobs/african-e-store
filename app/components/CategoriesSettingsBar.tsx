import React, { useState } from 'react'
import styles from '../styles/CategoriesSettingsBar.module.scss'
import { CategoriesResponse } from './models/AllCategories'
import Link from 'next/link';

type Props = {
    categories?: CategoriesResponse[];
    activeCategory?: string;
    retrievedCategories?: CategoriesResponse[] | undefined;
}

const CategoriesSettingsBar = ({ categories, activeCategory, retrievedCategories }: Props) => {

    return (
        <div className={styles.settingsBar}>
            <div className={styles.catgoriesFilter}>
                <h3>Categories</h3>
                {categories &&
                 <ul>
                    {categories && categories.map((category) => (
                        <li key={category.id}
                            className={activeCategory === category.name ? styles.active : ''}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>}
                {retrievedCategories &&
                 <ul>
                        {retrievedCategories.map((category) => (
                            <Link href={`/categories/${category.id}?${category.name}`} key={category.id}>
                           <li>
                            {category.name}
                        </li>    
                            </Link>
                     
                    ))}
                </ul>}
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

export default CategoriesSettingsBar