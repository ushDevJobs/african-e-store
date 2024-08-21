"use client";

import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import { useCategories } from "../context/CategoryContext"; // Custom hook for categories
import { FullPageLoader } from "../Loader/ComponentLoader"; // Loader component
import useResponsiveness from "./hooks/responsiveness-hook";
import { LongArrowIcon } from "./SVGs/SVGicons";
import styles from "../styles/HomePage/CategorySection.module.scss";

const CategoriesSection = () => {
  const { categories, handleFetchAllCategories, isFetchingCategories } =
    useCategories();
  const windowRes = useResponsiveness();
  const isMobile = windowRes.width && windowRes.width < 768;
  const onMobile = typeof isMobile == "boolean" && isMobile;
  const onDesktop = typeof isMobile == "boolean" && !isMobile;

  useEffect(() => {
    handleFetchAllCategories();
  }, []);

  return (
    <section className="my-2 sm:my-2 md:my-4 lg:my-6 xl:my-12">
      <div className="flex justify-start gap-2">
        <div className="flex w-3 bg-[#d9edbf]"></div>
        <p className="!mx-0 !text-start">Catgories</p>
      </div>
      <h2 className="!mx-0 mt-2 mb-6 !text-start !text-[26px] text-[#6f6f6f]">
        Browse by Category
      </h2>
      {isFetchingCategories ? (
        <div className="h-28 flex items-center justify-center">
          <FullPageLoader />
        </div>
      ) : categories ? (
        <Fragment>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories?.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}?${category.name}`}
                className={`${styles.category_card} flex flex-col items-center justify-center bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow `}
              >
                <div className="cat_child w-16 h-16 mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                  {/* Placeholder for Category Icon/Image */}
                  <span className="text-lg font-semibold">
                    {category.name[0]}
                  </span>
                </div>
                <p className="text-sm font-medium text-center">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <Link
              href="/recommeded"
              className="bg-[#d9edbf] text-[#2c7865] flex items-center text-center w-fit py-[10px] px-[18px] gap-6 rounded-sm"
              role="button"
            >
              View More
              {/* <LongArrowIcon /> */}
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[20vh]">
          No categories available.
        </p>
      )}
    </section>
  );
};

export default CategoriesSection;
