"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./SellerStore.module.scss";
import SellerStoreRating from "./SellerStoreRating";
import SellerShop from "./SellerShop";
import {
    FilterIcon,
    SearchIcon,
    SortIcon,
} from "../../components/SVGs/SVGicons";
import AboutSeller from "./AboutSeller";
import useResponsiveness from "../../components/hooks/responsiveness-hook";
import {
    ASingleStoreResponse,
    StoreCategories,
    StoreCategoriesResponse,
    StoreProducts,
} from "@/app/components/models/IStores";
import {
    useFetchAStore,
    useStoreCategories,
    useStoreProducts,
} from "@/app/api/apiClients";
import { createCustomErrorMessages } from "@/app/components/constants/catchError";
import { toast } from "sonner";
import StoreCategoriesSettingsBar from "@/app/components/StoreCategoriesSettingsBar";
import {
    StoreInputSkeletonLoader,
    StoreTabsSkeletonLoader,
} from "../StoresSkeleton";
import FeedBack from "./FeedBack";
import { motion } from "framer-motion";
import MobileStoreSettingsBar from "@/app/components/Modal/MobileStoreSettingsBar";

type Props = {
    params: {
        storeId: string;
    };
};

enum TabIndex {
    Shop = "1",
    About = "2",
    Feedback = "3",
}

