'use client'
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import styles from '../styles/Registration.module.scss'
import Link from 'next/link'
import { LineIcon } from '../components/SVGs/SVGicons'
import { useLoginBuyer } from '../api/apiClients'
import { useRouter } from 'next/navigation'
import { LoginBuyer } from '../components/models/IRegisterBuyer'
import { emailRegex } from '../components/constants/emailRegex'
import { toast } from 'sonner'
import { catchError } from '../components/constants/catchError'

type Props = {}

const LoginPage = (props: Props) => {
    const loginUser = useLoginBuyer()
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<LoginBuyer>();
    console.log(formValues)

    const [emailAddressErrorMsg, setEmailAddressErrorMsg] = useState<
        string | boolean
    >(false);

    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string | boolean>(
        false
    );
    
    function onformValueChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        setState?: Dispatch<SetStateAction<string | boolean>>
    ) {
        const { name, value } = e.target;

        setFormValues({
            ...(formValues as LoginBuyer),
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
            formValues.email &&
            emailRegex.test(formValues.email.trim()) &&
            formValues.password &&
            formValues.password.length >= 8
        ) {
            return true;
        } else {
            console.log('form validation failed');

            if (!formValues?.email || !emailRegex.test(formValues.email.trim())) {
                setEmailAddressErrorMsg(true);
            } else {
                setEmailAddressErrorMsg(false);
            }
            if (!formValues?.password) {
                setPasswordErrorMsg('Please enter password');
            } else if (formValues.password.length < 8) {
                setPasswordErrorMsg('Password length should be more than 8 characters');
            } else {
                setPasswordErrorMsg(false);
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

            await loginUser(formValues as LoginBuyer)
                .then((response) => {
                    console.log(response.data);

                    // Display success
                    toast.success("You have successfully logged in.");

                    if (response && '/login?buyer=2') {
                        router.push('/')
                    } else {
                        router.push('/seller')
                    }
                })
                .catch((error) => {
                    catchError(error);
                    console.log('ERROR loggin in: ', { error });

                    toast.error('Error loggin in. Please try again.');
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
            <h2>Sign in to buy </h2>

            <div className={styles.fieldContainer}>
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
                <div className={styles.formField}>
                    <label htmlFor="password"><span>*</span>Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Please fill in password'
                        value={formValues?.password}
                        onChange={(e) => onformValueChange(e, setPasswordErrorMsg)}
                    />
                    {passwordErrorMsg && (
                        <span className={styles.errorMsg}>
                            {passwordErrorMsg}
                        </span>
                    )}
                </div>
                <button type='submit' className={styles.btn} disabled={loading}
                    style={loading ? { pointerEvents: 'none', opacity: '0.6' } : {}}
                >
                    {loading ? 'LOADING...' : 'SIGN IN'}
                </button>
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