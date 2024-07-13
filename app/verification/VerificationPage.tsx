'use client'
import React, { useEffect, useState } from 'react';
import styles from '../styles/Registration.module.scss';
import VerificationCodeInput from '../components/custom/VerificationCodeInput';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useResendVerificationCode, useVerifyUser } from '../api/apiClients';
import { RegisterBuyerRequest, RegisterBuyerResponse } from '../components/models/IRegisterBuyer';
import { StorageKeys } from '../components/constants/StorageKeys';
import { catchError, createCustomErrorMessages } from '../components/constants/catchError';
import { toast } from 'sonner';

type Props = {};

const VerificationPage = (props: Props) => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const userId = searchParams.get('id') ?? ''
    !userId && router.back()
    const verifyUser = useVerifyUser();
    const resendVerificationCode = useResendVerificationCode();

    const [codeLength, setCodeLength] = useState<number>(5);
    const [verificationCode, setVerificationCode] = useState<string[]>(Array(codeLength).fill(''));
    const [isVerifyingUser, setIsVerifyingUser] = useState<boolean>(false);
    const [hasVerificationCodeBeenResent, setHasVerificationCodeBeenResent] = useState<boolean>(false);
    const [isResendingVerificationCode, setIsResendingVerificationCode] = useState<boolean>(false);

    async function handleVerifyUser() {
        // Validate user input
        if (!verificationCode) {
            return;
        }

        // Ensure userData and userData.userId are defined
        if (!userId || userId === '') {
            console.error('User data or user ID is missing');
            return;
        }

        // Start loader
        setIsVerifyingUser(true);

        const data = {
            id: userId,
            code: verificationCode.join('')
        }
        await verifyUser(data)
            .then((response) => {
                // console.log(response)
                // Display success
                toast.success("Your account has been verified");
                if (response.data.status) {
                    router.push('/login')
                }

            })
            .catch((error) => {
                catchError(error);
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsVerifyingUser(false);
            });
    };

    async function handleResendVerificationCode() {
        // Reset resent verification code state
        setHasVerificationCodeBeenResent(false);

        // Start loader
        setIsResendingVerificationCode(true);

        await resendVerificationCode(userId as string)
            .then((response) => {
                // console.log("Response: ", response);
                setHasVerificationCodeBeenResent(true);

            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                setIsResendingVerificationCode(false);
            });
    }


    //UseEffect to close all toasts after 5 seconds
    useEffect(() => {
        if (!isVerifyingUser)
            setTimeout(() => {
                toast.dismiss();
            }, 3000);
    }, [isVerifyingUser]);

    useEffect(() => {
        if (hasVerificationCodeBeenResent) {
            setTimeout(() => {
                setHasVerificationCodeBeenResent(false);
            }, 3000);
        }
    }, [hasVerificationCodeBeenResent])

    return (
        <div className={styles.formFieldContainer} style={{ paddingBottom: '150px' }}>
            <h2>Enter OTP</h2>
            <p style={{ padding: '0 16px', textAlign: 'center', marginTop: '-22px', color: '#828282', marginBottom: '50px' }}>
                A one time password has been sent to your mail, please enter it
            </p>

            <VerificationCodeInput
                codeLength={5}
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
            />
            <div className={styles.fieldContainer}>
                <p style={{ fontSize: '16px', textAlign: 'center', color: '#828282', marginBottom: '50px', cursor: 'pointer' }}>
                    {
                        hasVerificationCodeBeenResent ?
                            "Verification code sent!" :
                            "Didn't receive the verification code?"
                    }&nbsp;
                    <span style={{ color: '#2C7865' }} onClick={handleResendVerificationCode}>
                        {isResendingVerificationCode ? "Resending code..." : "Resend code"}
                    </span>
                </p>
                <button
                    type='button'
                    disabled={verificationCode.length != codeLength || isVerifyingUser}
                    className={styles.btn}
                    onClick={handleVerifyUser}
                    style={isVerifyingUser ? { pointerEvents: 'none', opacity: '0.6' } : {}}
                >
                    {isVerifyingUser ? 'Verifying' : 'Verify'}
                </button>
            </div>
        </div>
    );
};

export default VerificationPage;
