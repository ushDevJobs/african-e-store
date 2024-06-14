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
    const limit = 4; // // Number of categories per page

    const iswindow = typeof window !== 'undefined' ? true : false;
    async function handleFetchAllCategories() {

        // Start loader
        setIsFetchingCategories(true);

        await fetchCategories(currentPage, limit)
            .then((response) => {
                console.log("Response: ", response.data.data);
                setCategories(response.data.data);
                // Persist all categories data in session storage
                sessionStorage.setItem(
                    StorageKeys.AllCategories,
                    JSON.stringify(response.data.data)
                );
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
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
    if(router){
            handleFetchAllCategories();
    }
    }, [router]);

    return (
        <>
            {!loaderIsVisible && (
                <>
                
                    <AccountStatusProvider>
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

                        {!['/', '/login', '/verification', '/signup', '/seller/signup', '/seller/login'].includes(pathname) &&
                            <NextBreadcrumb
                                homeElement={'Home'}
                                separator={<span>&gt;</span>}
                                activeClasses='text-[#2c7865]'
                                containerClasses='flex py-5 bg-white'
                                listClasses='hover:underline mx-2 font-bold'
                                capitalizeLinks
                            />}
                        {children}
                        {(pathname.includes('/signup') || pathname.includes('/login') || pathname.includes('/verification')) ? <RegistrationFooter /> : <Footer />}

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
