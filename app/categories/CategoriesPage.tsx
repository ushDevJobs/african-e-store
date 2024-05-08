'use client'

import React from 'react'
import styles from './Categories.module.scss'
import CategoriesHeader from '../components/CategoriesHeader'
import CategoriesSettingsBar from '../components/CategoriesSettingsBar'
import useResponsiveness from '../components/hooks/responsiveness-hook'
import Image from 'next/image'
import images from '@/public/images'
import { LeftArrowIcon, RightArrowIcon } from '../components/SVGs/SVGicons'
import PageTransition from '../components/PageTransition'


type Props = {}

const CategoriesPage = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    return (
        <div className={styles.main}>
            {/* <PageTransition previousPage={previousPage} currentPage="/my-page" direction="forward" /> */}
            <CategoriesHeader mainText='Explore different categories' subText='Search for any product in different categories on Rayvinn'/>
            <div className={styles.contents}>
                {onDesktop &&
                    <div className={styles.lhs}>
                        <CategoriesSettingsBar />
                    </div>}
                <div className={styles.rhs}>
                    <h3>Groceries</h3>

                    <div className={styles.cards}>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image fill src={images.cashew} alt='product image' />
                            </div>
                            <p>Dog food 3 pcs bag </p>
                            <h4>$250</h4>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image fill src={images.cashew} alt='product image' />
                            </div>
                            <p>Dog food 3 pcs bag </p>
                            <h4>$250</h4>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image fill src={images.cashew} alt='product image' />
                            </div>
                            <p>Dog food 3 pcs bag </p>
                            <h4>$250</h4>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image fill src={images.cashew} alt='product image' />
                            </div>
                            <p>Dog food 3 pcs bag </p>
                            <h4>$250</h4>
                        </div>
                    </div>
                    <div className={styles.pagination}>
                   <button><LeftArrowIcon/></button>
                   <div className={styles.value}>
                            <span>1</span>
                            <span>1</span>
                            <span>1</span>
                   </div>
                   <button><RightArrowIcon/></button>
                    </div>
                </div>


            </div>
         
        </div>
    )
}

export default CategoriesPage