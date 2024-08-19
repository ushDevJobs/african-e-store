"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "../styles/HomePage/CategoriesSection.module.scss";
import {
  LeftArrowIcon,
  LongArrowIcon,
  RightArrowIcon,
} from "../components/SVGs/SVGicons";
import Link from "next/link";
import Image from "next/image";
import useResponsiveness from "../components/hooks/responsiveness-hook";
import { useCategories } from "../context/CategoryContext";
import ProductCard from "../components/ProductCard";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";


type Props = {};

const Categories = (props: Props) => {
  const windowRes = useResponsiveness();
  const isMobile = windowRes.width && windowRes.width < 768;
  const onMobile = typeof isMobile == "boolean" && isMobile;
  const onDesktop = typeof isMobile == "boolean" && !isMobile;
  const mainRef = useRef<Splide>(null);

  const { categories, handleFetchAllCategories } = useCategories();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    handleThumbs(index);
  };

  const handleThumbs = (id: any) => {
    console.log(mainRef.current);
    if (mainRef.current) {
      mainRef.current.splide.go(id);
    }
  };

  const scrollLeft = () => {
    setActiveTab((prevActiveTab) => {
      if (categories?.length) {
        return prevActiveTab === 0
          ? categories.slice(0, 6).length - 1
          : prevActiveTab - 1;
      }
      return prevActiveTab; // or handle the undefined case appropriately
    });
    handleThumbs("<");
  };

  const scrollRight = () => {
    setActiveTab((prevActiveTab) => {
      if (categories?.length) {
        return prevActiveTab === categories.slice(0, 6).length - 1
          ? 0
          : prevActiveTab + 1;
      }
      return prevActiveTab;
    });
    handleThumbs(">");
  };

  useEffect(() => {
    handleFetchAllCategories();
  }, []);

  return (
    <div className={styles.main}>
      <div className="flex justify-start gap-2">
        <div className="flex w-3 bg-[#d9edbf]"></div>
        <p className="!mx-0 !text-start">Our Products</p>
      </div>
      <div className="flex justify-between gap-2">
        <h2 className="!mx-0 mt-2 !text-start !text-[26px]">
          Explore Our Products
        </h2>
        {!isMobile && (
          <div className="flex gap-2">
            <div
              className={`w-9 h-9 bg-[#2c7865] p-[14px] text-[20px] rounded-full justify-center`}
              role="button"
              onClick={() => {
                scrollLeft();
              }}
            >
              <LeftArrowIcon />
            </div>
            <div
              className={`w-9 h-9 bg-[#2c7865] p-[14px] text-[20px] rounded-full justify-center`}
              role="button"
              onClick={() => {
                scrollRight();
              }}
            >
              <RightArrowIcon />
            </div>
          </div>
        )}
      </div>

      {categories ? (
        <Fragment>
          <div className={styles.controllerSection}>
            <div className={styles.controller}>
              <div className={styles.tab}>
                {categories?.slice(0, 6).map((tab, index) => (
                  <span
                    key={index}
                    className={index === activeTab ? styles.activeTab : ""}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Splide
            options={{
              rewind: true,
              arrows: false,
              type: "loop",
              autoplay: false,
              pauseOnHover: true,
              resetProgress: false,
              pagination: false,
            }}
            // renderControls={() => (
            //   <div className={`splide__arrows ${styles.controllerSection}`}>
            //     <div
            //       className={`splide__arrow--prev ${styles.arrow}`}
            //       role="button"
            //     >
            //       <LeftArrowIcon />
            //     </div>
            //     <div
            //       className={` splide__arrow--next ${styles.arrow}`}
            //       role="button"
            //     >
            //       <RightArrowIcon />
            //     </div>
            //   </div>
            // )}
            ref={mainRef}
            aria-label="Categories Section"
          >
            {categories?.map((categoryProd, index) => {
              // console.log(categoryProd);
              return (
                <SplideSlide key={index}>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-2 my-4">
                    {categoryProd.products ? (
                      categoryProd.products
                        .slice(0, 8)
                        .map((product, productIndex) => (
                          <ProductCard key={productIndex} product={product} />
                        ))
                    ) : (
                      <p className="text-gray-400 text-sm text-center mx-auto w-full">
                        No products available for this category.
                      </p>
                    )}
                  </div>
                </SplideSlide>
              );
            })}
          </Splide>
          <div className="flex justify-center">
            <Link
              href="/categories"
              className="bg-[#d9edbf] text-[#2c7865] flex items-center text-center w-fit py-[15px] px-[26px] gap-6 rounded-sm"
              role="button"
            >
              See all Categories <LongArrowIcon />
            </Link>
          </div>
        </Fragment>
      ) : (
        <div className="m-2">
          <p className="text-base text-gray-500 flex flex-col items-center justify-center text-center mx-auto min-h-[20vh]">
            No products available for this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default Categories;
