import React from 'react'
import styles from '../styles/Registration.module.scss'
import Image from 'next/image'
import images from '@/public/images'
import Link from 'next/link'

type Props = {}

const RegistrationNav = (props: Props) => {
  return (
    <div className={styles.nav}>
          <Link href={'/'} > 
         <Image src={images.logo} alt='logo'/>
        </Link>
      
    </div>
  )
}

export default RegistrationNav