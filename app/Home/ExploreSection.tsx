import React from 'react'
import styles from '../styles/HomePage/ExploreSection.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { GreenIcon } from '../components/SVGs/SVGicons'

type Props = {}

const ExploreSection = (props: Props) => {
    const data = [
        {
            text: 'Track your orders'
        },
        {
            text: 'Secured and fast payments '
        },
        {
            text: 'Over 100+ African countries'
        },
        {
            text: 'Vast categories to choose from'
        },
        {
            text: 'Create your own store and become an affiliate '
        },
        {
            text: 'Connect to thousands of customers around Africa '
        },
    ]
    return (
        <div className={styles.main}>
            <h2>Rayvinn makes the culture thrive </h2>
            <p>Select from variety of good placed by thousands of african vendors in the world </p>

            <div className={styles.cards}>
                <div className={styles.lhs}>
                    {
                        data.map((item, index) => (
                           <span key={index}><GreenIcon /> {item.text}</span>   
                        ))
                    }
                  
                </div>
                <div className={styles.rhs}>
                    <Image src={images.explore} alt='image' />
                </div>
            </div>
        </div>
    )
}

export default ExploreSection