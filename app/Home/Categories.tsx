'use client'

import React, { useState } from 'react'
import styles from '../styles/HomePage/CategoriesSection.module.scss'
import { LeftArrowIcon, LongArrowIcon, RightArrowIcon } from '../components/SVGs/SVGicons'
import Link from 'next/link'
import images from '@/public/images'
import Image from 'next/image'

type Props = {}

const Categories = (props: Props) => {
    const tabs = [
        {
            text: 'Fashion',
            content: 'Cashew bag, 120kg with additional add ons and an extra bowl',
            price: '$250',
            image: images.cashew
        },
        {
            text: 'Electronics',
            content: 'Electronics',
            price: '$250',
            image: images.cashew
        },
        {
            text: 'Mobile phones',
            content: 'Mobile phones',
            price: '$250',
            image: images.cashew
        },
        {
            text: 'House hold items',
            content: 'House hold items',
            price: '$250',
            image: images.cashew
        },
        {
            text: 'Food items',
            content: 'Food items',
            price: '$250',
            image: images.cashew
        },
        {
            text: 'Clothings',
            content: 'Clothings',
            price: '$250',
            image: images.cashew
        },
        {
            text: 'Television',
            content: 'Television',
            price: '$250',
            image: images.cashew
        },
    ]

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const scrollLeft = () => {
        setActiveTab(prevActiveTab => (prevActiveTab === 0 ? tabs.length - 1 : prevActiveTab - 1));
    };

    const scrollRight = () => {
        setActiveTab(prevActiveTab => (prevActiveTab === tabs.length - 1 ? 0 : prevActiveTab + 1));
    };

    return (
        <div className={styles.main}>
            <h2>Explore our amazing categories</h2>
            <p>Select from variety of good placed by thousands of african vendors in the world </p>

            <div className={styles.controllerSection}>

                <div className={styles.arrow} onClick={scrollLeft}><LeftArrowIcon /></div>
                <div className={styles.controller}>
                    <div className={styles.tab}>
                        {tabs.map((tab, index) => (
                            <span
                                key={index}
                                className={index === activeTab ? styles.activeTab : ''}
                                onClick={() => handleTabClick(index)}
                            >
                                {tab.text}
                            </span>
                        ))}
                    </div>
                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <div className={styles.images}>
                                <Image src={tabs[activeTab].image} alt='product iamge' fill />
                            </div>
                            <span>{tabs[activeTab].content}</span>
                            <h4>{tabs[activeTab].price}</h4>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.images}>
                                <Image src={tabs[activeTab].image} alt='product iamge' fill />
                            </div>
                            <span>{tabs[activeTab].content}</span>
                            <h4>{tabs[activeTab].price}</h4>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.images}>
                                <Image src={tabs[activeTab].image} alt='product iamge' fill />
                            </div>
                            <span>{tabs[activeTab].content}</span>
                            <h4>{tabs[activeTab].price}</h4>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.images}>
                                <Image src={tabs[activeTab].image} alt='product iamge' fill />
                            </div>
                            <span>{tabs[activeTab].content}</span>
                            <h4>{tabs[activeTab].price}</h4>
                        </div>
                    </div>

                </div>
                <div className={styles.arrow} onClick={scrollRight}><RightArrowIcon /></div>
            </div>

            <Link href='/categories' className={styles.btn}>See all Categories <LongArrowIcon /></Link>
        </div>
    )
}

export default Categories