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

type Props = {};

const Marketplace = (props: Props) => {
  return (
    <>
      <HeroSection />
      {/* <FlashSales /> */}
      <div className={`${styles.recommend}`}>
        <CategoriesSection />
      </div>
      <div className={`${styles.recommend}`}>
        <CustomRecommendations
          subtitle={"Today's"}
          title={"Flash Sales"}
          timer={"03:23:19"}
        />
      </div>
      <div className={`${styles.recommend}`}>
        <CustomRecommendations
          subtitle={"This Month"}
          title={"Best Selling Products"}
        />
      </div>
      <GetStarted />
      <div className={`${styles.recommend}`}>
        <Recommendations />
      </div>
      <Categories />
      <Diversity />

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
