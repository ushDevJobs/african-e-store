'use client';
import React, { useEffect, useState } from 'react';
import styles from '../stores/[storeId]/SellerStore.module.scss';
import useResponsiveness from '../components/hooks/responsiveness-hook';
import SellerProduct from './SellerProduct';
import AddProductModal from './AddProductModal';
import AboutSeller from './AboutSeller';
import SellerPageStoreRating from './SellerStoreRating';
import { useFetchSellerProducts, useFetchSellerStore } from '../api/apiClients';
import { SellerProductsResponse, SellerStoreResponse } from '../components/models/ISellerStore';
import { toast } from 'sonner';
import { createCustomErrorMessages } from '../components/constants/catchError';
type Props = {};

enum TabIndex {
    Shop = '1',
    About = '2',
    Draft = '3',
    Feedback = '4',
}

const SellerHomePage = (props: Props) => {
    const fetchSellerStore = useFetchSellerStore()
    const fetchSellerProducts = useFetchSellerProducts()
    const [activeTab, setActiveTab] = useState<TabIndex>(TabIndex.Shop);
    const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const [store, setStore] = useState<SellerStoreResponse>()
    const [products, setProducts] = useState<SellerProductsResponse[]>()
    const [isFetchingStore, setIsFetchingStore] = useState<boolean>(true);
    const [isFetchingProducts, setIsFetchingProducts] = useState<boolean>(true);

    async function handleFetchStore() {

        // Start loader
        setIsFetchingStore(true);

        await fetchSellerStore()
            .then((response) => {
                console.log("Response: ", response.data.data);
                setStore(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingStore(false);
            });
    }
    async function handleFetchProducts() {

        // Start loader
        setIsFetchingProducts(true);

        await fetchSellerProducts()
            .then((response) => {
                console.log("Response: ", response.data.data);
                setProducts(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingProducts(false);
            });
    }

    useEffect(() => {
        handleFetchStore();
        handleFetchProducts()
    }, []);
    return (
        <div className={styles.main}>
            <SellerPageStoreRating store={store} isFetchingStore={isFetchingStore} />
            <AddProductModal
                visibility={isAddProductModalVisible}
                setVisibility={setIsAddProductModalVisible}
                handleFetchProducts={handleFetchProducts}
            />
            {onMobile &&
                activeTab === TabIndex.Shop &&
                <div
                    onClick={() => setIsAddProductModalVisible(true)}
                    style={{ color: '#828282', fontSize: '16px', marginBottom: '1rem', width: 'fit-content', backgroundColor: '#ecf8f5', padding: '16px', borderRadius: '13px', height: 'fit-content' }}>
                    <p className='cursor-pointer w-fit'> Add Products to store</p>
                </div>}
            <div className={styles.tab}>
                {activeTab === TabIndex.Shop &&
                    <div
                        style={{ color: '#828282', fontSize: '16px', backgroundColor: '#ecf8f5', padding: '16px', borderRadius: '13px', height: 'fit-content' }}
                        className={styles.lhs}
                        onClick={() => setIsAddProductModalVisible(true)}
                    >
                        <p className='cursor-pointer w-fit whitespace-nowrap'> Add Products to store</p>
                    </div>}
                <div className={styles.rhs}>
                    {/* {activeTab === TabIndex.Shop && <div className={styles.search}><SearchIcon /> <input type="text" placeholder='Search items in shop' /></div>} */}
                    <div className={styles.tabSection}>
                        <span
                            onClick={() => setActiveTab(TabIndex.Shop)}
                            className={activeTab === TabIndex.Shop ? styles.active : ''}
                        >
                            My products
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
                            Customer Feedbacks
                        </span>
                    </div>
                    {activeTab === TabIndex.Shop && <SellerProduct products={products}
                        isFetchingProducts={isFetchingProducts} setIsAddProductModalVisible={setIsAddProductModalVisible} />}
                    {activeTab === TabIndex.About && <AboutSeller />}
                    {activeTab === TabIndex.Draft && <AboutSeller />}
                    {activeTab === TabIndex.Feedback && <h1>Feedback</h1>}
                </div>
            </div>
        </div>
    );
};

export default SellerHomePage;
