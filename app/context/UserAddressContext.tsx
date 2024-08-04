import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { createCustomErrorMessages } from "../components/constants/catchError";
import { toast } from "sonner";
import { UserAddressResponse } from "../components/models/IUserAddress";
import { useFetchUserAddress } from "../api/apiClients";

type UserAddressContextType = {
    userAddress: UserAddressResponse | null;
    fetchUserAddress: () => void;
}

const UserAddressContext = createContext<UserAddressContextType | undefined>(undefined);

export const UserAddressProvider = ({ children }: { children: ReactNode }) => {
    const fetchAddress = useFetchUserAddress()
    const [userAddress, setUserAddress] = useState<UserAddressResponse | null>(null);

    async function fetchUserAddress() {

        // Start loader
        // setIsResendingVerificationCode(true);

        await fetchAddress()
            .then((response) => {
                console.log("Response: ", response.data);
                setUserAddress(response.data.data);
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
        fetchUserAddress();
    }, []);

    return (
        <UserAddressContext.Provider value={{ userAddress, fetchUserAddress }}>
            {children}
        </UserAddressContext.Provider>
    );
};

export const useUserAddress = (): UserAddressContextType => {
    const context = useContext(UserAddressContext);
    if (context === undefined) {
        throw new Error('useUserAddress must be used within an UserAddressProvider');
    }
    return context;
};