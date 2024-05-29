'use client'
import React from 'react'
import styles from '../styles/HomePage/HeroSection.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { SearchIcon } from '../components/SVGs/SVGicons'
import Link from 'next/link'
import useResponsiveness from '../components/hooks/responsiveness-hook'

type Props = {}

const HeroSection = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    return (
            <div className={styles.heroSection}>
                <div className={styles.backgroundImage}>
                    <Image src={images.hero_bg} alt='hero background image' />
                    <div className={styles.contents}>
                        <h1>An African Goods market place </h1>
                        <p>Buy and sell to Africans all over the globe with Rayvinn, create a buyer or seller account on our platform to get started.</p>
                        <div className={styles.search}>
                            <SearchIcon />
                            <input type="text" placeholder='Search for your items ' />
                        </div>
                        <div className={styles.categories}>
                            <h3>Suggested categories</h3>
                            <div className={styles.links}>
                                <Link href='/'>House hold items </Link>
                                <Link href='/'>House hold items </Link>
                                <Link href='/'>House hold items </Link>
                                <Link href='/'>House hold items </Link>
                                <Link href='/'>House hold items </Link>
                                <Link href='/'>House hold items </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default HeroSection