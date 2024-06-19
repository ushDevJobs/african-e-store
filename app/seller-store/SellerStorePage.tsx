'use client';
import React, { useState } from 'react';
import styles from './SellerStore.module.scss';
import SellerStoreRating from '../seller/SellerStoreRating';
import SellerShop from './SellerShop';
import CategoriesSettingsBar from '../components/CategoriesSettingsBar';
import { FilterIcon, SearchIcon, SortIcon } from '../components/SVGs/SVGicons';
import AboutSeller from '../seller/AboutSeller';
import useResponsiveness from '../components/hooks/responsiveness-hook';

type Props = {};

enum TabIndex {
    Shop = '1',
    About = '2',
    Feedback = '3',
}

const SellerStorePage = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const [activeTab, setActiveTab] = useState<TabIndex>(TabIndex.Shop);

    return (
        <div className={styles.main}>
            {onDesktop && <SellerStoreRating />}
            <div className={styles.tab}>
                {activeTab === TabIndex.Shop && <div className={styles.lhs}><CategoriesSettingsBar /></div>}
                <div className={styles.rhs}>
                    {activeTab === TabIndex.Shop && <div className={styles.search}><SearchIcon /> <input type="text" placeholder='Search items in shop' /></div>}
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
                            About
                        </span>
                        <span
                            onClick={() => setActiveTab(TabIndex.Feedback)}
                            className={activeTab === TabIndex.Feedback ? styles.active : ''}
                        >
                            Feedback
                        </span>
                    </div>
                    {onMobile && <SellerStoreRating />}
                    {onMobile &&
                        <div className="w-full flex items-center gap-4 justify-end mb-2 ml-auto">
                            <span className='flex items-center gap-2 cursor-pointer'><SortIcon /> Sort</span>
                            <span className='flex items-center gap-2 cursor-pointer'><FilterIcon /> Filter </span>
                        </div>
                    }
                    {activeTab === TabIndex.Shop && <SellerShop />}
                    {activeTab === TabIndex.About && <AboutSeller />}
                    {activeTab === TabIndex.Feedback && <h1>Feedback</h1>}
                </div>
            </div>
        </div>
    );
};

export default SellerStorePage;
