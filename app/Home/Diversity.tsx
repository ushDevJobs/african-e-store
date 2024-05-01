import React from 'react'
import styles from '../styles/HomePage/Diversity.module.scss'
import Image from 'next/image'
import images from '@/public/images'
type Props = {}

const Diversity = (props: Props) => {
    return (
        <div className={styles.main}>
            <h2>Explore African cultures all around Africa </h2>
            <p>Experience diversity from different African cultures in the world </p>
            <div className={styles.imageGrid}>
                <div className={styles.image1} >
                    <Image src={images.explore_1} alt="Image 1" />
                    <span>hello</span>
                </div>
                <div className={styles.image2}>
                    <Image src={images.explore_2} alt="Image 2" />
                    <span>hello</span>
                    </div>
               <div className={styles.image3}>
                    <Image src={images.explore_5} alt="Image 3" />
                    <span>hello</span>
               </div>
               <div className={styles.image4}>
                    <Image src={images.explore_4} alt="Image 4" />
                    <span>hello</span>
               </div>
                <div className={styles.image5}>
                    <Image src={images.explore_3} alt="Image 5" />
                    <span>hello</span>
               </div>
            
                
            </div>
        </div>
    )
}

export default Diversity