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
                    {/* {pathname.includes('/signup') || pathname.includes('/login') || pathname.includes('/verification') && <RegistrationNav />}
                    {!pathname.includes('/signup') && !pathname.includes('/login') && !pathname.includes('/verification') && <Navbar />}
                    {children}
                    {!pathname.includes('/signup') && !pathname.includes('/login') && !pathname.includes('/verification') && <Footer />}
                    {pathname.includes('/signup') || pathname.includes('/login') || pathname.includes('/verification') && <RegistrationFooter />} */}
                    {(pathname.includes('/signup') || pathname.includes('/login') || pathname.includes('/verification')) ? <RegistrationNav /> : <Navbar />}
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
