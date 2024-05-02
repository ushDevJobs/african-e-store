'use client'
import { ChangeEvent, FunctionComponent, ReactElement, useRef, useState, ClipboardEvent, Dispatch, SetStateAction } from "react";
import styles from "../../styles/VerificationCodeInput.module.scss";

interface VerificationCodeInputProps {
    codeLength: number;
    verificationCode: string[]
    setVerificationCode: Dispatch<SetStateAction<string[]>>
}

const VerificationCodeInput: FunctionComponent<VerificationCodeInputProps> = ({ codeLength, verificationCode,setVerificationCode }): ReactElement => {

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [currentlyFocusedInput, setCurrentlyFocusedInput] = useState<number | null>(null);

    const handleChange = (index: number, value: string) => {
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Move focus to the next input
        if (value && index < codeLength - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index: number) => {
        const newCode = [...verificationCode];
        newCode[index] = ''; // Clear the current input
        setVerificationCode(newCode);

        // Move focus to the previous input when backspacing
        if (index > 0 && !verificationCode[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {

        // Prevent default paste action
        e.preventDefault();

        // Get pasted data 
        const clipboardData = e.clipboardData?.getData('text');

        // If clipboard data is available, update the verification code input fields
        if (clipboardData) {

            // Get the first 6 (code length)  characters of the clipboard data
            const pastedCode = clipboardData.slice(0, codeLength);
            // Declare a new array to hold the new verification code
            const newCode = [...verificationCode];
            // Update the new verification code array with the pasted code
            for (let i = 0; i < pastedCode.length; i++) {
                newCode[index + i] = pastedCode[i];
                // Move focus to the next input
                if (index + i < codeLength - 1 && inputRefs.current[index + i + 1]) {
                    inputRefs.current[index + i + 1]?.focus();
                }
            }
            setVerificationCode(newCode);
        }
    };

    return (
        <div className={styles.verificationCodeInput}>
            {Array.from({ length: codeLength }).map((_, index) => (
                <input
                    key={index}
                    // ref={(el) => (inputRefs.current[index] = el)}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                        return;
                    }}
                    type="text"
                    value={verificationCode[index]}
                    maxLength={1}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(index)}
                    onFocus={() => setCurrentlyFocusedInput(index)}
                    onBlur={() => setCurrentlyFocusedInput(null)}
                    onPaste={(e) => handlePaste(e, index)}
                    className={currentlyFocusedInput == index ? styles.active : ''}
                />
            ))}
        </div>
    );
}

export default VerificationCodeInput;