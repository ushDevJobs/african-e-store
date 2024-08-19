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
  }, [fetchAllStores]);

  return (
    <section className={isMobile ? styles.mobileMain : styles.main}>
      <h2 className={styles.title}>Stores</h2>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className={isMobile ? styles.images : styles.imageGrid}>
          {stores?.slice(0, 5).map((store, index) => {
            const imageClass = styles[`image${index + 1}`];
            // console.log(imageClass);
            return (
              <Link
                key={store.id}
                href={`/stores/${store.id}`}
                // className={`${styles.storeLink} ${imageClass}`}
              >
                <div className={imageClass}>
                  {store.image && (
                    <Image
                      src={store.image}
                      alt={store.name}
                      fill
                      sizes="500px"
                      //   layout="fill"
                      //   className={styles.storeImage}
                    />
                  )}
                </div>
                <div className={styles.content}>
                  <h3>{store.name}</h3>
                  <button>See more</button>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default StoresSection;
