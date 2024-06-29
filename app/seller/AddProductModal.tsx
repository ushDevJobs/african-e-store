import React from 'react'
import ModalWrapper from '../components/Modal/ModalWrapper'
import styles from '../styles/AddProductModal.module.scss'

type Props = {
    visibility: boolean
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProductModal = ({ visibility, setVisibility }: Props) => {
    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: 'transparent' }}
        >
            <form action="" className={styles.formFieldContainer}>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="name"><span>*</span>Name of product</label>
                        <input
                            type="name"
                            name="name"
                            id="name"
                            placeholder='Enter the detailed product name '
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quantity"><span>*</span>Product quantity</label>
                        <input
                            type="quantity"
                            name="quantity"
                            id="quantity"
                            placeholder='Enter number of the same product'
                        />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="quality"><span>*</span>Product state/quality</label>
                        <input
                            type="quality"
                            name="quality"
                            id="quality"
                            placeholder='Brand new, Fairly used, refurbished '
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="price"><span>*</span>Product Price</label>
                        <input
                            type="price"
                            name="price"
                            id="price"
                            placeholder='Enter product price'
                        />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="email"><span>*</span>Sale type</label>
                        <input
                            type="type"
                            name="type"
                            id="type"
                            placeholder='Set for auction or one time'
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="category"><span>*</span>Select category</label>
                        <select name="category" id="">
                            <option value="">Select category</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formField}>
                    <label htmlFor="end  date"><span>*</span>End date and time of bidding of bidding </label>
                    <input type='date' name="" id="" placeholder='Select date and time ' />
                </div>
                <div>image</div>
                    <div className={styles.formField}>
                        <label htmlFor="desc"><span>*</span>Product description</label>
                        <textarea
                            name="desc"
                            id="desc"
                            placeholder='Enter detailed description here'
                        />
                    </div>
                    <div className={styles.btnContainer}>
                        <button>Upload Product</button>
                        <button>Save as Draft</button>
                    </div>
            </form>
        </ModalWrapper>
    )
}

export default AddProductModal