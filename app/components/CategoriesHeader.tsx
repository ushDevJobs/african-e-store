import React from 'react'
import styles from '../styles/CategoriesHeader.module.scss'
import Image from 'next/image'
import images from '@/public/images'

type Props = {
    mainText:string;
    subText:string;
}

const CategoriesHeader = ({mainText, subText}: Props) => {
    return (
        <div className={styles.main}>
            <div className={styles.image}>
                <div className={styles.imageContainer}>
                    <Image src={images.header_image} alt='image' />
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