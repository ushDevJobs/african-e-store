"use client";
import React, { useState } from "react";
import styles from "./SingleCategory.module.scss";
import {
  FavoriteIcon,
  GreenStarIcon,
  RatingIcon,
  UserIcon,
} from "@/app/components/SVGs/SVGicons";
import useResponsiveness from "@/app/components/hooks/responsiveness-hook";
import Link from "next/link";
import { ProductResponse } from "@/app/components/models/IProduct";
import Image from "next/image";

type Props = {
  product: ProductResponse | undefined;
};

const SingleCategoryReviews = ({ product }: Props) => {
  const windowRes = useResponsiveness();
  const isMobile = windowRes.width && windowRes.width < 768;
  const onMobile = typeof isMobile == "boolean" && isMobile;
  const onDesktop = typeof isMobile == "boolean" && !isMobile;
  // Calculate total count and weighted sum for average
  // const totalCount = data.reduce((sum, item) => sum + item.count, 0);
  // const weightedSum = data.reduce((sum, item) => sum + (item.star * item.count), 0);

  // Calculate average rating
  // const averageRating = totalCount === 0 ? 0 : (weightedSum / totalCount).toFixed(1);

  // // Find the maximum count among all ratings
  // const maxCount = Math.max(...data.map(item => item.count));

  return (
    <div className={styles.reviews}>
      <h2>Ratings and reviews</h2>
      <div className={styles.reviewContents}>
        <div className={styles.lhs}>
          <div className={styles.top}>
            {onMobile && (
              <div className={styles.top_lhs}>
                {product?.store.image ? (
                  <div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px]">
                    <Image
                      src={product?.store.image}
                      alt="Logo"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <span className="bg-[#2C7865] h-fit p-3 rounded-full">
                    <UserIcon />
                  </span>
                )}
                <div className={styles.product}>
                  <Link
                    href={"/stores"}
                    className="text-[#828282] text-sm underline cursor-pointer"
                  >
                    {product?.store.name}
                  </Link>
                  <p className="text-[#828282] text-xs">
                    98% positive feedback
                  </p>
                </div>
              </div>
            )}
            {onDesktop && (
              <div className={styles.top_lhs}>
                {product?.store.image ? (
                  <div className="relative h-[60px] w-[60px] md:h-[100px] md:w-[100px]">
                    <Image
                      src={product?.store.image}
                      alt="Logo"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <span className="bg-[#2C7865] h-fit p-3 rounded-full">
                    <UserIcon />
                  </span>
                )}
                <div className={styles.product}>
                  <h3 className="text-[#828282] text-lg">
                    {product?.store.name}
                  </h3>
                  <p className="text-[#828282] text-base">
                    {product?.positiveFeeback}% positive feedback{" "}
                    <Link
                      href={"/contact-seller"}
                      className="cursor-pointer text-sm text-[#2C7865] font-bold"
                    >
                      Contact seller{" "}
                    </Link>
                  </p>
                </div>
              </div>
            )}
            {onDesktop && (
              <div className={styles.top_rhs}>
                {/* <span><FavoriteIcon /></span> */}
                <Link href={`/stores/${product?.store.id}`}>Visit store</Link>
              </div>
            )}
          </div>
          {/* <div className={styles.ratings}>
                        <h3 className='text-[#6F6F6F] text-base font-semibold mb-5'>Product Rating </h3>
                        {onDesktop && <div className={styles.rating}>
                            <div className={styles.average}>
                                <h4>{averageRating}/5</h4>
                            </div>

                            <div className={styles.ratingProgress}>
                                {data.map((item, index) => {
                                    return (
                                        <div className={styles.value} key={index}>
                                            <p>{item.star} <span><GreenStarIcon /></span></p>
                                            <div className={styles.progress}>
                                                <div className={styles.bar} style={{ width: `${(item.count / maxCount) * 100}%` }}></div>
                                            </div>
                                            <p className={styles.rangeValue}>
                                                {item.count.toLocaleString()}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>}

                        {onMobile &&
                            <div className={styles.rating}>
                                <h3 className='text-[#2C7865] text-lg font-medium -mt-4'>{averageRating}/5</h3>
                                <div className={`${styles.ratingProgress} -mt-4`}>
                                    {data.map((item, index) => {
                                        return (
                                            <div className={styles.value} key={index}>
                                                <p>{item.star} <span><GreenStarIcon /></span></p>
                                                <div className={styles.progress}>
                                                    <div className={styles.bar} style={{ width: `${(item.count / maxCount) * 100}%` }}></div>
                                                </div>
                                                <p className={styles.rangeValue}>
                                                    {item.count.toLocaleString()}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>}
                    </div> */}

          <div className={styles.reviewContainer}>
            {product?.productRatings && product?.productRatings.length > 0 ? (
              product?.productRatings.map((prating, i) => (
                <div className={styles.review}>
                  <span className="flex items-center">
                    {Array.from(
                      { length: prating.rating },
                      (_, i) => i + 1
                    ).map((index) => (
                      <span key={index} className={index != 5 ? "mr-1" : ""}>
                        <RatingIcon colored={true} />
                      </span>
                    ))}
                    {5 - prating.rating > 0 &&
                      Array.from(
                        { length: 5 - prating.rating },
                        (_, i) => i + 1
                      ).map((index) => (
                        <span key={index}>
                          <RatingIcon />
                        </span>
                      ))}
                  </span>
                  <p className="text-base text-[#4B4B4B]">{prating.review}</p>
                  <p className="text-xs text-[#828282]">
                    {new Date(prating.createdAt).toLocaleDateString()} by Dave
                  </p>
                </div>
              ))
            ) : (
              <div>No reviews</div>
            )}
            {/* <div className={styles.review}>
              <span className="flex items-center">
                {[1, 2, 3, 4].map((_, index) => (
                  <span key={index} className={index != 5 ? "mr-1" : ""}>
                    <RatingIcon colored={true} />
                  </span>
                ))}
                {[1].map((_, index) => (
                  <span key={index}>
                    <RatingIcon />
                  </span>
                ))}
              </span>
              <p className="text-base text-[#4B4B4B]">
                Good Phone, nice screen resolution, fast charging. All I ever
                wanted.
              </p>
              <p className="text-sm text-[#828282]">25-09-2023 by Dave</p>
            </div>
            <div className={styles.review}>
              <span className="flex items-center">
                {[1, 2, 3, 4].map((_, index) => (
                  <span key={index} className={index != 5 ? "mr-1" : ""}>
                    <RatingIcon colored={true} />
                  </span>
                ))}
                {[1].map((_, index) => (
                  <span key={index}>
                    <RatingIcon />
                  </span>
                ))}
              </span>
              <p className="text-base text-[#4B4B4B]">
                Good Phone, nice screen resolution, fast charging. All I ever
                wanted.
              </p>
              <p className="text-sm text-[#828282]">25-09-2023 by Dave</p>
            </div>
            <div className={styles.review}>
              <span className="flex items-center">
                {[1, 2, 3, 4].map((_, index) => (
                  <span key={index} className={index != 5 ? "mr-1" : ""}>
                    <RatingIcon colored={true} />
                  </span>
                ))}
                {[1].map((_, index) => (
                  <span key={index}>
                    <RatingIcon />
                  </span>
                ))}
              </span>
              <p className="text-base text-[#4B4B4B]">
                Good Phone, nice screen resolution, fast charging. All I ever
                wanted.
              </p>
              <p className="text-sm text-[#828282]">25-09-2023 by Dave</p>
            </div>
            <div className={styles.review}>
              <span className="flex items-center">
                {[1, 2, 3, 4].map((_, index) => (
                  <span key={index} className={index != 5 ? "mr-1" : ""}>
                    <RatingIcon colored={true} />
                  </span>
                ))}
                {[1].map((_, index) => (
                  <span key={index}>
                    <RatingIcon />
                  </span>
                ))}
              </span>
              <p className="text-base text-[#4B4B4B]">
                Good Phone, nice screen resolution, fast charging. All I ever
                wanted.
              </p>
              <p className="text-sm text-[#828282]">25-09-2023 by Dave</p>
            </div> */}
          </div>
        </div>
        <div className={styles.rhs}></div>
      </div>
    </div>
  );
};

export default SingleCategoryReviews;
