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
import { CategoriesResponse } from '../models/AllCategories';
import { StorageKeys } from '../constants/StorageKeys';
import { RootState } from '@/app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import MobileNavBar from './MobileNavBar';

type Props = {}

const Navbar = (props: Props) => {
    const router = useRouter()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const [navIsOpen, setNavIsOpen] = useState(false);
    const logout = useLogout()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const { accountStatus, fetchAccountStatus } = useAccountStatus();
    const [retrievedCategories, setRetrievedCategories] = useState<CategoriesResponse[]>();
    // console.log({ retrievedCategories })
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
                    router.push('/')
                    setIsLoggedIn(false);
                    setIsSellerLoggedIn(false);
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

    useEffect(() => {
        if (router) {
            // Get the retrieved categories placed
            const _retrievedCategories = sessionStorage.getItem(
                StorageKeys.AllCategories
            );

            // If we have a retrieved categoriess...
            if (_retrievedCategories) {
                // Update the state
                setRetrievedCategories(JSON.parse(_retrievedCategories) as CategoriesResponse[]);
            }
        }

        // Run this effect only when the router is ready, which means: when the page is loaded
    }, [router]);
    return (
        <div className={`${styles.navbarContainer} ${scrolled ? styles.scrolled : ''}`}>
            {onDesktop && (
                <div className={styles.navContent}>
                    <Link href='/' className={styles.logo}>
                        <Image src={images.logo} alt='rayvvin logo' />
                    </Link>
                    <ul className={styles.links}>
                        {
                            !isSellerLoggedIn &&
                            <Link href='/'>
                                <li>Home</li>
                            </Link>
                        }

                        {!isLoggedIn && !isSellerLoggedIn &&
                            <Link href='/seller/signup'>
                                <li>Sell</li>
                            </Link>}
                        {!isSellerLoggedIn &&
                            <Link href='/faq'>
                                <li>FAQ&apos;s</li>
                            </Link>
                        }
                        {!isSellerLoggedIn && (
                            <div className={styles.dropdown}>
                                <li ref={categoryDropdownRef}
                                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}>Categories <DownArrowIcon /></li>
                                {isCategoryDropdownOpen && (
                                    <ul className={styles.dropdownContainer}>
                                        <div className={styles.lhs}>
                                            {retrievedCategories?.slice(0, 6).map((category) => (
                                                <div className={styles.category} key={category.id}>
                                                    <Link
                                                        href={`/categories/${category.id}?${category.name}`}
                                                        onClick={() => setIsCategoryDropdownOpen(false)}
                                                    >
                                                        <h3>{category.name}</h3>
                                                    </Link>
                                                </div>
                                            ))}

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
                        )}
                        {!isLoggedIn && !isSellerLoggedIn && (
                            <>
                                <Link href='/login'>
                                    <button className={styles.login}>  Login</button>
                                </Link>
                                <Link href='/signup'>
                                    <button className={styles.signup}>Sign up</button>
                                </Link>
                            </>
                        )}

                        {isLoggedIn && <Link href={'/cart'}>
                            <div className={styles.cart}>
                                <div className={styles.cartIcon}>
                                    <p><CartIcon /></p>
                                    <span> {cartItems.length > 0 && <>{cartItems.length}</>}</span>
                                </div>
                                <h4>My cart</h4>
                            </div></Link>}

                        {isLoggedIn && (
                            <>
                                <div className={styles.dropDownInfo} onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}>
                                    <span ><UserIcon /> <DownArrowIcon /></span>
                                </div>
                                {
                                    isLoginDropdownOpen && (
                                        <div className={`${styles.loginDropdownContainer} shadow-lg`}>
                                            <Link href={'/orders'} onClick={() => setIsLoginDropdownOpen(false)}>
                                                My orders
                                            </Link>
                                            <Link href={'/help'} onClick={() => setIsLoginDropdownOpen(false)}>
                                                Help/support
                                            </Link>
                                            <Link href={'/stores'} onClick={() => setIsLoginDropdownOpen(false)}>
                                                Stores
                                            </Link>
                                            <Link href={'/saved-store'} onClick={() => setIsLoginDropdownOpen(false)}>
                                                Saved Store
                                            </Link>
                                            <Link href={'/saved-items'}>
                                                Saved Items
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
                            </>
                        )}

                        {isSellerLoggedIn && <button className={styles.signup} onClick={() => {
                            setIsLoginDropdownOpen(false)
                            Logout()
                        }}>
                            Log out
                        </button>}
                    </ul>
                </div>
            )
            }
            {onMobile && (
                <MobileNavBar navIsOpen={navIsOpen} setNavIsOpen={setNavIsOpen} isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                    retrievedCategories={retrievedCategories}
                    isLoggedIn={isLoggedIn}
                    isSellerLoggedIn={isSellerLoggedIn}
                    cartItems={cartItems}
                    Logout={Logout}
                />
            )}
        </div >
    )
}

export default Navbar