"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FullPageLoader } from "../Loader/ComponentLoader";
import { useFetchAllStores } from "../api/apiClients";
import { createCustomErrorMessages } from "../components/constants/catchError";
import { toast } from "sonner";
import useResponsiveness from "../components/hooks/responsiveness-hook";
import styles from "../styles/HomePage/Diversity.module.scss";
import { AllStoresResponse } from "./models/IStores";

const StoresSection = () => {
  const fetchAllStores = useFetchAllStores();
  const [stores, setStores] = useState<AllStoresResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const windowRes = useResponsiveness();
  const isMobile = windowRes.width && windowRes.width < 768;

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetchAllStores();
        setStores(response.data.data); // Assuming the response structure
      } catch (error: any) {
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStores();
  }, []);

  return (
    <section className={isMobile ? styles.mobileMain : styles.main}>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <section className="my-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            Stores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stores.map((store) => (
              <Link
                key={store.id}
                href={`/stores/${store.id}`}
                className="block"
              >
                <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {store.image && (
                    <Image
                      src={store.image}
                      alt={store.name}
                      layout="fill"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold">{store.name}</h3>
                  <p className="text-xs text-gray-600 !text-start">
                    {store.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default StoresSection;
