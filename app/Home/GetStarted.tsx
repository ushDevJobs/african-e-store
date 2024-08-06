import React from 'react'
import styles from '../styles/HomePage/GetStarted.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import Link from 'next/link'

type Props = {}

const GetStarted = (props: Props) => {
    return (
        <div className={styles.main}>
            <h2>Ready to get started ?</h2>

            <div className={styles.contents}>
                <div className={styles.lhs}>
                    <Image src={images.get_started} alt='image' />
                </div>
                <div className={styles.rhs}>
                    <h3>Explore Products from Top Suppliers Across Africa </h3>
                    <p>Discover a wide range of products from reliable suppliers throughout Africa. Get the best deals and high-quality items tailored to your needs. Join our platform to start exploring today!</p>
              <Link href={'/signup'}> <button>Sign up</button></Link>
                   
                </div>
            </div>
        </div>
    )
}

export default GetStarted