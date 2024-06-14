'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Categories.module.scss'
import CategoriesHeader from '../components/CategoriesHeader'
import CategoriesSettingsBar from '../components/CategoriesSettingsBar'
import useResponsiveness from '../components/hooks/responsiveness-hook'
import Image from 'next/image'
import images from '@/public/images'
import { FilterIcon, LeftArrowIcon, RightArrowIcon, SortIcon } from '../components/SVGs/SVGicons'
import PageTransition from '../components/PageTransition'
import Link from 'next/link'
import { useFetchCategories } from '../api/apiClients'
import { useRouter, useSearchParams } from 'next/navigation'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import { CategoriesResponse } from '../components/models/AllCategories'

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
    const [totalPages, setTotalPages] = useState<number>(0);
    const [activeCategory, setActiveCategory] = useState<string>('');

    const page = parseInt((searchParams.get('page') as string) || '0', 10);
    const limit = 3; // Number of categories per page

    async function handleFetchAllCategories() {

        // Start loader
        setIsFetchingCategories(true);

        await fetchCategories(page, limit)
            .then((response) => {
                console.log("Response: ", response.data.data);
                setCategories(response.data.data);
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
        handleFetchAllCategories();
    }, [page]);


    const goToPage = (page: number) => {
        router.push(`/categories?page=${page}`);
    };

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
                    <div className={styles.pagination}>
                        <button><LeftArrowIcon /></button>
                        <div className={styles.value}>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                        </div>
                        <button><RightArrowIcon /></button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CategoriesPage