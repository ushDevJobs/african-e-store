import React from 'react'
import styles from '../styles/CategoriesSettingsBar.module.scss'

type Props = {}

const CategoriesSettingsBar = (props: Props) => {
    
  return (
    <div className={styles.settingsBar}>
        <div className={styles.catgoriesFilter}>
              <h3>Categories</h3>
              <ul>
                  <li className={styles.active}>Grocery</li>
                  <li>Computing</li>
                  <li>Electronics</li>
                  <li>Fashion</li>
                  <li>Baby Products</li>
              </ul>
        </div>

        <div className={styles.condition}>
            <h3>Condition</h3>
            <div className={styles.field}>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">New (12)</label>
            </div>
            <div className={styles.field}>
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Used (12)</label>
            </div>
        </div>
          <div className={styles.priceFilter}>
              <h3>price</h3>
          </div>
          <div className={styles.condition}>
            <h3>Delivery options</h3>
              <div className={styles.field}>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Free</label>
              </div>
              <div className={styles.field}>
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">Pickup</label>
              </div>
          </div>
    </div>
  )
}

export default CategoriesSettingsBar