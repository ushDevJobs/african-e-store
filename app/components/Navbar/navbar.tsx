'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.scss'
import useResponsiveness from '../hooks/responsiveness-hook';
import Image from 'next/image';
import images from '@/public/images';
import Link from 'next/link';
import { CartIcon, DownArrowIcon, DropDownIcon, DropDownIcon2, HamburgerIcon, TimesIcon, UserIcon } from '../SVGs/SVGicons';
import useOuterClick from '../hooks/useOuterClick';
import { usePathname, useRouter } from 'next/navigation';
import { useAccountStatus } from '@/app/context/AccountStatusContext';
import { useLogout } from '@/app/api/apiClients';
import { LogoutResponse } from '../models/IAccountStatus';
import { createCustomErrorMessages } from '../constants/catchError';
import { toast } from 'sonner';

type Props = {}

const Navbar = (props: Props) => {
    const router = useRouter()
    const [navIsOpen, setNavIsOpen] = useState(false);
    const logout = useLogout()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const handleToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const { accountStatus, fetchAccountStatus } = useAccountStatus();
    // console.log('accountStatus', accountStatus)

    const dropdownRef = useRef<HTMLLIElement>(null);

    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
    const [logoutResponse, setLogoutResponse] = useState<LogoutResponse>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);

    const [scrolled, setScrolled] = useState(false);

    const categoryDropdownRef = useRef<HTMLLIElement | null>(null);

    // Api call to check if user is logged in
    async function Logout() {

        // Start loader
        // setIsResendingVerificationCode(true);

        await logout()
            .then((response) => {
                // console.log("Response: ", response);
                setLogoutResponse(response.data);
                // fetchAccountStatus();
                if (response.data.status) {
                    setIsLoggedIn(false);
                    setIsSellerLoggedIn(false);
                    router.push('/')
                }
                toast.success('Logout successful');
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                // setIsResendingVerificationCode(false);
            });
    }

    useEffect(() => {
        fetchAccountStatus();
    }, []);

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

    useEffect(() => {
        if (accountStatus && accountStatus.accountType == 'BUYER') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [accountStatus]);
    useEffect(() => {
        if (accountStatus && accountStatus.accountType == 'SELLER') {
            setIsSellerLoggedIn(true);
        } else {
            setIsSellerLoggedIn(false);
        }
    }, [accountStatus]);
    return (
        <div className={`${styles.navbarContainer} ${scrolled ? styles.scrolled : ''}`}>
            {onDesktop && (
                <div className={styles.navContent}>
                    <Link href='/' className={styles.logo}>
                        <Image src={images.logo} alt='rayvvin logo' />
                    </Link>
                    {isLoggedIn ? <ul className={styles.links}>
                        <Link href='/'>
                            <li>Home</li>
                        </Link>
                        <Link href='/faq'>
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
                                    <Link href={'/stores'} onClick={() => setIsLoginDropdownOpen(false)}>
                                        Stores
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
                                    <button onClick={() => {
                                        setIsLoginDropdownOpen(false)
                                        Logout()
                                    }}>
                                        Log out
                                    </button>
                                </div>
                            )
                        }
                    </ul> :
                        <ul className={styles.links}>
                            <Link href='/'>
                                <li>Home</li>
                            </Link>
                            <Link href='/seller/signup'>
                                <li>Sell</li>
                            </Link>
                            <Link href='/faq'>
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
                            <Link href='/login'>
                                <button className={styles.login}>  Login</button>
                            </Link>
                            <Link href='/signup'>
                                <button className={styles.signup}>Sign up</button>
                            </Link>

                            {isSellerLoggedIn && <button onClick={() => {
                                setIsLoginDropdownOpen(false)
                                Logout()
                            }}>
                                Seller Log out 
                            </button>}
                        </ul>
                    }
                </div>
            )
            }
            {onMobile && (
                <div className={styles.mobileNavbarContainer}>
                    <div className={styles.navbar}>
                        <Link href="/">
                            <div className={styles.navbar__img}>
                                <Image src={images.logo} alt="Logo" />
                            </div>
                        </Link>
                        <div
                            className={styles.icon}
                            onClick={() => setNavIsOpen(!navIsOpen)}
                        >
                            {navIsOpen ? <TimesIcon /> : <HamburgerIcon />}
                        </div>
                    </div>
                    {navIsOpen && (
                        <div className={styles.navbarOverlay}>
                            <ul>
                                <Link href="/" onClick={() => setNavIsOpen(false)}>
                                    <li className={pathname == "/" ? styles.active : ""}>Home</li>
                                </Link>
                                <Link href='/seller/signup' onClick={() => setNavIsOpen(false)}>
                                    <li className={pathname == '/seller/signup' ? styles.active : ""}>
                                        Sell
                                    </li>
                                </Link>
                                <li
                                    className={`${styles.dropdown} ${isDropdownOpen ? styles.open : styles.close
                                        }`}
                                    ref={dropdownRef}
                                    onClick={handleToggle}
                                >
                                    Services{" "}
                                    {isDropdownOpen ? <DropDownIcon2 /> : <DropDownIcon />}
                                </li>

                                {isDropdownOpen && (
                                    <ul className={styles.dropdownContainer}>
                                        <Link
                                            href="/procurement"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setNavIsOpen(false);
                                            }}
                                        >
                                            <li
                                                className={` ${styles.dropdownLi} ${pathname == "/procurement" ? styles.active : ""
                                                    }`}
                                            >
                                                Procurement
                                            </li>
                                        </Link>

                                        <Link
                                            href="/recruitment"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setNavIsOpen(false);
                                            }}
                                        >
                                            <li
                                                className={` ${styles.dropdownLi} ${pathname == "/recruitment" ? styles.active : ""
                                                    }`}
                                            >
                                                Recruitment & Selection
                                            </li>
                                        </Link>

                                        <Link
                                            href="/people-development"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setNavIsOpen(false);
                                            }}
                                        >
                                            <li
                                                className={` ${styles.dropdownLi} ${pathname == "/people-development" ? styles.active : ""
                                                    }`}
                                            >
                                                People Development
                                            </li>
                                        </Link>

                                        <Link
                                            href="/compensation-benefits"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setNavIsOpen(false);
                                            }}
                                        >
                                            <li
                                                className={` ${styles.dropdownLi} ${pathname == "/compensation-benefits"
                                                    ? styles.active
                                                    : ""
                                                    }`}
                                            >
                                                Compensation Benefits <br /> & Outsourcing
                                            </li>
                                        </Link>

                                        <Link
                                            href="/engineering"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setNavIsOpen(false);
                                            }}
                                        >
                                            <li
                                                className={` ${styles.dropdownLi} ${pathname == "/engineering" ? styles.active : ""
                                                    }`}
                                            >
                                                HR Process Design & <br /> Engineering
                                            </li>
                                        </Link>

                                        <Link
                                            href="/regulatory-services"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setNavIsOpen(false);
                                            }}
                                        >
                                            <li
                                                className={` ${styles.dropdownLi} ${pathname == "/regulatory-services"
                                                    ? styles.active
                                                    : ""
                                                    }`}
                                            >
                                                Regulatory Services & <br /> Company Secretarial
                                            </li>
                                        </Link>

                                        <Link
                                            href="/e-learning"
                                            onClick={() => {
                                                setIsDropdownOpen(false);

                                                setNavIsOpen(false);
                                            }}
                                        >
                                            <li
                                                className={` ${styles.dropdownLi} ${pathname == "/e-learning" ? styles.active : ""
                                                    }`}
                                            >
                                                E-Learning
                                            </li>
                                        </Link>
                                    </ul>
                                )}

                                <Link href="/trainings" onClick={() => setNavIsOpen(false)}>
                                    <li className={pathname == "/trainings" ? styles.active : ""}>
                                        Trainings
                                    </li>
                                </Link>
                                <Link href="/careers" onClick={() => setNavIsOpen(false)}>
                                    <li className={pathname == "/careers" ? styles.active : ""}>
                                        Careers
                                    </li>
                                </Link>
                            </ul>

                            {/* <button
                                onClick={() => {
                                    router.push("/contact-us");
                                    setNavIsOpen(false);
                                }}
                            >
                                Contact Us
                            </button> */}
                        </div>
                    )}
                </div>
            )}
        </div >
    )
}

export default Navbar