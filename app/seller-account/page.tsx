'use client'
import React, { useEffect, useState } from 'react'
import { useFetchSellerStore, useUpdateBankDetail } from '../api/apiClients'
import { SellerStoreResponse } from '../components/models/ISellerStore'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { toast } from 'sonner'
import SellerAccountPage from './SellerAccountPage'
import { useRouter } from 'next/navigation'
import { BankDetailRequest } from '../components/models/IBankDetails'

type Props = {}

const SellerAccount = (props: Props) => {
    const fetchSellerStore = useFetchSellerStore()
    const router = useRouter()
    const [store, setStore] = useState<SellerStoreResponse>()
    const [isFetchingStore, setIsFetchingStore] = useState<boolean>(true);

    async function handleFetchStore() {

        // Start loader
        setIsFetchingStore(true);

        await fetchSellerStore()
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setStore(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingStore(false);
            });
    }

    useEffect(() => {
        handleFetchStore();
    }, []);
    return (
        <SellerAccountPage
            store={store}
            isFetchingStore={isFetchingStore}
            // Logout={Logout}
        />
    )
}

export default SellerAccount