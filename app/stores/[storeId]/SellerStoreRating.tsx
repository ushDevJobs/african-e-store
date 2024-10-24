import React from 'react'
import styles from './SellerStore.module.scss'
import { DotIcon, GreenStarIcon, UserIcon } from '../../components/SVGs/SVGicons'
import useResponsiveness from '../../components/hooks/responsiveness-hook'
import { ASingleStoreResponse } from '@/app/components/models/IStores'
import { StoreStoreRatingSkeletonLoader } from '../StoresSkeleton'
import Image from 'next/image'

type Props = {
    store?: ASingleStoreResponse | undefined;
    isFetchingStore?: boolean
}

const SellerStoreRating = ({ store, isFetchingStore }: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;

    // const totalCount = store?.ratingWithPercent.reduce((sum, item) => sum + item.percentage, 0);
    // const weightedSum = store?.ratingWithPercent.reduce((sum, item) => sum + (item.rating * item.percentage), 0);

    // Find the maximum count among all ratings
    // const maxCount = Math.max(...(store?.ratingWithPercent.map(item => item.percentage) || [0]));

    return (
        <>
            {!store && isFetchingStore ? <StoreStoreRatingSkeletonLoader /> :
                <div className={styles.storeInfo}>
                    <div className={styles.storelhs}>
                        {store?.storeDetails?.image ?
                            <div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px]">
                                <Image
                                    src={store.storeDetails.image}
                                    alt="Logo"
                                    fill
                                    className="object-cover rounded-full"
                                />
                            </div> :
                            <span className="bg-[#2C7865] h-fit p-3 rounded-full">
                                <UserIcon />
                            </span>
                        }
                        <div className={styles.info}>
                            <h3 className='text-lg md:text-xl lg:text-2xl text-[#828282] mb-1 font-semibold underline'>{store?.storeDetails.name}</h3>
                            
                            {store?.storeDetails.description &&
                                <p className="text-sm text-[#333333] mb-1">
                                    {store?.storeDetails.description.length > 50
                                        ? `${store.storeDetails.description.slice(0, 50)}...`
                                        : store.storeDetails.description}
                                </p>}
                            <div className='flex gap-2 text-[#1E1E1E] text-sm'>
                                <span className='flex text-sm md:text-base items-center gap-1'><DotIcon />{store?.feedback}&#37; Feedback</span>
                                <span className='flex text-sm md:text-base items-center gap-1'><DotIcon />{store?.totalItemSold} {store?.totalItemSold === 1 ? 'Item Sold' : 'Items Sold'}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ratings}>
                        <div className={styles.rating}>
                            <div className={styles.average}>
                                <h4 className='flex items-center gap-2'>{store?.avgRating.rating ? store?.avgRating.rating.toFixed(0) : 0}/5 {onMobile && <span className='text-[#828282] font-normal'>Rating</span>}</h4>
                                {onDesktop && <p className='text-[#828282]'>Rating</p>}
                            </div>

                            <div className={styles.ratingProgress}>
                                <div className={styles.ratingProgress}>
                                    {store?.ratingWithPercent.map((item, index) => {
                                        return (
                                            <div className={styles.value} key={index}>
                                                <p>
                                                    {item.rating}{" "}
                                                    <span>
                                                        <GreenStarIcon />
                                                    </span>
                                                </p>
                                                <div className={styles.progress}>
                                                    <div
                                                        className={styles.bar}
                                                        style={{ width: `${item.percentage}%` }}
                                                    ></div>
                                                </div>
                                                <p className={styles.rangeValue}>
                                                    {item.total!.toLocaleString()}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default SellerStoreRating