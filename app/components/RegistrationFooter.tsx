import React from 'react'
import styles from '../styles/Registration.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import Link from 'next/link'
import { GreenFacebookIcon, GreenLinkedInIcon, GreenTelegramIcon, GreenTwitterIcon } from './SVGs/SVGicons'
type Props = {}

const RegistrationFooter = (props: Props) => {
    return (
        <div className={styles.footer}>
            <Link href={'/'}> <Image src={images.logo} alt='logo' /></Link>
            {/* <h3>Your catch phrase here </h3> */}
            <div className={styles.icons}>
                <Link href={'/'}><GreenFacebookIcon /></Link>
                <Link href={'/'}><GreenTwitterIcon /></Link>
                <Link href={'/'}><GreenLinkedInIcon /></Link>
                <Link href={'/'}><GreenTelegramIcon /></Link>
            </div>
        </div>
    )
}

export default RegistrationFooter