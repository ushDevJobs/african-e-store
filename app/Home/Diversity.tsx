'use client'
import React from 'react'
import styles from '../styles/HomePage/Diversity.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import useResponsiveness from '../components/hooks/responsiveness-hook'
type Props = {}

const Diversity = (props: Props) => {
    const windowRes = useResponsiveness();
    const isMobile = windowRes.width && windowRes.width < 768;
    const onMobile = typeof isMobile == 'boolean' && isMobile;
    const onDesktop = typeof isMobile == 'boolean' && !isMobile;
    return (
      <>
            {onDesktop && <div className={styles.main}>
                <h2>Explore African cultures all around Africa </h2>
                <p>Experience diversity from different African cultures in the world </p>
                <div className={styles.imageGrid}>
                    <div className={styles.image1} >
                        <Image src={images.explore_1} alt="Image 1" />
                        <div className={styles.content}>
                            <h2>Check out new uploads</h2>
                            <span>All vendors are being fully screened and made set for publications </span>
                            <button>See more</button>
                        </div>
                    </div>
                    <div className={styles.image2}>
                        <Image src={images.explore_2} alt="Image 2" />
                        <div className={styles.content}>
                            <h2>Check out new uploads</h2>
                            <span>All vendors are being fully screened and made set for publications </span>
                            <button>See more</button>
                        </div>
                    </div>
                    <div className={styles.image3}>
                        <Image src={images.explore_5} alt="Image 3" />
                        <div className={styles.content}>
                            <h3>Revolutionizing the African market </h3>
                        </div>
                    </div>
                    <div className={styles.image4}>
                        <Image src={images.explore_4} alt="Image 4" />
                        <div className={styles.content}>
                            <h2>Check out new uploads</h2>
                            <span>All vendors are being fully screened and made set for publications </span>
                            <button>See more</button>
                        </div>
                    </div>
                    <div className={styles.image5}>
                        <Image src={images.explore_3} alt="Image 5" />
                        <div className={styles.content}>
                            <h2>Check out new uploads</h2>
                            <span>All vendors are being fully screened and made set for publications </span>
                            <button>See more</button>
                        </div>
                    </div>


                </div>
            </div>}
            {onMobile && <div className={styles.mobileMain}>
                <h2>Explore African cultures all around Africa </h2>
                <p>Experience diversity from different African cultures in the world </p>
                <div className={styles.images}>
                    <div className={styles.image}>
                        <Image src={images.explore_5} alt="Image 3" />
                        <div className={styles.content}>
                            <h3>Revolutionizing the African market </h3>
                        </div>
                    </div>
                    <div className={styles.image} >
                        <Image src={images.explore_1} alt="Image 1" />
                        <div className={styles.content}>
                            <h2>Check out new uploads</h2>
                            <span>All vendors are being fully screened and made set for publications </span>
                            <button>See more</button>
                        </div>
                    </div>
                    <div className={styles.image}>
                        <Image src={images.explore_2} alt="Image 2" />
                        <div className={styles.content}>
                            <h2>Check out new uploads</h2>
                            <span>All vendors are being fully screened and made set for publications </span>
                            <button>See more</button>
                        </div>
                    </div>
                   
                    <div className={styles.image}>
                        <Image src={images.explore_4} alt="Image 4" />
                        <div className={styles.content}>
                            <h2>Check out new uploads</h2>
                            <span>All vendors are being fully screened and made set for publications </span>
                            <button>See more</button>
                        </div>
                    </div>
                    <div className={styles.image}>
                        <Image src={images.explore_3} alt="Image 5" />
                        <div className={styles.content}>
                            <h2>Check out new uploads</h2>
                            <span>All vendors are being fully screened and made set for publications </span>
                            <button>See more</button>
                        </div>
                    </div>


                </div>
            </div>}
      </>
    )
}

export default Diversity