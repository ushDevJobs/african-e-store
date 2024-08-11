'use client';

import Image from 'next/image';
import {
    FunctionComponent,
    ReactElement,
    ReactNode,
    useEffect,
    useState,
} from 'react';
import Navbar from './Navbar/navbar';
import Footer from './Footer/footer';
import images from '@/public/images';
import { usePathname, useRouter } from 'next/navigation';
import RegistrationNav from './RegistrationNav';
import RegistrationFooter from './RegistrationFooter';
import NextBreadcrumb from './Breadcrumbs';
import { Toaster, toast } from 'sonner';
import { AccountStatusProvider } from '../context/AccountStatusContext';
import { useFetchCategories } from '../api/apiClients';
import { CategoriesResponse } from './models/AllCategories';
import { StorageKeys } from './constants/StorageKeys';
import { createCustomErrorMessages } from './constants/catchError';
import { store } from '../redux/store';
import { Provider } from "react-redux";
import { initializeIcons, loadTheme } from '@fluentui/react';
import { UserAddressProvider } from '../context/UserAddressContext';

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }): ReactElement => {
    const [loaderIsVisible, setLoaderIsVisible] = useState(true);
    const pathname = usePathname()
    const router = useRouter()
    const fetchCategories = useFetchCategories()
    const [categories, setCategories] = useState<CategoriesResponse[]>([]);
    const [isFetchingCategories, setIsFetchingCategories] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
    const limit = 6; // // Number of categories per page

    const iswindow = typeof window !== 'undefined' ? true : false;

    // Load fluent UI icons
    loadTheme({
        palette: {
            themePrimary: "#f26528",
            themeLighterAlt: "#fef9f6",
            themeLighter: "#fde5db",
            themeLight: "#fbcfbd",
            themeTertiary: "#f7a17c",
            themeSecondary: "#f47742",
            themeDarkAlt: "#da5b25",
            themeDark: "#b84d1f",
            themeDarker: "#883917",
            neutralLighterAlt: "#faf9f8",
            neutralLighter: "#f3f2f1",
            neutralLight: "#edebe9",
            neutralQuaternaryAlt: "#e1dfdd",
            neutralQuaternary: "#d0d0d0",
            neutralTertiaryAlt: "#c8c6c4",
            neutralTertiary: "#a19f9d",
            neutralSecondary: "#605e5c",
            neutralSecondaryAlt: "#8a8886",
            neutralPrimaryAlt: "#3b3a39",
            neutralPrimary: "#323130",
            neutralDark: "#201f1e",
            black: "#000000",
            white: "#ffffff",
        },
        defaultFontStyle: { fontFamily: "Josefin Sans" },
    });

    // Initialize icons
    initializeIcons();

    async function handleFetchAllCategories() {

        // Start loader
        setIsFetchingCategories(true);

        await fetchCategories(currentPage, limit)
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setCategories(response.data.data);
                // Persist all categories data in session storage
                sessionStorage.setItem(
                    StorageKeys.AllCategories,
                    JSON.stringify(response.data.data)
                );
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                // toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingCategories(false);
            });
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoaderIsVisible(false);
        }
    }, [iswindow]);

    useEffect(() => {
        if (router) {
            handleFetchAllCategories();
        }
    }, [router]);

    return (
        <>
            {!loaderIsVisible && (
                <>
                    <AccountStatusProvider>
                        <UserAddressProvider>
                            <Provider store={store}>
                                <Toaster
                                    position='bottom-center'
                                    richColors
                                    closeButton
                                    toastOptions={{
                                        duration: 3000,
                                        unstyled: false,
                                    }}
                                />
                                {(pathname.includes('/signup') || pathname.includes('/login') || pathname.includes('/verification')) ? <RegistrationNav /> : <Navbar />}

                                {/* {!['/', '/login', '/verification', '/signup', '/seller/signup', '/seller/login'].includes(pathname) &&
                                    <NextBreadcrumb
                                        homeElement={'Home'}
                                        separator={<span>&gt;</span>}
                                        activeClasses='text-[#2c7865]'
                                        containerClasses='flex py-5 bg-white'
                                        listClasses='hover:underline mx-1 md:mx-2 font-bold'
                                        capitalizeLinks
                                    />} */}
                                {children}
                                {(pathname.includes('/signup') || pathname.includes('/login') || pathname.includes('/verification')) ? <RegistrationFooter /> : <Footer />}
                            </Provider>
                        </UserAddressProvider>
                    </AccountStatusProvider>
                </>
            )}

            {loaderIsVisible && (
                <div className='splashScreen'>
                    <div className='image'>
                        <Image src={images.logo} alt='logo' />
                    </div>
                </div>
            )}
        </>
    );
};

export default Layout;
