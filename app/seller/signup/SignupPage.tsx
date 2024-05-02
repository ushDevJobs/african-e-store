import React from 'react'
import styles from '../../styles/Registration.module.scss'
import Link from 'next/link'
import { LineIcon } from '@/app/components/SVGs/SVGicons'

type Props = {}

const SignupPage = (props: Props) => {
 
    return (
        <form className={styles.formFieldContainer}>
            <h2>Join Rayvinn today and become a seller  </h2>

            <div className={styles.fieldContainer}>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor=""><span>*</span>Full name</label>
                        <input type="text" name="" id="" placeholder='Your first name and last name' />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor=""><span>*</span>Company Name</label>
                        <input type="text" name="" id="" placeholder='Please enter your company name ' />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor=""><span>*</span>Login Password</label>
                        <input type="text" name="" id="" placeholder='Create a password' />
                    </div> <div className={styles.formField}>
                        <label htmlFor=""><span>*</span>Confirm Password</label>
                        <input type="text" name="" id="" placeholder='Enter your password again ' />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor=""><span>*</span>Country/region</label>
                        <select name="" id="" >
                            <option value="Nigeria">Nigeria </option>
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor=""><span>*</span>Tel</label>
                        <div className={styles.dial}>
                            <select name="" id="">
                                <option value="+234">+234</option>
                            </select>
                            <input type="text" name="" id="" />
                        </div>
                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor=""><span>*</span>Email address</label>
                    <input type="text" name="" id="" placeholder='Please fill in email' />
                </div>

                <div className={styles.acknowledge}>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">I agree to the <Link href={'/'}>Terms of Use</Link>, and <Link href={'/'}>Privacy Policy</Link>. I agree to receive more information from Rayvvin about its products and services.</label>
                </div>
                <Link className={styles.link} href='/verification?seller=1'>
                    <button type='submit' className={styles.btn}> Register</button>
                </Link>

            </div>

            <div className={styles.or}>
                <LineIcon />
                <p>Or</p>
                <LineIcon />
            </div>

            <div className={styles.btnContainer}>
                <Link href={'/signup'}> <button>Register as a buyer</button>
                </Link>

            </div>

        </form>
    )
}

export default SignupPage