'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles/HomePage/CategoriesSection.module.scss'
import { LeftArrowIcon, LongArrowIcon, RightArrowIcon } from '../components/SVGs/SVGicons'
import Link from 'next/link'
import Image from 'next/image'
import useResponsiveness from '../components/hooks/responsiveness-hook'
import { useCategories } from '../context/CategoryContext'

type Props = {}

const Categories = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const { categories, handleFetchAllCategories } = useCategories();

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const scrollLeft = () => {
        setActiveTab(prevActiveTab => {
            if (categories?.length) {
                return (prevActiveTab === 0 ? categories.slice(0, 6).length - 1 : prevActiveTab - 1);
            }
            return prevActiveTab; // or handle the undefined case appropriately
        });
    };


    const scrollRight = () => {
        setActiveTab(prevActiveTab => {
            if (categories?.length) {
                return (prevActiveTab === categories.slice(0, 6).length - 1 ? 0 : prevActiveTab + 1);
            }
            return prevActiveTab;
        });
    };

    useEffect(() => {
        handleFetchAllCategories();
    }, []);


    useEffect(() => {
        // Set up an interval to change categories every 3 seconds
        const intervalId = setInterval(() => {
            setActiveTab(prevActiveTab => {
                if (categories && categories.length) {
                    return (prevActiveTab === categories.slice(0, 6).length - 1 ? 0 : prevActiveTab + 1);
                }
                return prevActiveTab;
            });
        }, 2000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [categories]);

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
                        {categories?.slice(0, 6).map((tab, index) => (
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
                        {categories && categories.length > 0 && (
                            categories[activeTab].products.length > 0 ? (
                                categories[activeTab].products.slice(0, 3).map((product, productIndex) => (
                                    <Link href={`/products/${product.id}?${product.name}`} className={styles.card} key={productIndex}>
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