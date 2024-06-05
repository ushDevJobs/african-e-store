'use client'
import React from 'react'
import styles from '../styles/CategoriesHeader.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import useResponsiveness from './hooks/responsiveness-hook'

type Props = {
    mainText:string;
    subText:string;
}

const CategoriesHeader = ({mainText, subText}: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    return (
        <div className={styles.main}>
            <div className={styles.image}>
                <div className={styles.imageContainer}>
                    {onDesktop && <Image src={images.header_image} alt='image' />}
                    {onMobile && <Image src={images.category_mobile_header} alt='image' />}
                    <div className={styles.textContent}>
                        <h1>{mainText}</h1>
                        <p>{subText}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoriesHeader