import React from 'react'
import styles from '../stores/[storeId]/SellerStore.module.scss'
import { DotIcon, GreenStarIcon, UserIcon } from '../components/SVGs/SVGicons'
import useResponsiveness from '../components/hooks/responsiveness-hook'

type Props = {}

const SellerStoreRating = (props: Props) => {
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
        <div className={styles.storeInfo}>
            <div className={styles.storelhs}>
                <span className='bg-[#2C7865] h-fit p-3 rounded-full'><UserIcon /></span>
                <div className={styles.info}>
                    <h3 className='text-lg md:text-xl lg:text-2xl text-[#828282] mb-1 font-semibold underline'>Chavo global mobile device store LTD.</h3>
                    <div className='flex gap-2 text-[#1E1E1E] text-sm'>
                        <span className='flex text-sm md:text-base items-center gap-1'><DotIcon />90% Feedback</span>
                        <span className='flex text-sm md:text-base items-center gap-1'><DotIcon />30 items sold</span>
                    </div>
                </div>
            </div>
            <div className={styles.ratings}>
                <div className={styles.rating}>
                    <div className={styles.average}>
                        <h4 className='flex items-center gap-2'>{averageRating}/5 {onMobile && <span className='text-[#828282] font-normal'>Rating</span>}</h4>
                        {onDesktop && <p className='text-[#828282]'>Rating</p>}
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
                </div>
            </div>
        </div>


    )
}

export default SellerStoreRating