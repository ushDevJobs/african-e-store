"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/HomePage/HeroSection.module.scss";
import Image from "next/image";
import images from "@/public/images";
import Link from "next/link";
import { CategoriesResponse } from "../components/models/AllCategories";
import { useRouter } from "next/navigation";
import { StorageKeys } from "../components/constants/StorageKeys";
import { useCategories } from "../context/CategoryContext";
import { FullPageLoader } from "../Loader/ComponentLoader";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";

type Props = {};

const HeroSection = (props: Props) => {
  const router = useRouter();

  const { categories, handleFetchAllCategories, isFetchingCategories } =
    useCategories();
  useEffect(() => {
    handleFetchAllCategories();
  }, []);
  return (
    <Splide
      options={{
        rewind: true,
        arrows: false,
        type: "loop",
        autoplay: !true,
        pauseOnHover: true,
        resetProgress: false,
        pagination: false,
      }}
      aria-label="Hero Section"
    >
      {Array.from(Array(4).keys()).map((chld, index) => {
        return (
          <SplideSlide key={index}>
            <div className="relative w-full h-[500px] p-10 !bg-gradient-to-r from-purple-500 to-pink-500" style={{backgroundImage: `${images.hero_bg}`, backgroundPosition: 'cover', backgroundRepeat: 'no-repeat'}}>
              {/* <Image
                src={images.hero_bg}
                alt="hero background image"
                // fill
                className="object-cover !rounded-lg !relative"
                width={200}
              /> */}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum deleniti velit aut fugit illo magni vero corrupti officiis voluptatum voluptatem ex dignissimos consequatur ducimus doloribus consectetur est, perspiciatis minima quisquam?
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default HeroSection;
