import React from 'react'
import styles from '../styles/SummarySection.module.scss'
import Link from 'next/link'
type Props = {}

const SummarySection = (props: Props) => {
  return (
      <div className={styles.rhs}>
          <div className={styles.summaryItem}>
              <p>Item (1)</p>
              <h3>US $164.99</h3>
          </div>
          <div className={styles.summaryItem}>
              <p>Shipping to Nigeria </p>
              <h3>US $31</h3>
          </div>
          <div className={styles.total}>
              <p>Subtotal </p>
              <h3>US $195</h3>
          </div>
          <Link href={'/checkout'}> 
           <button>Pay $195.99</button>
           </Link>
      </div>
  )
}

export default SummarySection