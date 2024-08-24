"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";
import { slides } from "./data";
import images from "@/public/images";
import useResponsiveness from "../components/hooks/responsiveness-hook";
import { useCategories } from "../context/CategoryContext";

const CustomHeroSection: React.FC = () => {
  const windowRes = useResponsiveness();
  const isMobile = windowRes.width && windowRes.width < 768;
  const onMobile = typeof isMobile == "boolean" && isMobile;
  const onDesktop = typeof isMobile == "boolean" && !isMobile;
  const { categories, handleFetchAllCategories } = useCategories();
  useEffect(() => {
    handleFetchAllCategories();
  }, []);
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-24 lg:py-24 px-4 md:px-8 lg:px-10 xl:px-20 space-x-1 lg:space-x-4 pb-2 md:pb-4 lg:pb-4 gap-4">
      {/* Categories Column */}
      <div className="w-full lg:w-1/4 flex flex-col space-y-4 order-last xs:order-last sm:order-last md:order-last lg:order-first xl:order-first">
        <h3 className="text-xl font-semibold">Categories</h3>
        <div className="flex flex-col space-y-2">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="w-full lg:w-3/4 mt-8 lg:mt-0 !rounded-md">
        <Splide
          options={{
            type: "loop",
            perPage: 1,
            autoplay: !true,
            interval: 3000,
            pagination: false,
            arrows: false,
            drag: "free",
            gap: "1rem",
          }}
        >
          {slides.map((slide, index) => (
            <SplideSlide key={index}>
              <div className="relative w-full h-64 lg:h-96">
                <Image
                  // src={slide.image}
                  src={images.hero_bg}
                  alt={slide.title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center !rounded-md">
                  <div className="text-center">
                    <h2 className="text-white text-2xl lg:text-4xl font-bold mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-white text-lg lg:text-xl">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default CustomHeroSection;
