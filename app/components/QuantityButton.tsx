import React from 'react'
import styles from '../styles/QuantityButton.module.scss'

type Props = {}

const QuantityButton = (props: Props) => {
  return (
      <div className={styles.qty}>
          <h4>Quantity</h4>
          <div className={styles.qtyBtn}>
              <button>-</button>
              <p>2</p>
              <button>+</button>
          </div>
      </div>
  )
}

export default QuantityButton