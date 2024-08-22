import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "../Home/AboutSection";
import ExploreSection from "../Home/ExploreSection";
import Categories from "./Categories";
import GetStarted from "../Home/GetStarted";
import Products from "../Home/Products";
import ExclusiveItemSection from "../Home/ExclusiveItemSection";
import Diversity from "../Home/Diversity";
import Recommendations from "../components/Recommendations";
import styles from "../styles/HomePage/AboutSectioon.module.scss";
import Head from "next/head";
import FlashSales from "./FlashSales";
import ExploreProducts from "./ExploreProducts";
import CategoriesSection from "../components/CategoriesSection";
import StoresSection from "../components/StoresSection";
import CustomRecommendations from "./CustomRecommendations";
import CustomHeroSection from "./CustomHeroSection";
import SecondHeroSection from "./SecondHeroSection";


type Props = {};

const Marketplace = (props: Props) => {
  return (
    <>
      {/* <div className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row mx-8">
        <div className="flex flex-col w-full max-w-[400px] h-[500px] bg-white group block border-4 overflow-hidden"></div>
        <div className="relative flex w-full grow h-[500px] bg-red group block border-4 overflow-hidden">
          <HeroSection />
        </div>
      </div> */}
      <CustomHeroSection />
      <div className={`${styles.recommend}`}>
        <CustomRecommendations
          subtitle={"Today's"}
          title={"Flash Sales"}
          timer={"03:23:19"}
        />
      </div>
      <div className={`${styles.recommend}`}>
        <CategoriesSection />
      </div>

      <div className={`${styles.recommend}`}>
        <CustomRecommendations
          subtitle={"This Month"}
          title={"Best Selling Products"}
        />
      </div>
      <SecondHeroSection timer={"03:23:19"} />
      <div className={`${styles.recommend}`}>
        <Recommendations />
      </div>
      <Categories />

      {/* <div className={`${styles.recommend}`}>
        <StoresSection />
      </div> */}

      {/* <AboutSection /> */}
      {/* <div className={`${styles.recommend}`}><Recommendations /></div> */}
      {/* <ExploreSection /> */}
      {/* <Categories /> */}

      {/* <div className={`${styles.recommend}`}><Recommendations /></div> */}
      {/* <Products /> */}
      {/* <ExclusiveItemSection /> */}
      {/* <Diversity /> */}
      {/* <div className={`${styles.recommend} pb-20`}><Recommendations /></div> */}
    </>
  );
};

export default Marketplace;
