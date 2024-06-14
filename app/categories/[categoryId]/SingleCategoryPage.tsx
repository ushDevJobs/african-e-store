'use client'
import React, { useEffect, useState } from 'react'
import styles from '../Categories.module.scss'
import { useRouter } from 'next/navigation'
import { CategoriesResponse, CategoryResponse } from '@/app/components/models/AllCategories'
import { StorageKeys } from '@/app/components/constants/StorageKeys'
import CategoriesHeader from '@/app/components/CategoriesHeader'
import useResponsiveness from '@/app/components/hooks/responsiveness-hook'
import { FilterIcon, SortIcon } from '@/app/components/SVGs/SVGicons'
import { useFetchSingleCategory } from '@/app/api/apiClients'
import { createCustomErrorMessages } from '@/app/components/constants/catchError'
import { toast } from 'sonner'
import CategoriesSettingsBar from '@/app/components/CategoriesSettingsBar'
import Image from 'next/image'
import images from '@/public/images'
type Props = {
    params: { categoryId: string; }
}

const SingleCategoryPage = ({ params }: Props) => {
    const windowRes = useResponsiveness();
    const fetchCategory = useFetchSingleCategory()
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    const router = useRouter()
    const categoryId = params.categoryId;

    const [category, setCategory] = useState<CategoryResponse>();
    const [isFetchingCategory, setIsFetchingCategory] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
    const limit = 4; // // Number of categories per page

    async function handleFetchCategory() {

        // Start loader
        setIsFetchingCategory(true);

        await fetchCategory(categoryId)
            .then((response) => {
                console.log("Response: ", response.data.data);
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


    useEffect(() => {
        handleFetchCategory();
    }, []);

    return (
        <>
            {/* {categories.length == 0 && isFetchingCategories ? <CategoriesSkeletonLoader /> : */}
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
                              <CategoriesSettingsBar/>
                          </div>}

                    <div className={styles.rhs}>
                        <div className='flex flex-col gap-10'>
                            <div className='flex flex-col'>
                                <h3>Category Name</h3>
                                <div className={styles.cards}>
                                    {category?.products.map((product, index) => (
                                        <div className={styles.card} key={product.id} >
                                            <div className={styles.image}>
                                                <Image fill src={images.cashew} alt='product image' />
                                            </div>
                                            <p>{product.name} </p>
                                            <h4>&#8358;{product.amount.toLocaleString()}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* {categories.length > 0 && categories && (
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
                          )} */}
                    </div>


                </div>
            </div>
            {/* } */}
        </>
    )
}

export default SingleCategoryPage