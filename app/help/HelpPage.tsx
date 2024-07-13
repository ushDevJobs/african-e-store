import React from 'react'
import styles from './Help.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import { ContactIcon, ReportIcon, ReturnIcon } from '../components/SVGs/SVGicons'
import FaqSection from '../components/faq/FaqSection'
import Link from 'next/link'
import HelpCenterSection from '../components/HelpCenterSection'

type Props = {}

const HelpPage = (props: Props) => {
    return (
      <div className={styles.main}>
            <HelpCenterSection/>
            <FaqSection/>
      </div>
    )
}

export default HelpPage