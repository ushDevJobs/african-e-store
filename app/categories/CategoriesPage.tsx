'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Categories.module.scss'
import CategoriesSettingsBar from '../components/CategoriesSettingsBar'
import useResponsiveness from '../components/hooks/responsiveness-hook'
import Image from 'next/image'
import images from '@/public/images'
import { FilterIcon, LeftArrowIcon, RightArrowIcon, SortIcon } from '../components/SVGs/SVGicons'
import { useFetchCategories } from '../api/apiClients'
import { useRouter, useSearchParams } from 'next/navigation'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import { CategoriesResponse } from '../components/models/AllCategories'
import ComponentLoader from '../components/Loader/ComponentLoader'
import CategoriesSkeletonLoader from './CategoriesSketon'
import { StorageKeys } from '../components/constants/StorageKeys'
import { CategoriesHeader } from '../components/CategoriesHeader'

const CategoriesPage = () => {
    const fetchCategories = useFetchCategories()
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    const searchParams = useSearchParams()
    const router = useRouter()

    const [categories, setCategories] = useState<CategoriesResponse[]>([]);
    const [isFetchingCategories, setIsFetchingCategories] = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState<string>('');

    const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
    const limit = 6; // // Number of categories per page
    const totalPages = Math.ceil(categories.length / limit);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            router.push(`/categories?page=${page}`);
        }
    };
    async function handleFetchAllCategories() {

        // Start loader
        setIsFetchingCategories(true);

        await fetchCategories(currentPage, limit)
            .then((response) => {
                console.log("Response: ", response.data.data);
                setCategories(response.data.data);
                // Persist all categories data in session storage
                // sessionStorage.setItem(
                //     StorageKeys.AllCategories,
                //     JSON.stringify(response.data.data)
                // );
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
        const totalPages = Math.ceil(categories.length / limit);
        if (currentPage > totalPages && totalPages > 0) {
            goToPage(totalPages); // Redirect to the last page if current page exceeds total pages
        }
    }, [categories, currentPage]);

    useEffect(() => {
        handleFetchAllCategories();
    }, [currentPage]);

    useEffect(() => {
        const pageParam = parseInt((searchParams.get('page') as string) || '1', 10);
        setCurrentPage(pageParam);
    }, [searchParams]);

    // Useeffect to set active category on scroll
    useEffect(() => {
        const handleScroll = () => {
            categories.forEach((category) => {
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
    }, [categories]);

    return (
        <>
            {categories.length == 0 && isFetchingCategories ? <CategoriesSkeletonLoader /> :
                <div className={styles.main}>
                    <CategoriesHeader mainText='Explore different categories' subText='Search for any product in different categories on Rayvinn' />
                    {onMobile &&
                        <div className="w-full flex items-center gap-4 justify-end mb-2 ml-auto">
                            <span className='flex items-center gap-2 cursor-pointer'><SortIcon /> Sort</span>
                            <span className='flex items-center gap-2 cursor-pointer'><FilterIcon /> Filter </span>
                        </div>
                    }
                    <div className={styles.contents}>
                        {onDesktop &&
                            <div className={styles.lhs} style={{ position: 'relative' }}>
                                <CategoriesSettingsBar categories={categories} activeCategory={activeCategory} />
                            </div>}

                        <div className={styles.rhs}>
                            <div className='flex flex-col gap-10'>
                                {categories.map((category, index) => (
                                    <div className='flex flex-col'
                                        key={category.id}
                                    >
                                        <h3>{category.name}</h3>
                                        <div className={styles.cards}>
                                            {category.products.map((product, index) => (
                                                <div className={styles.card} key={product.id} id={category.id.toString()}>
                                                    <div className={styles.image}>
                                                        <Image fill src={images.cashew} alt='product image' />
                                                    </div>
                                                    <p>{product.name} </p>
                                                    <h4>&#8358;{product.amount.toLocaleString()}</h4>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                            </div>
                            {categories.length > 0 && categories && (
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
        </>
    )
}

export default CategoriesPage