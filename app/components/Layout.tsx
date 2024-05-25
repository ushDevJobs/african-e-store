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
import { usePathname } from 'next/navigation';
import RegistrationNav from './RegistrationNav';
import RegistrationFooter from './RegistrationFooter';
import NextBreadcrumb from './Breadcrumbs';

interface LayoutProps {
    children?: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }): ReactElement => {
    const [loaderIsVisible, setLoaderIsVisible] = useState(true);
    const pathname = usePathname()

    const iswindow = typeof window !== 'undefined' ? true : false;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoaderIsVisible(false);
        }
    }, [iswindow]);

    return (
        <>
            {!loaderIsVisible && (
                <>
                    {(pathname.includes('/signup') || pathname.includes('/login') || pathname.includes('/verification')) ? <RegistrationNav /> : <Navbar />}

                    {!['/', '/login', '/verification', '/signup', '/seller/signup','/seller/login'].includes(pathname) &&
                        <NextBreadcrumb
                            homeElement={'Home'}
                            separator={<span> | </span>}
                            activeClasses='text-amber-500'
                            containerClasses='flex py-5 bg-white'
                            listClasses='hover:underline mx-2 font-bold'
                            capitalizeLinks
                        />}
                    {children}
                    {(pathname.includes('/signup') || pathname.includes('/login') || pathname.includes('/verification')) ? <RegistrationFooter /> : <Footer />}

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
