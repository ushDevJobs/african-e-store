import React from 'react'
import styles from './Help.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { ContactIcon, ReportIcon, ReturnIcon } from '../components/SVGs/SVGicons'
import FaqSection from '../components/faq/FaqSection'

type Props = {}

const HelpPage = (props: Props) => {
    return (
      <div className={styles.main}>
            <div className={styles.heroSection}>
                <div className={styles.backgroundImage}>
                    <Image src={images.home_hero_bg} alt='hero background image' />
                    <div className={styles.contents}>
                        <h1>Help center </h1>
                        <div className={styles.cards}>
                            <div className={styles.contact}>
                                <ContactIcon />
                                <h3>Contact us</h3>
                                <p>Get the help you need from an automated assistant or contact an agent </p>
                                <button>Contact us</button>
                            </div>
                            <div className={styles.returnContainer}>
                                <div className={styles.return}>
                                    <ReturnIcon />
                                    <h3>Start a return</h3>
                                </div>
                                <div className={styles.return}>
                                    <ReportIcon />
                                    <h3>Report an item that hasn&apos;t arrived </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FaqSection/>
      </div>
    )
}

export default HelpPage