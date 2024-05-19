'use client';
import React, { useState } from 'react';
import styles from './SellerStore.module.scss';
import SellerStoreRating from './SellerStoreRating';
import SellerShop from './SellerShop';
import CategoriesSettingsBar from '../components/CategoriesSettingsBar';
import { SearchIcon } from '../components/SVGs/SVGicons';
import AboutSeller from './AboutSeller';

type Props = {};

enum TabIndex {
    Shop = '1',
    About = '2',
    Feedback = '3',
}

const SellerStorePage = (props: Props) => {
    const [activeTab, setActiveTab] = useState<TabIndex>(TabIndex.Shop);

    return (
        <div className={styles.main}>
            <SellerStoreRating />
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
                    {activeTab === TabIndex.Shop && <SellerShop />}
                    {activeTab === TabIndex.About && <AboutSeller />}
                    {activeTab === TabIndex.Feedback && <h1>Feedback</h1>}
                </div>
            </div>



        </div>
    );
};

export default SellerStorePage;
