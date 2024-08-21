"use client"
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createCustomErrorMessages } from "../constants/catchError";
import { useFetchAllStores } from "@/app/api/apiClients";

export const useFetchStores = () => {
  const fetchAllStores = useFetchAllStores();
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetchAllStores();
        setStores(response.data.stores); // Assuming the response structure
      } catch (error:any) {
        const errorMessage = createCustomErrorMessages(error?.response?.data);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStores();
  }, []);

  return { stores, isLoading };
};
