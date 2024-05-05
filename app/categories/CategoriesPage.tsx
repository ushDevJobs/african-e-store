import React from 'react'
import styles from './Categories.module.scss'
import CategoriesHeader from '../components/CategoriesHeader'

type Props = {}

const CategoriesPage = (props: Props) => {
  return (
    <div className={styles.main}>
        <CategoriesHeader/>
    </div>
  )
}

export default CategoriesPage