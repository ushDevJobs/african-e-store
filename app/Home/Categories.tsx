'use client'

import React, { useState } from 'react'
import styles from '../styles/HomePage/CategoriesSection.module.scss'
import { LeftArrowIcon, LongArroowIcon, RightArrowIcon } from '../components/SVGs/SVGicons'
import Link from 'next/link'

type Props = {}

const Categories = (props: Props) => {
    const tabs = [
        {
            text: 'Fashion',
            content: 'Fashion'
        },
        {
            text: 'Electronics',
            content: 'Electronics'
        },
        {
            text: 'Mobile phones',
            content: 'Mobile phones'
        },
        {
            text: 'House hold items',
            content: 'House hold items'
        },
        {
            text: 'Food items',
            content: 'Food items'
        },
        {
            text: 'Clothings',
            content: 'Clothings'
        },
        {
            text: 'Television',
            content: 'Television'
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
                    <div className={styles.contents}>
                        <h1>{tabs[activeTab].content}</h1>
                    </div>

                </div>
                <div className={styles.arrow} onClick={scrollRight}><RightArrowIcon /></div>
            </div>

            <Link href='/' className={styles.btn}>See all Categories <LongArroowIcon /></Link>
        </div>
    )
}

export default Categories