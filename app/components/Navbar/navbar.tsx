'use client'
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.scss'
import useResponsiveness from '../hooks/responsiveness-hook';
import Image from 'next/image';
import images from '@/public/images';
import Link from 'next/link';
import { DownArrowIcon } from '../SVGs/SVGicons';

type Props = {}

const Navbar = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={`${styles.navbarContainer} ${scrolled ? styles.scrolled : ''}`}>
            {onDesktop && (
                <div className={styles.navContent}>
                    <Link href='/' className={styles.logo}>
                        <Image src={images.logo} alt='rayvvin logo' />
                    </Link>
                    <ul className={styles.links}>
                        <Link href='/'>
                            <li>Home</li>
                        </Link>
                        <Link href='/seller/signup'>
                            <li>Sell</li>
                        </Link>
                        <Link href='/'>
                            <li>FAQ&apos;s</li>
                        </Link>
                        <div className={styles.dropdown}>
                            <li>Categories <DownArrowIcon /></li>
                        </div>
                        <Link href='/login'>
                            <button className={styles.login}>  Login</button>
                        </Link>
                        <Link href='/signup'>
                            <button className={styles.signup}>Sign up</button>
                        </Link>
                    </ul>
                </div>
            )
            }
            {
                onMobile && (
                    <h1>Mobile</h1>
                )
            }
        </div >
    )
}

export default Navbar