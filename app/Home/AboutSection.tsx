import React from 'react'
import styles from '../styles/HomePage/AboutSectioon.module.scss'
import { AirdropIcon, BulkIcon, PlusIcon, TruckIcon } from '../components/SVGs/SVGicons'
import Link from 'next/link'

type Props = {}

const AboutSection = (props: Props) => {
    const contents = [
        {
            abouticon: <AirdropIcon />,
            text: 'Connect with other africans',
            subtext: "Rayvvin let's you connect with Africans all around the globe in exchange for goods and services",
            linkText: 'Create seller account',
            link: '/'
        },
        {
            abouticon: <BulkIcon />,
            text: 'Trusted suppliers from all around africa ',
            subtext: "Rayvvin let's you connect with Africans all around the globe in exchange for goods and services",
            linkText: 'Explore categories',
            link: '/'
        },
        {
            abouticon: <TruckIcon />,
            text: '24/7 service',
            subtext: "Rayvvin let's you connect with Africans all around the globe in exchange for goods and services",
            linkText: 'See Items ',
            link: '/'
        },
    ]
    return (
        <div className={styles.aboutSection}>
            <div className={styles.cards}>
                {contents.map((item, index) => (
                    <div className={styles.card} key={index}>
                        <p>{item.abouticon}</p>
                        <h3>{item.text} </h3>
                        <h4>{item.subtext}</h4>
                        <Link href={item.link} className={styles.link}> <PlusIcon />{item.linkText} </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutSection