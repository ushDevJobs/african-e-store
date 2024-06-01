'use client'
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import styles from '../styles/Registration.module.scss'
import Link from 'next/link'
import { LineIcon } from '../components/SVGs/SVGicons'
import { useRegisterBuyer } from '../api/apiClients'
import { RegisterBuyerRequest } from '../components/models/IRegisterBuyer'
import { useRouter } from 'next/navigation'
import { emailRegex } from '../components/constants/emailRegex'
import { StorageKeys } from '../components/constants/StorageKeys'
import { catchError } from '../components/constants/catchError'
import { toast } from 'sonner'

type Props = {}

const SignupPage = (props: Props) => {
    const router = useRouter();
    const registerBuyer = useRegisterBuyer()

    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<RegisterBuyerRequest>();
    console.log(formValues)

    const [fullNameErrorMsg, setFullNameErrorMsg] = useState<string | boolean>(
        false
    );
    const [emailAddressErrorMsg, setEmailAddressErrorMsg] = useState<
        string | boolean
    >(false);
    const [phoneErrorMsg, setPhoneErrorMsg] = useState<string | boolean>(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string | boolean>(
        false
    );
    const [countryErrorMsg, setCountryErrorMsg] = useState<string | boolean>(
        false
    );

    const [cofirmPasswordErrorMsg, setCofirmPasswordErrorMsg] = useState<
        string | boolean
    >(false);

    function onformValueChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        setState?: Dispatch<SetStateAction<string | boolean>>
    ) {
        const { name, value } = e.target;

        setFormValues({
            ...(formValues as RegisterBuyerRequest),
            [name]: value,
        });

        // If setState is not undefined...
        if (setState) {
            // Set the state
            setState(false);
        }
    }

    /**
     * Function to validate form fields
     * @returns boolean depicting form validation status
     */
    function validateFields() {
        console.log(formValues);
        if (
            formValues &&
            formValues.fullname &&
            formValues.country &&
            formValues.email &&
            emailRegex.test(formValues.email.trim()) &&
            formValues.password &&
            formValues.password.length >= 8 &&
            formValues.confirmPassword &&
            formValues.telephone
        ) {
            return true;
        } else {
            console.log('form validation failed');

            if (!formValues?.fullname) {
                setFullNameErrorMsg(true);
            } else {
                setFullNameErrorMsg(false);
            }
            if (!formValues?.country) {
                setCountryErrorMsg(true);
            } else {
                setCountryErrorMsg(false);
            }
            if (!formValues?.email || !emailRegex.test(formValues.email.trim())) {
                setEmailAddressErrorMsg(true);
            } else {
                setEmailAddressErrorMsg(false);
            }
            if (!formValues?.telephone) {
                setPhoneErrorMsg(true);
            } else {
                setPhoneErrorMsg(false);
            }
            if (!formValues?.password) {
                setPasswordErrorMsg('Please enter password');
            } else if (formValues.password.length < 8) {
                setPasswordErrorMsg('Password length should be more than 8 characters');
            } else {
                setPasswordErrorMsg(false);
            }
            if (!formValues?.confirmPassword) {
                setCofirmPasswordErrorMsg(true);
            } else {
                setCofirmPasswordErrorMsg(false);
            }

            return false;
        }
    }
    async function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        //show the loader
        setLoading(true);

        if (validateFields()) {
            console.log(formValues);

            await registerBuyer(formValues as RegisterBuyerRequest)
                .then((response) => {
                    // console.log(response.data);

                    // Display success
                    toast.success("You have successfully created an account.");

                    // Persist user data in session storage
                    sessionStorage.setItem(
                        StorageKeys.RegisteredBuyer,
                        JSON.stringify(response.data)
                    );

                    // Redirect to verification
                    router.push('/verification?buyer=2')
                })
                .catch((error) => {
                    catchError(error);
                    // console.log('ERROR CREATING USER: ', { error });
                    if (
                        error.response.data.message == 'User already exist'
                    ) {
                        // console.log('User already exist');
                        toast.error(
                            'User already exist. Please login to continue.'
                        );
                        return;
                    }
                    toast.error('Error creating user. Please try again.');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }

    //UseEffect to close all toasts after 5 seconds
    useEffect(() => {
        if (!loading)
            setTimeout(() => {
                toast.dismiss();
            }, 3000);
    }, [loading]);

    return (
        <form className={styles.formFieldContainer} onSubmit={(e) => handleFormSubmission(e)}>
            <h2>Sign up to buy </h2>

            <div className={styles.fieldContainer}>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="fullname"><span>*</span>Full name</label>
                        <input type="text"
                            name="fullname"
                            id="fullname"
                            placeholder='Your first name and last name'
                            value={formValues?.fullname}
                            onChange={(e) => onformValueChange(e, setFullNameErrorMsg)}
                        />
                        {fullNameErrorMsg && (
                            <span className={styles.errorMsg}>
                                Please enter full name
                            </span>
                        )}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="email"><span>*</span>Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Please fill in email'
                            value={formValues?.email}
                            onChange={(e) => onformValueChange(e, setEmailAddressErrorMsg)}
                        />
                        {emailAddressErrorMsg && (
                            <span className={styles.errorMsg}>
                                Please enter your email address
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="password"><span>*</span>Login Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter password'
                            value={formValues?.password}
                            onChange={(e) => onformValueChange(e, setPasswordErrorMsg)}
                        />
                        {passwordErrorMsg && (
                            <span className={styles.errorMsg}>
                                {passwordErrorMsg}
                            </span>
                        )}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="confirmPassword"><span>*</span>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder='Confirm password'
                            value={formValues?.confirmPassword}
                            onChange={(e) =>
                                onformValueChange(e, setCofirmPasswordErrorMsg)
                            }
                        />
                        {cofirmPasswordErrorMsg && (
                            <span className={styles.errorMsg}>
                                Please confirm password
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="country"><span>*</span>Country/region</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            placeholder='Enter country'
                            value={formValues?.country}
                            onChange={(e) =>
                                onformValueChange(e, setCountryErrorMsg)
                            }
                        />
                        {countryErrorMsg && (
                            <span className={styles.errorMsg}>
                                Please enter country
                            </span>
                        )}
                    </div>
                    {/* <div className={styles.formField}>
                        <label htmlFor=""><span>*</span>Country/region</label>
                        <select name="" id="" >
                            <option value="Nigeria">Nigeria </option>
                        </select>
                    </div> */}
                    <div className={styles.formField}>
                        <label htmlFor="telephone"><span>*</span>Tel</label>
                        <div className={styles.dial}>
                            <select name="" id="">
                                <option value="+234">+234</option>
                            </select>
                            <input
                                type="text"
                                name="telephone"
                                id="telephone"
                                placeholder='Enter your phone number'
                                value={formValues?.telephone}
                                onChange={(e) => onformValueChange(e, setPhoneErrorMsg)}
                            />
                        </div>
                        {phoneErrorMsg && (
                            <span className={styles.errorMsg}>
                                Please enter phone number
                            </span>
                        )}
                    </div>
                </div>

                <div className={styles.acknowledge}>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">I agree to the <Link href={'/'}>Terms of Use</Link>, and <Link href={'/'}>Privacy Policy</Link>. I agree to receive more information from Rayvvin about its products and services.</label>
                </div>
                <button type='submit' disabled={loading} className={styles.btn}
                    style={loading ? { pointerEvents: 'none', opacity: '0.6' } : {}}>
                    {loading ? 'LOADING...' : 'SIGN UP'}
                </button>
                {/* </Link> */}

            </div>

            <div className={styles.or}>
                <LineIcon />
                <p>Or</p>
                <LineIcon />
            </div>

            <div className={styles.btnContainer}>
                <button>Sign up with Google</button>
                <button>Sign up with Facebook</button>
            </div>

        </form>
    )
}

export default SignupPage