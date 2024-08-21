"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Categories.module.scss";
import CategoriesSettingsBar from "../components/CategoriesSettingsBar";
import useResponsiveness from "../components/hooks/responsiveness-hook";
import Image from "next/image";
import images from "@/public/images";
import {
  FilterIcon,
  LeftArrowIcon,
  RightArrowIcon,
  SortIcon,
} from "../components/SVGs/SVGicons";
import { useFetchCategories } from "../api/apiClients";
import { useRouter, useSearchParams } from "next/navigation";
import { createCustomErrorMessages } from "../components/constants/catchError";
import { toast } from "sonner";
import { CategoriesResponse } from "../components/models/AllCategories";
import { motion } from "framer-motion";
import CategoriesSkeletonLoader from "./CategoriesSketon";
import { StorageKeys } from "../components/constants/StorageKeys";
import { CategoriesHeader } from "../components/CategoriesHeader";
import Link from "next/link";
import MobileSettingsBar from "./MobileSettingsBar";
import ProductCard from "../components/ProductCard";

const CategoriesPage = () => {
  const fetchCategories = useFetchCategories();
  const windowRes = useResponsiveness();
  const isMobile = windowRes.width && windowRes.width < 768;
  const onMobile = typeof isMobile == "boolean" && isMobile;
  const onDesktop = typeof isMobile == "boolean" && !isMobile;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [isFetchingCategories, setIsFetchingCategories] =
    useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [totalCategories, setTotalCategories] = useState<number>(0);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(() =>
    parseInt(searchParams.get("page") ?? "1")
  ); // Track current page
  const limit = 6; // Number of categories per page
  const totalPages = totalCategories;
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [searchQuery, setSearchQuery] = useState<string>("");

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/categories?page=${page}`);
    }
  };
  async function handleFetchAllCategories() {
    // Start loader
    setIsFetchingCategories(true);

    await fetchCategories(currentPage, limit)
      .then((response) => {
        // console.log("Response: ", response.data.data);
        setCategories(response.data.data);
        setTotalCategories(response.data.totalPages);
        // Persist all categories data in session storage
        // sessionStorage.setItem(
        //     StorageKeys.SelectedCategories,
        //     JSON.stringify(response.data.data)
        // );
      })
      .catch((error) => {
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsFetchingCategories(false);
      });
  }

  useEffect(() => {
    const totalPages = totalCategories;
    if (currentPage > totalPages && totalPages > 0) {
      goToPage(totalPages); // Redirect to the last page if current page exceeds total pages
    }
  }, [categories, currentPage]);

  useEffect(() => {
    handleFetchAllCategories();
  }, [currentPage]);

  useEffect(() => {
    const pageParam = parseInt((searchParams.get("page") as string) || "1", 10);
    setCurrentPage(pageParam);
  }, [searchParams]);

  // Useeffect to set active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      categories.forEach((category) => {
        const element = document.getElementById(category.id.toString());
        if (
          element &&
          element.getBoundingClientRect().top < window.innerHeight &&
          element.getBoundingClientRect().bottom > 0
        ) {
          setActiveCategory(category.name);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categories]);

  // const handleCategoryClick = (categoryId: string) => {
  //     const element = categoryRefs.current[categoryId];
  //     if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' });
  //     }
  // };

  const handleCategoryClick = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjust the offset value as needed
        behavior: "smooth",
      });
    }
  };

  const mobileHandleCategoryClick = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 900, // Adjust the offset value as needed
        behavior: "smooth",
      });
    }
  };

  // Filter categories based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      products: category.products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.products.length > 0); // Only include categories with matching products

  return (
    <motion.div initial="closed" animate={isFilterOpen ? "opened" : "closed"}>
      {isFilterOpen && (
        <MobileSettingsBar
          setIsFilterOpen={setIsFilterOpen}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={mobileHandleCategoryClick}
        />
      )}
      {categories.length == 0 && isFetchingCategories ? (
        <CategoriesSkeletonLoader />
      ) : (
        <div className={styles.main}>
          <CategoriesHeader
            mainText="Explore different categories"
            subText="Search for any product in different categories on Rayvvin"
          />
          {/* {onMobile && (
            <div className="w-full flex items-center gap-4 justify-end mb-4 ml-auto">
              <span className='flex items-center gap-2 cursor-pointer'><SortIcon /> Sort</span>
              <span
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FilterIcon /> Filter{" "}
              </span>
            </div>
          )} */}
          {/* <div className="mb-7 ml-auto flex items-end justify-end">
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-4 rounded-full border-gray-400 border outline-none text-base text-black w-full md:w-[400px] lg:w-[500px]"
            />
          </div> */}
          <div className={styles.contents}>
            {onDesktop && (
              <div className={styles.lhs} style={{ position: "relative" }}>
                <CategoriesSettingsBar
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryClick={handleCategoryClick}
                />
              </div>
            )}

            <div className={styles.rhs}>
              <div className="flex flex-col gap-10">
                <div className="my-4 justify-between items-start xs:items-start sm:items-center md:items-center lg:items-center xl:items-center flex flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row wrap w-full gap-4">
                  <h3 className="!text-[24px]">{`All categories`}</h3>
                  <div className="flex flex-row gap-4 items-center w-full justify-end">
                    <div className="flex grow justify-end">
                      <input
                        type="text"
                        placeholder={`Search all categories`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-4 rounded-full border-gray-400 border outline-none text-base text-black w-full md:w-[200px] lg:w-[300px]"
                      />
                    </div>
                    {onMobile && (
                      <div className=" flex-auto flex items-center gap-4 justify-end mb-2 ml-auto">
                        {/* <span className='flex items-center gap-2 cursor-pointer'><SortIcon /> Sort</span> */}
                        <span
                          onClick={() => setIsFilterOpen(true)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <FilterIcon /> Filter{" "}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <div
                      className="flex flex-col "
                      key={category.id}
                      ref={(el) => {
                        categoryRefs.current[category.id.toString()] = el;
                      }}
                      // style={{ paddingTop: '50px' }}
                    >
                      <h3 id={category.id.toString()} className="!text-[22px] mb-4">{category.name}</h3>
                      <div className={styles.cards}>
                        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {category.products
                            .slice(0, 10)
                            .map((product, index) => (
                              <ProductCard key={index} product={product} />
                            ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center flex flex-col w-full md:w-[50vw] items-center justify-center h-[40vh] text-gray-400 text-base">
                    No Product found
                  </p>
                )}
              </div>
              {filteredCategories.length > 0 && filteredCategories && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={
                      currentPage === 1
                        ? { cursor: "not-allowed", opacity: "0.5" }
                        : { cursor: "pointer" }
                    }
                  >
                    <LeftArrowIcon />
                  </button>
                  <div className={styles.value}>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <span
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        style={
                          currentPage === index + 1
                            ? { backgroundColor: "#2c7865", color: "#fff" }
                            : {}
                        }
                      >
                        {index + 1}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    style={
                      currentPage >= totalPages
                        ? { cursor: "not-allowed", opacity: "0.5" }
                        : { cursor: "pointer" }
                    }
                  >
                    <RightArrowIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CategoriesPage;
