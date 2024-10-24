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
                            <p>Lorem ipsum dolor sit amet consectetur. Tellus turpis quis nisi consequat nisl. In ultrices nisl lectus etiam arcu ipsum mauris odio tincidunt. Tellus imperdiet pulvinar turpis vitae eu pellentesque aliquet. Rhoncus tortor augue fringilla purus sagittis mi scelerisque porta habitant.</p>
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