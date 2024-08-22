"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import images from "@/public/images";
import CountdownTimer from "./CountdownTimer";


type Props = {
  timer?: any;
};
const SecondHeroSection = (props: Props) => {
  const { timer } = props;
  return (
    <div className="relative bg-green-900 text-white rounded-lg overflow-hidden mx-4 md:mx-8 lg:mx-10 xl:mx-24 mb-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={images.hero_bg}
          alt="Background Image"
          fill
          className="object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center p-6 md:p-4 lg:p-8 space-y-6 h-[400px] px-4 md:px-8 lg:px-10 xl:px-20 space-x-1 lg:space-x-4 ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Enhance Your Shopping Experience
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl">
          <CountdownTimer timeString={timer} style="!text-white" />
        </p>
        <Link
          href="/shop"
          className="inline-block bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg transition"
        >
          Buy Now!
        </Link>
      </div>

      {/* Overlay Icons */}
      <div className="absolute right-0 bottom-0 flex flex-col items-center space-y-2 p-4">
        <div className="bg-white text-green-900 p-2 rounded-full">
          <Image src="/path-to-icon1.svg" alt="Icon 1" width={24} height={24} />
        </div>
        <div className="bg-white text-green-900 p-2 rounded-full">
          <Image src="/path-to-icon2.svg" alt="Icon 2" width={24} height={24} />
        </div>
        <div className="bg-white text-green-900 p-2 rounded-full">
          <Image src="/path-to-icon3.svg" alt="Icon 3" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default SecondHeroSection;
