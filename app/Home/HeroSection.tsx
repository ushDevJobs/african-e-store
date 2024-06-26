'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles/HomePage/HeroSection.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { SearchIcon } from '../components/SVGs/SVGicons'
import Link from 'next/link'
import useResponsiveness from '../components/hooks/responsiveness-hook'
import { CategoriesResponse } from '../components/models/AllCategories'
import { useRouter } from 'next/navigation'
import { StorageKeys } from '../components/constants/StorageKeys'

type Props = {}

const HeroSection = (props: Props) => {
    const router = useRouter()
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    const [retrievedCategories, setRetrievedCategories] = useState<CategoriesResponse[]>();

    useEffect(() => {
        if (router) {
            // Get the retrieved categories placed
            const _retrievedCategories = sessionStorage.getItem(
                StorageKeys.AllCategories
            );

            // If we have a retrieved categoriess...
            if (_retrievedCategories) {
                // Update the state
                setRetrievedCategories(JSON.parse(_retrievedCategories) as CategoriesResponse[]);
            }
        }

        // Run this effect only when the router is ready, which means: when the page is loaded
    }, [router]);
    return (
            <div className={styles.heroSection}>
                <div className={styles.backgroundImage}>
                    <Image src={images.hero_bg} alt='hero background image' />
                    <div className={styles.contents}>
                        <h1>An African Goods market place </h1>
                        <p>Buy and sell to Africans all over the globe with Rayvinn, create a buyer or seller account on our platform to get started.</p>
                        {/* <div className={styles.search}>
                            <SearchIcon />
                            <input type="text" placeholder='Search for your items ' />
                        </div> */}
                        <div className={styles.categories}>
                            <h3>Suggested categories</h3>
                            <div className={styles.links}>
                            {retrievedCategories?.slice(0, 6).map((category) => (
                                    <Link key={category.id}
                                        href={`/categories/${category.id}?${category.name}`}
                                    >
                                    {category.name}
                                    </Link>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default HeroSection