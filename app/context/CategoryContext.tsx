import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import {  useFetchCategories } from "../api/apiClients";
import { createCustomErrorMessages } from "../components/constants/catchError";
import { CategoriesResponse } from "../components/models/AllCategories";

type CategoriesContextType = {
    categories: CategoriesResponse[] | null;
    handleFetchAllCategories: () => void;
    isFetchingCategories: boolean;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {

    const fetchCategories = useFetchCategories()
    const [categories, setCategories] = useState<CategoriesResponse[] | null>(null);
    const [isFetchingCategories, setIsFetchingCategories] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
    const limit = 6;

    async function handleFetchAllCategories() {

        // Start loader
        setIsFetchingCategories(true);

        await fetchCategories(currentPage, limit)
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setCategories(response.data.data);
               
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data)
                // toast.error(errorMessage);
            })
            .finally(() => {
                setIsFetchingCategories(false);
            });
    }

    useEffect(() => {
        handleFetchAllCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, handleFetchAllCategories, isFetchingCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = (): CategoriesContextType => {
    const context = useContext(CategoriesContext);
    if (context === undefined) {
        throw new Error('useCategories must be used within an CategoriesProvider');
    }
    return context;
};