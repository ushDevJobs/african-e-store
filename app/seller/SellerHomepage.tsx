'use client';
import React, { useState } from 'react';
import styles from '../seller-store/SellerStore.module.scss';
import CategoriesSettingsBar from '../components/CategoriesSettingsBar';
import { SearchIcon } from '../components/SVGs/SVGicons';
import SellerStoreRating from '../seller-store/SellerStoreRating';
import SellerShop from '../seller-store/SellerShop';
import AboutSeller from '../seller-store/AboutSeller';
import useResponsiveness from '../components/hooks/responsiveness-hook';
import SellerProduct from './SellerProduct';
type Props = {};

enum TabIndex {
    Shop = '1',
    About = '2',
    Draft = '3',
    Feedback = '4',
}

const SellerHomePage = (props: Props) => {
    const [activeTab, setActiveTab] = useState<TabIndex>(TabIndex.Shop);
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    return (
        <div className={styles.main}>
            <SellerStoreRating />
            {onMobile &&
                activeTab === TabIndex.Shop &&
                <div
                    style={{ color: '#828282', fontSize: '16px', marginBottom: '1rem', width: 'fit-content', backgroundColor: '#ecf8f5', padding: '16px', borderRadius: '13px', height: 'fit-content' }}>
                    <p className='cursor-pointer w-fit'> Add Products to store</p>
                </div>}
            <div className={styles.tab}>
                {activeTab === TabIndex.Shop &&
                    <div
                        style={{ color: '#828282', fontSize: '16px', backgroundColor: '#ecf8f5', padding: '16px', borderRadius: '13px', height: 'fit-content' }}
                        className={styles.lhs}>
                        <p className='cursor-pointer w-fit'> Add Products to store</p>
                    </div>}
                <div className={styles.rhs}>
                    {/* {activeTab === TabIndex.Shop && <div className={styles.search}><SearchIcon /> <input type="text" placeholder='Search items in shop' /></div>} */}
                    <div className={styles.tabSection}>
                        <span
                            onClick={() => setActiveTab(TabIndex.Shop)}
                            className={activeTab === TabIndex.Shop ? styles.active : ''}
                        >
                            Shop
                        </span>
                        <span
                            onClick={() => setActiveTab(TabIndex.About)}
                            className={activeTab === TabIndex.About ? styles.active : ''}
                        >
                            About my store
                        </span>
                        <span
                            onClick={() => setActiveTab(TabIndex.Draft)}
                            className={activeTab === TabIndex.Draft ? styles.active : ''}
                        >
                            Draft
                        </span>
                        <span
                            onClick={() => setActiveTab(TabIndex.Feedback)}
                            className={activeTab === TabIndex.Feedback ? styles.active : ''}
                        >
                            Feedback
                        </span>
                    </div>
                    {activeTab === TabIndex.Shop && <SellerProduct />}
                    {activeTab === TabIndex.About && <AboutSeller />}
                    {activeTab === TabIndex.Draft && <AboutSeller />}
                    {activeTab === TabIndex.Feedback && <h1>Feedback</h1>}
                </div>
            </div>
        </div>
    );
};

export default SellerHomePage;