const SellerStorePage = ({ params }: Props) => {
    const fetchStore = useFetchAStore();
    const fetchStoreCategories = useStoreCategories();
    const fetchStoreProducts = useStoreProducts();
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == "boolean" && isMobile;
    const onDesktop = typeof isMobile == "boolean" && !isMobile;
    const storeId = params.storeId;
    // console.log(storeId)
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<TabIndex>(TabIndex.Shop);
    const [store, setStore] = useState<ASingleStoreResponse>();
    const [isFetchingStore, setIsFetchingStore] = useState<boolean>(true);
    const [isFetchingProducts, setIsFetchingProducts] = useState<boolean>(true);
    const [storeCategories, setStoreCategories] =
        useState<StoreCategoriesResponse[]>();
    const [storeProducts, setStoreProducts] = useState<StoreCategories[]>();
    const [isFetchingStoreCategories, setIsFetchingStoreCategories] =
        useState<boolean>(true);

    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const [activeCategory, setActiveCategory] = useState<string>("");

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

    const handleConditionChange = (condition: string) => {
        setSelectedConditions(prevConditions =>
            prevConditions.includes(condition)
                ? prevConditions.filter(productCondition => productCondition !== condition)
                : [...prevConditions, condition]
        );
    };

    async function handleFetchStore() {
        // Start loader
        setIsFetchingStore(true);

        await fetchStore(storeId)
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setStore(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data);
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingStore(false);
            });
    }

    async function handleFetchStoreCategories() {
        // Start loader
        setIsFetchingStoreCategories(true);

        await fetchStoreCategories(storeId)
            .then((response) => {
                // console.log("Cat Response: ", response.data.data);
                setStoreCategories(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data);
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingStoreCategories(false);
            });
    }
    async function handleFetchStoreProducts() {
        // Start loader
        setIsFetchingProducts(true);

        await fetchStoreProducts(storeId)
            .then((response) => {
                // console.log("product Response: ", response.data.data);
                setStoreProducts(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data);
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingProducts(false);
            });
    }

    const handleCategoryClick = (categoryId: string) => {
        const element = categoryRefs.current[categoryId];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Adjust the offset value as needed
                behavior: 'smooth'
            });
        }
    };

    const mobileHandleCategoryClick = (categoryId: string) => {
        const element = categoryRefs.current[categoryId];
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 900, // Adjust the offset value as needed
                behavior: 'smooth'
            });
        }
    };

    const filteredCategories = storeProducts?.map(store => ({
        ...store,
        products: store.products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedConditions.length === 0 || selectedConditions.includes(product.itemCondition))
        )
    }))
        .filter(store => store.products.length > 0); // Only include categories with matching products

    useEffect(() => {
        handleFetchStore();
    }, []);

    useEffect(() => {
        handleFetchStoreCategories();
        handleFetchStoreProducts();
    }, []);

    // Useeffect to set active category on scroll
    useEffect(() => {
        const handleScroll = () => {
            storeCategories && storeCategories.forEach((category) => {
                const element = document.getElementById(category.id.toString());
                if (element && element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0) {
                    setActiveCategory(category.name);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [storeCategories]);

    return (
        <motion.div
            initial="closed"
            animate={isFilterOpen ? "opened" : "closed"}>
            {isFilterOpen && <MobileStoreSettingsBar setIsFilterOpen={setIsFilterOpen} storeCategories={storeCategories} activeCategory={activeCategory} onCategoryClick={mobileHandleCategoryClick} selectedConditions={selectedConditions}
                handleConditionChange={handleConditionChange} />}

            <div className={styles.main}>
                {onDesktop && (
                    <SellerStoreRating store={store} isFetchingStore={isFetchingStore} />
                )}
                <div className={styles.tab}>
                    {activeTab === TabIndex.Shop && (
                        <div className={styles.lhs}>
                            <StoreCategoriesSettingsBar
                                storeCategories={storeCategories}
                                isFetchingStoreCategories={isFetchingStoreCategories}
                                activeCategory={activeCategory}
                                onCategoryClick={handleCategoryClick}
                                selectedConditions={selectedConditions}
                                handleConditionChange={handleConditionChange}
                            />
                        </div>
                    )}
                    <div className={styles.rhs}>
                        {!storeCategories && isFetchingStoreCategories ? (
                            <StoreInputSkeletonLoader />
                        ) : (
                            activeTab === TabIndex.Shop && (
                                <div className={styles.search}>
                                    <SearchIcon />
                                    <input
                                        type="text"
                                        placeholder="Search items in shop"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            )
                        )}
                        {!storeCategories && isFetchingStoreCategories ? (
                            <StoreTabsSkeletonLoader />
                        ) : (
                            <div className={styles.tabSection}>
                                <span
                                    onClick={() => setActiveTab(TabIndex.Shop)}
                                    className={activeTab === TabIndex.Shop ? styles.active : ""}
                                >
                                    Shop
                                </span>
                                <span
                                    onClick={() => setActiveTab(TabIndex.About)}
                                    className={activeTab === TabIndex.About ? styles.active : ""}
                                >
                                    About
                                </span>
                                <span
                                    onClick={() => setActiveTab(TabIndex.Feedback)}
                                    className={activeTab === TabIndex.Feedback ? styles.active : ""}
                                >
                                    Feedback
                                </span>
                            </div>
                        )}
                        {onMobile && (
                            <SellerStoreRating
                                store={store}
                                isFetchingStore={isFetchingStore}
                            />
                        )}
                        {onMobile && (
                            <div className="w-full flex items-center gap-4 justify-end mb-2 ml-auto">
                                {/* <span className="flex items-center gap-2 cursor-pointer">
                                <SortIcon /> Sort
                            </span> */}
                                <span onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 cursor-pointer">
                                    <FilterIcon /> Filter{" "}
                                </span>
                            </div>
                        )}
                        {activeTab === TabIndex.Shop && (
                            <SellerShop
                                filteredCategories={filteredCategories}
                                storeProducts={storeProducts}
                                isFetchingProducts={isFetchingProducts}
                                handleFetchStoreCategories={handleFetchStoreCategories}
                                categoryRefs={categoryRefs}
                            />
                        )}
                        {activeTab === TabIndex.About && <AboutSeller store={store} isFetchingStore={isFetchingStore} />}
                        {activeTab === TabIndex.Feedback && <FeedBack storeId={storeId} />}
                    </div>
                </div>
            </div>
        </motion.div>

    );
};

export default SellerStorePage;
