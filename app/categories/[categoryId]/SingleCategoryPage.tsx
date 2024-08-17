'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../Categories.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import { CategoriesResponse, CategoryResponse } from '@/app/components/models/AllCategories'
import useResponsiveness from '@/app/components/hooks/responsiveness-hook'
import { FilterIcon, LeftArrowIcon, RightArrowIcon, SortIcon } from '@/app/components/SVGs/SVGicons'
import { useFetchCategories, useFetchSingleCategory } from '@/app/api/apiClients'
import { createCustomErrorMessages } from '@/app/components/constants/catchError'
import { toast } from 'sonner'
import CategoriesSettingsBar from '@/app/components/CategoriesSettingsBar'
import Image from 'next/image'
import images from '@/public/images'
import CategoriesSkeletonLoader from '../CategoriesSketon'
import { CategoriesHeader, SingleCategoriesHeader } from '@/app/components/CategoriesHeader'
import { StorageKeys } from '@/app/components/constants/StorageKeys'
import Link from 'next/link'
import { motion } from "framer-motion";
import MobileSettingsBar from '../MobileSettingsBar'
type Props = {
    params: { categoryId: string; }
}

const SingleCategoryPage = ({ params }: Props) => {
    const windowRes = useResponsiveness();
    const fetchCategory = useFetchSingleCategory()
    const fetchCategories = useFetchCategories()
    const searchParams = useSearchParams()
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    const router = useRouter()
    const categoryId = params.categoryId;

    const [category, setCategory] = useState<CategoryResponse>();
    const [isFetchingCategory, setIsFetchingCategory] = useState<boolean>(true);

    const [retrievedCategories, setRetrievedCategories] = useState<CategoriesResponse[]>([]);
    const [isFetchingCategories, setIsFetchingCategories] = useState<boolean>(true);
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const [searchQuery, setSearchQuery] = useState<string>('');

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    const [totalCategories, setTotalCategories] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(() => parseInt(searchParams.get("page") ?? "1")); // Track current page
    const limit = 6; // Number of categories per page
    const totalPages = totalCategories;
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

    const handleConditionChange = (condition: string) => {
        console.log({ condition });
        setSelectedConditions(prevConditions =>
            prevConditions.includes(condition)
                ? prevConditions.filter(productCondition => productCondition !== condition)
                : [...prevConditions, condition]
        );
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            router.push(`/categories/${categoryId}?page=${page}`);
        }
    };

    async function handleFetchCategory() {

        // Start loader
        setIsFetchingCategory(true);

        await fetchCategory(categoryId)
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setCategory(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingCategory(false);
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

    // Filter products by name
    const filteredProducts = category?.products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedConditions.length === 0 || selectedConditions.includes(product.itemCondition as string))
    );

    async function handleFetchAllCategories() {

        // Start loader
        setIsFetchingCategories(true);

        await fetchCategories(currentPage, limit)
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setRetrievedCategories(response.data.data);
                setTotalCategories(response.data.totalPages)
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
        const totalPages = totalCategories
        if (currentPage > totalPages && totalPages > 0) {
            goToPage(totalPages); // Redirect to the last page if current page exceeds total pages
        }
    }, [retrievedCategories, currentPage]);

    useEffect(() => {
        handleFetchAllCategories();
    }, [currentPage]);

    useEffect(() => {
        handleFetchCategory();
    }, []);

    useEffect(() => {
        const pageParam = parseInt((searchParams.get('page') as string) || '1', 10);
        setCurrentPage(pageParam);
    }, [searchParams]);

    return (
        <motion.div
            initial="closed"
            animate={isFilterOpen ? "opened" : "closed"}
        >
            {isFilterOpen && <MobileSettingsBar setIsFilterOpen={setIsFilterOpen} retrievedCategories={retrievedCategories} onCategoryClick={mobileHandleCategoryClick}
                selectedConditions={selectedConditions} handleConditionChange={handleConditionChange} />}

            {!category && isFetchingCategory ? <CategoriesSkeletonLoader /> :
                <div className={styles.main}>
                    <SingleCategoriesHeader mainText={category?.name} subText='Search for any product in different categories on Rayvvin' />
                    {onMobile &&
                        <div className="w-full flex items-center gap-4 justify-end mb-2 ml-auto">
                            {/* <span className='flex items-center gap-2 cursor-pointer'><SortIcon /> Sort</span> */}
                            <span onClick={() => setIsFilterOpen(true)} className='flex items-center gap-2 cursor-pointer'><FilterIcon /> Filter </span>
                        </div>
                    }
                    <div className="mb-7 ml-auto flex items-end justify-end">
                        <input type="text" placeholder='Search for products'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='p-4 rounded-full border-gray-400 border outline-none text-base text-black w-full md:w-[400px] lg:w-[500px]'
                        />
                    </div>

                    <div className={styles.contents}>
                        {onDesktop &&
                            <div className={styles.lhs} style={{ position: 'relative' }}>
                                <CategoriesSettingsBar retrievedCategories={retrievedCategories} onCategoryClick={handleCategoryClick} selectedConditions={selectedConditions}
                                    handleConditionChange={handleConditionChange} />
                            </div>}

                        <div className={styles.rhs}>
                            <div className='flex flex-col gap-10'>
                                <div className='flex flex-col'>
                                    <h3>{category?.name}</h3>
                                    <div className={styles.cards}>
                                        {filteredProducts?.length === 0 ? (
                                            <p className="h-[40vh] text-center flex flex-col items-center justify-center w-screen md:w-[50vw] text-gray-400">No result found</p>
                                        ) : (
                                            filteredProducts?.map((product, index) => (
                                                <Link href={`/products/${product.id}`} className={styles.card} key={product.id} >
                                                    <div className={styles.image}>
                                                        <Image fill src={product.coverImage} alt='product image' />
                                                    </div>
                                                    <p>{product.name} </p>
                                                    <p className='text-xs my-1'>{product.details} </p>
                                                    <h4>&pound;{product.amount.toLocaleString()}</h4>
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                            {retrievedCategories && retrievedCategories?.length > 0 && (
                                <div className={styles.pagination}>
                                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={currentPage === 1 ? { cursor: 'not-allowed', opacity: '0.5' } : { cursor: 'pointer' }}><LeftArrowIcon /></button>
                                    <div className={styles.value}>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <span key={index + 1} onClick={() => goToPage(index + 1)}
                                                style={currentPage === index + 1 ? { backgroundColor: '#2c7865', color: '#fff' } : {}}
                                            >{index + 1}</span>
                                        ))}
                                    </div>
                                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages} style={currentPage >= totalPages ? { cursor: 'not-allowed', opacity: '0.5' } : { cursor: 'pointer' }}><RightArrowIcon /></button>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            }
        </motion.div>
    )
}

export default SingleCategoryPage