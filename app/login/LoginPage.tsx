import React from 'react'
import styles from '../styles/Registration.module.scss'
import Link from 'next/link'
import { LineIcon } from '../components/SVGs/SVGicons'

type Props = {}

const LoginPage = (props: Props) => {
    return (
        <form className={styles.formFieldContainer}>
            <h2>Sign in to buy </h2>

            <div className={styles.fieldContainer}>

                <div className={styles.formField}>
                    <label htmlFor=""><span>*</span>Email address</label>
                    <input type="text" name="" id="" placeholder='Please fill in email' />
                </div>
                <div className={styles.formField}>
                    <label htmlFor=""><span>*</span>Password</label>
                    <input type="password" name="" id="" placeholder='Please fill in password' />
                </div>
                <button type='submit' className={styles.btn}> SIGN UP</button>
            </div>

            <div className={styles.or}>
                <LineIcon />
                <p>Or</p>
                <LineIcon />
            </div>

            <div className={styles.btnContainer}>
                <button>Sign in with Google</button>
                <button>Sign in with Facebook</button>
            </div>

        </form>
    )
}

export default LoginPage