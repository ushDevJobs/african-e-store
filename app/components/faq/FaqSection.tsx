"use client"
import React, { useState } from 'react'
import styles from './Faq.module.scss'
import { PlusIcon } from '../SVGs/SVGicons'
import Link from 'next/link'

type Props = {}

const FaqSection = (props: Props) => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };
    return (
        <div className={styles.main}>
            <h2>Frequently asked questions </h2>
            <div className={styles.faqSections}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h3>Buying</h3>
                        <span onClick={() => toggleSection('buying')}><PlusIcon /></span>
                    </div>

                    {openSection == 'buying' &&
                        <div className={styles.item}>
                            <Link href={'/faq'}>How to buy</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                        </div>
                    }
                </div>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h3>Selling</h3>
                        <span onClick={() => toggleSection('selling')}><PlusIcon /></span>
                    </div>

                    {openSection == 'selling' &&
                        <div className={styles.item}>
                            <Link href={'/faq'}>How to buy</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                        </div>

                    }
                </div>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h3>Account</h3>
                        <span onClick={() => toggleSection('account')}><PlusIcon /></span>
                    </div>

                    {openSection == 'account' &&
                        <div className={styles.item}>
                            <Link href={'/faq'}>How to buy</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                        </div>
                    }
                </div>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h3>Return and refunds</h3>
                        <span onClick={() => toggleSection('return_and_funds')}><PlusIcon /></span>
                    </div>

                    {openSection == 'return_and_funds' &&
                        <div className={styles.item}>
                            <Link href={'/faq'}>How to buy</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                        </div>
                    }
                </div>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h3>Shipping and tracking</h3>
                        <span onClick={() => toggleSection('shipping_and_tracking')}><PlusIcon /></span>
                    </div>

                    {openSection == 'shipping_and_tracking' &&
                        <div className={styles.item}>
                            <Link href={'/faq'}>How to buy</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                        </div>
                    }
                </div>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h3>Fees and billing</h3>
                        <span onClick={() => toggleSection('fees_and_billing')}><PlusIcon /></span>
                    </div>

                    {openSection == 'fees_and_billing' &&
                        <div className={styles.item}>
                            <Link href={'/faq'}>How to buy</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                            <Link href={'/faq'}>How bidding works</Link>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default FaqSection