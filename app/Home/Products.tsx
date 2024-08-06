'use client'
import React from 'react'
import styles from '../styles/HomePage/Products.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import Link from 'next/link'
import useResponsiveness from '../components/hooks/responsiveness-hook'

type Props = {}

const Products = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    return (
        <>
            {onDesktop &&
                <div className={styles.productSection}>
                    <div className={styles.backgroundImage}>
                        <Image src={images.product} alt='image' />
                        <div className={styles.contents}>
                            <h1>keep track of your products </h1>
                            <p>Effortlessly manage your inventory and keep track of your products. Our platform provides tools to help you monitor stock levels, track sales, and ensure you never run out of your best-selling items. Stay organized and focus on growing your business.</p>
                            <Link href={'/seller/signup'}>   <button>
                                Open a store
                            </button></Link>
                        </div>
                    </div>
                </div>
            }</>
    )
}

export default Products