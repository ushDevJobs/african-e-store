'use client'
import React, { useState } from 'react'
import styles from './FaqPage.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { ContactIcon, DownArrowIcon, PlusIcon, ReportIcon, ReturnIcon, RightArrowIcon } from '../components/SVGs/SVGicons'
import NextBreadcrumb from '../components/Breadcrumbs'
type Props = {}

const FaqPage = (props: Props) => {
    const [visibleItemIndex, setVisibleItemIndex] = useState<number | null>(null);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);

    const faqData = [
        {
            id: 1,
            name: 'Buying',
            items: [
                {
                    item: 'How to buy',
                    desc: 'Buyingggg'
                },
                {
                    item: 'How bidding works',
                    desc: 'Bidding'
                },
                {
                    item: 'How to price',
                    desc: 'pricing'
                }
            ]
        },
        {
            id: 1,
            name: 'Selling',
            items: [
                {
                    item: 'How to sell',
                    desc: 'Selling'
                },
                {
                    item: 'How bidding works',
                    desc: 'Bidding'
                },
                {
                    item: 'How to price',
                    desc: 'pricing'
                }
            ]
        },
        {
            id: 1,
            name: 'Account',
            items: [
                {
                    item: 'How to buy',
                    desc: 'Buyingggg'
                },
                {
                    item: 'How bidding works',
                    desc: 'Bidding'
                },
                {
                    item: 'How to price',
                    desc: 'pricing'
                }
            ]
        },
        {
            id: 1,
            name: 'Shipping and tracking',
            items: [
                {
                    item: 'How to buy',
                    desc: 'Buyingggg'
                },
                {
                    item: 'How bidding works',
                    desc: 'Bidding'
                },
                {
                    item: 'How to price',
                    desc: 'pricing'
                }
            ]
        },
        {
            id: 1,
            name: 'Return and refunds',
            items: [
                {
                    item: 'How to buy',
                    desc: 'Buyingggg'
                },
                {
                    item: 'How bidding works',
                    desc: 'Bidding'
                },
                {
                    item: 'How to price',
                    desc: 'pricing'
                }
            ]
        },
        {
            id: 1,
            name: 'Fees and billing',
            items: [
                {
                    item: 'How to buy',
                    desc: 'Buyingggg'
                },
                {
                    item: 'How bidding works',
                    desc: 'Bidding'
                },
                {
                    item: 'How to price',
                    desc: 'pricing'
                }
            ]
        },

    ]

    const toggleAccordion = (index: number) => {
        setSelectedCategoryIndex(index);
        setVisibleItemIndex(null);
    };

    const selectItem = (index: number) => {
        setVisibleItemIndex(index);
    };

    const currentCategory = faqData[selectedCategoryIndex as number];
    const currentItem = currentCategory ? (visibleItemIndex !== null ? currentCategory.items[visibleItemIndex] : null) : null;
    return (
        <div className={styles.main}>

            <div className={styles.heroSection}>
                <div className={styles.backgroundImage}>
                    <Image src={images.home_hero_bg} alt='hero background image' />
                    <div className={styles.contents}>
                        <h1>Help center </h1>
                        <div className={styles.cards}>
                            <div className={styles.contact}>
                                <ContactIcon />
                                <h3>Contact us</h3>
                                <p>Get the help you need from an automated assistant or contact an agent </p>
                                <button>Contact us</button>
                            </div>
                            <div className={styles.returnContainer}>
                                <div className={styles.return}>
                                    <ReturnIcon />
                                    <h3>Start a return</h3>
                                </div>
                                <div className={styles.return}>
                                    <ReportIcon />
                                    <h3>Report an item that hasn&apos;t arrived </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.faqContents}>
                <div className={styles.lhs}>
                    {faqData.map((data, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.header}>
                                <h3>{data.name}</h3>
                                <span onClick={() => toggleAccordion(index)}><DownArrowIcon /></span>
                            </div>

                            {selectedCategoryIndex === index && <div className={styles.item}>
                                {data.items.map((data, index) => (
                                    <p onClick={() => selectItem(index)} className={styles.item} key={index}>{data.item}</p>))}
                            </div>}
                        </div>
                    ))}

                </div>

                <div className={styles.rhs}>
                    <h1>{currentItem && currentItem.desc}</h1>
                </div>
            </div>
        </div>
    )
}

export default FaqPage