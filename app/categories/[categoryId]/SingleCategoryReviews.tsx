'use client'
import React, { useState } from 'react'
import styles from './SingleCategory.module.scss'
import { FavoriteIcon, GreenStarIcon, RatingIcon, UserIcon } from '@/app/components/SVGs/SVGicons'
import useResponsiveness from '@/app/components/hooks/responsiveness-hook'
import Link from 'next/link'

type Props = {}

const SingleCategoryReviews = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    const data = [
        {
            star: 5,
            count: 98000
        },
        {
            star: 4,
            count: 80000
        },
        {
            star: 3,
            count: 60000
        },
        {
            star: 2,
            count: 40000
        },
        {
            star: 1,
            count: 20000
        },
    ]

    // Calculate total count and weighted sum for average
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
    const weightedSum = data.reduce((sum, item) => sum + (item.star * item.count), 0);

    // Calculate average rating
    const averageRating = totalCount === 0 ? 0 : (weightedSum / totalCount).toFixed(1);

    // Find the maximum count among all ratings
    const maxCount = Math.max(...data.map(item => item.count));

    return (
        <div className={styles.reviews}>
            <h2>Ratings and reviews</h2>
            <div className={styles.reviewContents}>
                <div className={styles.lhs}>
                    <div className={styles.top}>

                        {onMobile && <div className={styles.top_lhs}>
                            <span><UserIcon /></span>
                            <div className={styles.product}>
                                <Link href={'/stores'} className='text-[#828282] text-sm underline cursor-pointer'>Chavo global mobile device store LTD.</Link>
                                <p className='text-[#828282] text-xs'>98% positive feedback</p>
                            </div>
                        </div>}
                        {onDesktop && <div className={styles.top_lhs}>
                            <span><UserIcon /></span>
                            <div className={styles.product}>
                                <h3 className='text-[#828282] text-lg'>Chavo global mobile device store LTD.</h3>
                                <p className='text-[#828282] text-base'>98% positive feedback <span className='cursor-pointer text-sm text-[#2C7865] font-bold'>Contact seller </span></p>
                            </div>
                        </div>}
                        {onDesktop && <div className={styles.top_rhs}>
                            <span><FavoriteIcon /></span>
                            <button>Visit store</button>
                        </div>}
                    </div>
                    <div className={styles.ratings}>
                        <h3 className='text-[#6F6F6F] text-base font-semibold mb-5'>Product Rating </h3>
                        {onDesktop && <div className={styles.rating}>
                            <div className={styles.average}>
                                <h4>{averageRating}/5</h4>
                            </div>

                            <div className={styles.ratingProgress}>
                                {data.map((item, index) => {
                                    return (
                                        <div className={styles.value} key={index}>
                                            <p>{item.star} <span><GreenStarIcon /></span></p>
                                            <div className={styles.progress}>
                                                <div className={styles.bar} style={{ width: `${(item.count / maxCount) * 100}%` }}></div>
                                            </div>
                                            <p className={styles.rangeValue}>
                                                {item.count.toLocaleString()}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>}

                        {onMobile &&
                            <div className={styles.rating}>
                                <h3 className='text-[#2C7865] text-lg font-medium -mt-4'>{averageRating}/5</h3>
                                <div className={`${styles.ratingProgress} -mt-4`}>
                                    {data.map((item, index) => {
                                        return (
                                            <div className={styles.value} key={index}>
                                                <p>{item.star} <span><GreenStarIcon /></span></p>
                                                <div className={styles.progress}>
                                                    <div className={styles.bar} style={{ width: `${(item.count / maxCount) * 100}%` }}></div>
                                                </div>
                                                <p className={styles.rangeValue}>
                                                    {item.count.toLocaleString()}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>}
                    </div>

                    <div className={styles.reviewContainer}>
                        <div className={styles.review}>
                            <span className='flex items-center'>
                                {[1, 2, 3, 4].map((_, index) => (
                                    <span key={index} className={index != 5 ? 'mr-1' : ''}>
                                        <RatingIcon colored={true} />
                                    </span>
                                ))}
                                {[1].map((_, index) => (
                                    <span key={index}>
                                        <RatingIcon />
                                    </span>
                                ))}
                            </span>
                            <p className='text-base text-[#4B4B4B]'>Good Phone, nice screen resolution, fast charging. All I ever wanted.</p>
                            <p className='text-xs text-[#828282]'>25-09-2023 by Dave</p>
                        </div>
                        <div className={styles.review}>
                            <span className='flex items-center'>
                                {[1, 2, 3, 4].map((_, index) => (
                                    <span key={index} className={index != 5 ? 'mr-1' : ''}>
                                        <RatingIcon colored={true} />
                                    </span>
                                ))}
                                {[1].map((_, index) => (
                                    <span key={index}>
                                        <RatingIcon />
                                    </span>
                                ))}
                            </span>
                            <p className='text-base text-[#4B4B4B]'>Good Phone, nice screen resolution, fast charging. All I ever wanted.</p>
                            <p className='text-sm text-[#828282]'>25-09-2023 by Dave</p>
                        </div>
                        <div className={styles.review}>
                            <span className='flex items-center'>
                                {[1, 2, 3, 4].map((_, index) => (
                                    <span key={index} className={index != 5 ? 'mr-1' : ''}>
                                        <RatingIcon colored={true} />
                                    </span>
                                ))}
                                {[1].map((_, index) => (
                                    <span key={index}>
                                        <RatingIcon />
                                    </span>
                                ))}
                            </span>
                            <p className='text-base text-[#4B4B4B]'>Good Phone, nice screen resolution, fast charging. All I ever wanted.</p>
                            <p className='text-sm text-[#828282]'>25-09-2023 by Dave</p>
                        </div>
                        <div className={styles.review}>
                            <span className='flex items-center'>
                                {[1, 2, 3, 4].map((_, index) => (
                                    <span key={index} className={index != 5 ? 'mr-1' : ''}>
                                        <RatingIcon colored={true} />
                                    </span>
                                ))}
                                {[1].map((_, index) => (
                                    <span key={index}>
                                        <RatingIcon />
                                    </span>
                                ))}
                            </span>
                            <p className='text-base text-[#4B4B4B]'>Good Phone, nice screen resolution, fast charging. All I ever wanted.</p>
                            <p className='text-sm text-[#828282]'>25-09-2023 by Dave</p>
                        </div>
                        <div className={styles.review}>
                            <span className='flex items-center'>
                                {[1, 2, 3, 4].map((_, index) => (
                                    <span key={index} className={index != 5 ? 'mr-1' : ''}>
                                        <RatingIcon colored={true} />
                                    </span>
                                ))}
                                {[1].map((_, index) => (
                                    <span key={index}>
                                        <RatingIcon />
                                    </span>
                                ))}
                            </span>
                            <p className='text-base text-[#4B4B4B]'>Good Phone, nice screen resolution, fast charging. All I ever wanted.</p>
                            <p className='text-sm text-[#828282]'>25-09-2023 by Dave</p>
                        </div>
                    </div>
                </div>
                <div className={styles.rhs}></div>
            </div>
        </div>
    )
}

export default SingleCategoryReviews