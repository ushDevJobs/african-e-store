'use client'
import React, { useState } from 'react';
import styles from '../styles/Registration.module.scss';
import VerificationCodeInput from '../components/custom/VerificationCodeInput';
import { useRouter, useSearchParams } from 'next/navigation'; 

type Props = {};

const VerificationPage = (props: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [verificationCode, setVerificationCode] = useState<string[]>(Array(4).fill('')); 


    async function handleVerifyUser() {
        // Validate user input
        if (!verificationCode) {
            return;
        }
        console.log('Verifying user...'); // Placeholder for actual verification process

        // Simulating a successful verification response
        const response = true;

        if (response) {
            // Check if the query parameter is present in the URL
            if (searchParams.get('seller')) {
                router.push('/seller/login'); 
            } else if (searchParams.get('buyer')) {
                router.push('/login'); 
            } 
        } else {
            console.error('Verification failed.'); // Placeholder for error handling
        }
    }

    return (
        <div className={styles.formFieldContainer} style={{ paddingBottom: '150px' }}>
            <h2>Enter OTP</h2>
            <p style={{ padding: '0 16px', textAlign: 'center', marginTop: '-22px', color: '#828282', marginBottom: '50px' }}>
                A one time password has been sent to your mail, please enter it
            </p>

            <VerificationCodeInput
                codeLength={4}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
            />
            <div className={styles.fieldContainer}>
                <p style={{ fontSize: '16px', textAlign: 'center', color: '#828282', marginBottom: '50px', cursor: 'pointer' }}>
                    Didn&apos;t receive, please <span style={{ color: '#2C7865' }}>resend</span>
                </p>

          
                <button type='button' className={styles.btn} onClick={handleVerifyUser}>CONTINUE</button>
            </div>
        </div>
    );
};

export default VerificationPage;
