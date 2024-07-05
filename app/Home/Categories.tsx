'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles/HomePage/CategoriesSection.module.scss'
import { LeftArrowIcon, LongArrowIcon, RightArrowIcon } from '../components/SVGs/SVGicons'
import Link from 'next/link'
import images from '@/public/images'
import Image from 'next/image'
import useResponsiveness from '../components/hooks/responsiveness-hook'
import { useRouter } from 'next/navigation'
import { CategoriesResponse } from '../components/models/AllCategories'
import { StorageKeys } from '../components/constants/StorageKeys'

type Props = {}

const Categories = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const router = useRouter()
    const [retrievedCategories, setRetrievedCategories] = useState<CategoriesResponse[]>();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const scrollLeft = () => {
        setActiveTab(prevActiveTab => {
            if (retrievedCategories?.length) {
                return (prevActiveTab === 0 ? retrievedCategories.slice(0, 6).length - 1 : prevActiveTab - 1);
            }
            return prevActiveTab; // or handle the undefined case appropriately
        });
    };


    const scrollRight = () => {
        setActiveTab(prevActiveTab => {
            if (retrievedCategories?.length) {
                return (prevActiveTab === retrievedCategories.slice(0, 6).length - 1 ? 0 : prevActiveTab + 1);
            }
            return prevActiveTab;
        });
    };

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
        <div className={styles.main}>
            <h2>Explore our amazing categories</h2>
            <p>Select from variety of good placed by thousands of african vendors in the world </p>

            <div className={styles.controllerSection}>

                {onDesktop &&
                    <div className={styles.arrow} onClick={scrollLeft}><LeftArrowIcon /></div>
                }
                <div className={styles.controller}>
                    <div className={styles.tab}>
                        {retrievedCategories?.slice(0, 6).map((tab, index) => (
                            <span
                                key={index}
                                className={index === activeTab ? styles.activeTab : ''}
                                onClick={() => handleTabClick(index)}
                            >
                                {tab.name}
                            </span>
                        ))}
                    </div>
                    <div className={styles.cards}>
                        {retrievedCategories && retrievedCategories.length > 0 && (
                            retrievedCategories[activeTab].products.length > 0 ? (
                                retrievedCategories[activeTab].products.slice(0, 3).map((product, productIndex) => (
                                    <Link href={`/categories/${retrievedCategories[activeTab].id}?${retrievedCategories[activeTab].name}`} className={styles.card} key={productIndex}>
                                        <div className={styles.images}>
                                            <Image src={product.coverImage} alt='product image' fill />
                                        </div>
                                        <span className='!whitespace-nowrap'>{product.name}</span>
                                        <h4>&pound;{product.amount.toLocaleString()}</h4>
                                    </Link>
                                ))
                            ) : (
                                <p className='text-gray-400 text-sm text-center mx-auto w-full'>No products available for this category.</p>
                            )
                        )}
                    </div>
                </div>
                {onDesktop &&
                    <div className={styles.arrow} onClick={scrollRight}><RightArrowIcon /></div>
                }
            </div>

            <Link href='/categories' className={styles.btn}>See all Categories <LongArrowIcon /></Link>
        </div>
    )
}

export default Categories