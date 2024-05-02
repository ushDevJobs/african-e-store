import React from 'react'
import styles from './Footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import images from '@/public/images'
import { FacebookIcon, LinkedInIcon, TelegramIcon, TwitterIcon } from '../SVGs/SVGicons'
type Props = {}

const Footer = (props: Props) => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.links}>
                <ul>
                    <h3>Buy</h3>
                    <Link href={'/'}>
                        <li>Stores</li>
                    </Link>
                    <Link href={'/'}>
                        <li>Registration</li>
                    </Link>
                    <Link href={'/'}>
                        <li>Money back guarantee </li>
                    </Link>
                </ul>
                <ul>
                    <h3>Sell</h3>
                    <Link href={'/'}>
                        <li>Your store </li>
                    </Link>
                    <Link href={'/'}>
                        <li>Start selling </li>
                    </Link>
                </ul>
                <ul>
                    <h3>Our media</h3>
                    <Link href={'/'}>
                        <li>Twitter </li>
                    </Link>
                    <Link href={'/'}>
                        <li>Facebook </li>
                    </Link>
                    <Link href={'/'}>
                        <li>Instagram </li>
                    </Link>
                </ul>
                <ul>
                    <h3>About us </h3>
                    <Link href={'/'}>
                        <li>News</li>
                    </Link>
                    <Link href={'/'}>
                        <li>Careers</li>
                    </Link>
                    <Link href={'/'}>
                        <li>Policies </li>
                    </Link>
                    <Link href={'/'}>
                        <li>Company Info</li>
                    </Link>
                </ul>
                <ul>
                    <h3>Help and contact </h3>
                    <Link href={'/'}>
                        <li>contact us </li>
                    </Link>
                    <Link href={'/'}>
                        <li>Help center</li>
                    </Link>
                    <Link href={'/'}>
                        <li>FAQ&apos;s </li>
                    </Link>
                </ul>
            </div>
            <div className={styles.logoArea}>
                <div className={styles.lhs}>
                    <Link href={'/'}>     
                     <Image src={images.white_logo} alt='logo' /></Link>
                    <h2>Your catch phrase here </h2>
                </div>
                <div className={styles.rhs}>
                    <Link href={'/'}><FacebookIcon /></Link>
                    <Link href={'/'}><TwitterIcon /></Link>
                    <Link href={'/'}><LinkedInIcon /></Link>
                    <Link href={'/'}><TelegramIcon /></Link>
                </div>
            </div>
            <div className={styles.copyright}>  Copyright @ Rayvinn 2024 </div>
        </div>
    )
}

export default Footer