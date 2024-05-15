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
                    <h3>See products from different suppliers in Africa </h3>
                    <p>Lorem ipsum dolor sit amet consectetur. Tellus turpis quis nisi consequat nisl. In ultrices nisl lectus etiam arcu ipsum mauris odio tincidunt. </p>
              <Link href={'/signup'}> <button>Sign up</button></Link>
                   
                </div>
            </div>
        </div>
    )
}

export default GetStarted