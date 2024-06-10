import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AccountStatus } from "../components/models/IAccountStatus";
import { useFetchAccountStatus } from "../api/apiClients";
import { createCustomErrorMessages } from "../components/constants/catchError";
import { toast } from "sonner";

type AccountStatusContextType = {
    accountStatus: AccountStatus | null;
    fetchAccountStatus: () => void;
}

const AccountStatusContext = createContext<AccountStatusContextType | undefined>(undefined);

export const AccountStatusProvider = ({ children }: { children: ReactNode }) => {
    const fetchStatus = useFetchAccountStatus()
    const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(null);

    // Api call to check if user is logged in
    async function fetchAccountStatus() {

        // Start loader
        // setIsResendingVerificationCode(true);

        await fetchStatus()
            .then((response) => {
                // console.log("Response: ", response);
                setAccountStatus(response.data);

            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                // toast.error(errorMessage);
            })
            .finally(() => {
                // setIsResendingVerificationCode(false);
            });
    }

    useEffect(() => {
        fetchAccountStatus();
    }, []);

    return (
        <AccountStatusContext.Provider value={{ accountStatus, fetchAccountStatus }}>
            {children}
        </AccountStatusContext.Provider>
    );
};

export const useAccountStatus = (): AccountStatusContextType => {
    const context = useContext(AccountStatusContext);
    if (context === undefined) {
        throw new Error('useAccountStatus must be used within an AccountStatusProvider');
    }
    return context;
};