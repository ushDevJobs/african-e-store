"use client"
import React from 'react'
import Chart from './Chart'
import styles from '../stores/[storeId]/SellerStore.module.scss';

type Props = {}

const IncomePage = (props: Props) => {
  return (
      <div className={styles.main}>
        <Chart/>
    </div>
  )
}

export default IncomePage