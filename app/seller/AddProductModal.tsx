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
                        <label htmlFor="email"><span>*</span>Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Please fill in email'
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="password"><span>*</span>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Please fill in password'
                        />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="email"><span>*</span>Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Please fill in email'
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="password"><span>*</span>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Please fill in password'
                        />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="email"><span>*</span>Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Please fill in email'
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="password"><span>*</span>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Please fill in password'
                        />
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="email"><span>*</span>Images</label>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="email"><span>*</span>Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Please fill in email'
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="password"><span>*</span>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Please fill in password'
                        />
                    </div>
                </div>
            </form>
        </ModalWrapper>
    )
}

export default AddProductModal