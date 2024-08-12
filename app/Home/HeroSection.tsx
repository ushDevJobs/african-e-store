'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles/HomePage/HeroSection.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import Link from 'next/link'
import { CategoriesResponse } from '../components/models/AllCategories'
import { useRouter } from 'next/navigation'
import { StorageKeys } from '../components/constants/StorageKeys'
import { useCategories } from '../context/CategoryContext'
import { FullPageLoader } from '../Loader/ComponentLoader'

type Props = {}

const HeroSection = (props: Props) => {
    const router = useRouter()

    const { categories, handleFetchAllCategories, isFetchingCategories } = useCategories();
    useEffect(() => {
        handleFetchAllCategories();
    }, []);
    return (
        <div className={styles.heroSection}>
            <div className={styles.backgroundImage}>
                <Image src={images.hero_bg} alt="hero background image" />
                <div className={styles.contents}>
                    <h1>An African Goods marketplace</h1>
                    <p>Buy and sell to Africans all over the globe with Rayvvin, create a buyer or seller account on our platform to get started.</p>
                    {categories && (
                        <div className={styles.categories}>
                            <h3 className='!mx-auto !text-center'>Suggested categories</h3>
                            <div className={styles.links}>
                                {categories.slice(0, 6).map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/categories/${category.id}?${category.name}`}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                    }
                    {!categories && isFetchingCategories && (
                        <div className="h-28">
                            <FullPageLoader />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default HeroSection