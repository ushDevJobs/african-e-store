'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import useResponsiveness from '../hooks/responsiveness-hook';
import Image from 'next/image';
import images from '@/public/images';
import Link from 'next/link';
import { CartIcon, DownArrowIcon, UserIcon } from '../SVGs/SVGicons';
import useOuterClick from '../hooks/useOuterClick';

type Props = {}

const Navbar = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

    const isAuthenticated = true

    const [scrolled, setScrolled] = useState(false);

    const categoryDropdownRef = useRef<HTMLLIElement | null>(null);


    // useOuterClick(categoryDropdownRef, setIsCategoryDropdownOpen);

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
                    {!isAuthenticated ? <ul className={styles.links}>
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
                    </ul> : <ul className={styles.links}>
                        <Link href='/'>
                            <li>Home</li>
                        </Link>
                        <Link href='/'>
                            <li>FAQ&apos;s</li>
                        </Link>
                        <div className={styles.dropdown}>
                            <li ref={categoryDropdownRef}
                                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}>Categories <DownArrowIcon /></li>
                            {isCategoryDropdownOpen && (
                                <ul className={styles.dropdownContainer}>
                                    <div className={styles.lhs}>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <div className={styles.category}>
                                            <h3>Food</h3>
                                            <Link
                                                href='/categories'
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                            >

                                                <li>Spices</li>
                                            </Link>
                                        </div>
                                        <Link
                                            className='whitespace-nowrap text-[#2C7865] text-sm'
                                            href='/categories'
                                            onClick={() => setIsCategoryDropdownOpen(false)}
                                        >
                                            See all
                                            {/* See all categories */}
                                        </Link>
                                    </div>
                                    <div className={styles.rhs}>
                                        <Image src={images.category_dropdown_image} alt='category iamge' />
                                    </div>
                                </ul>
                            )}

                        </div>
                        <Link href={'/cart'}>
                            <div className={styles.cart}>
                                <div className={styles.cartIcon}>
                                    <p><CartIcon /></p>
                                    <span>0</span>
                                </div>
                                <h4>My cart</h4>
                            </div></Link>

                        <div className={styles.dropDownInfo} onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}>
                            <span ><UserIcon /> <DownArrowIcon /></span>
                        </div>
                        {
                            isLoginDropdownOpen && (
                                <div className={styles.loginDropdownContainer}>
                                    <Link href={'/orders'} onClick={() => setIsLoginDropdownOpen(false)}>
                                        My orders
                                    </Link>
                                    <Link href={'/help'} onClick={() => setIsLoginDropdownOpen(false)}>
                                        Help/support
                                    </Link>
                                    <Link href={'/'} onClick={() => setIsLoginDropdownOpen(false)}>
                                        Track order
                                    </Link>
                                    <Link href={'/'} onClick={() => setIsLoginDropdownOpen(false)}>
                                        Purchase history
                                    </Link>
                                    <Link href={'/'}>
                                        Track order
                                    </Link>
                                    <Link href={'/'}>
                                        Track order
                                    </Link>
                                </div>
                            )
                        }

                    </ul>}
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