import React from 'react'
import styles from '../styles/QuantityButton.module.scss'

type Props = {
    onIncrease: () => void;
    onDecrease: () => void;
    qty: number;
}

const QuantityButton = ({onDecrease, onIncrease, qty}: Props) => {
  return (
      <div className={styles.qty}>
          <h4>Quantity</h4>
          <div className={styles.qtyBtn}>
              <button onClick={onDecrease}>-</button>
              <p>{qty}</p>
              <button onClick={onIncrease}>+</button>
          </div>
      </div>
  )
}

export default QuantityButton