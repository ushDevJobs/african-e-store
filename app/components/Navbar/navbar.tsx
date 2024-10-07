"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import useResponsiveness from "../hooks/responsiveness-hook";
import Image from "next/image";
import images from "@/public/images";
import Link from "next/link";
import { CartIcon, DownArrowIcon, UserIcon } from "../SVGs/SVGicons";
import { usePathname, useRouter } from "next/navigation";
import { useAccountStatus } from "@/app/context/AccountStatusContext";
import { useLogout } from "@/app/api/apiClients";
import { createCustomErrorMessages } from "../constants/catchError";
import { toast } from "sonner";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import MobileNavBar from "./MobileNavBar";
import useOuterClick from "../hooks/useOuterClick";
import { useCategories } from "@/app/context/CategoryContext";
import { FullPageLoader } from "@/app/Loader/ComponentLoader";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [navIsOpen, setNavIsOpen] = useState(false);
  const logout = useLogout();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { accountStatus, fetchAccountStatus } = useAccountStatus();
  const windowRes = useResponsiveness();
  const isMobile = windowRes.width && windowRes.width < 768;
  const onMobile = typeof isMobile == "boolean" && isMobile;
  const onDesktop = typeof isMobile == "boolean" && !isMobile;
  const { categories, handleFetchAllCategories, isFetchingCategories } =
    useCategories();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const categoryDropdownRef = useRef<HTMLLIElement | null>(null);

  // Api call to check if user is logged in
  async function Logout() {
    await logout()
      .then((response) => {
        if (response.data.status) {
          router.push("/");
          setIsLoggedIn(false);
          setIsSellerLoggedIn(false);
          setIsAdminLoggedIn(false);
        }
        toast.success("Logout successful");
      })
      .catch((error) => {
        const errorMessage = createCustomErrorMessages(error.response?.data);
        toast.error(errorMessage);
      });
  }

  useEffect(() => {
    fetchAccountStatus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleFetchAllCategories();
  }, []);

  useEffect(() => {
    if (accountStatus?.accountType === "BUYER") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (accountStatus?.accountType === "SELLER") {
      setIsSellerLoggedIn(true);
    } else {
      setIsSellerLoggedIn(false);
    }

    if (accountStatus?.accountType === "ADMIN") {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, [accountStatus]);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  useOuterClick(userDropdownRef, setIsLoginDropdownOpen);
  const catDropdownRef = useRef<HTMLUListElement>(null);
  useOuterClick(catDropdownRef, setIsCategoryDropdownOpen);

  return (
    <div
      className={`${styles.navbarContainer} ${scrolled ? styles.scrolled : ""}`}
    >
      {onDesktop && (
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            <Image src={images.logo} alt="rayvvin logo" />
          </Link>

          <ul className={styles.links}>
            <Link href="/">
              <li>Home</li>
            </Link>

            {/* Categories dropdown always visible */}
            <div className={styles.dropdown}>
              <li
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                Categories <DownArrowIcon />
              </li>
              {isCategoryDropdownOpen && (
                <ul className={styles.dropdownContainer} ref={catDropdownRef}>
                  <div className="w-full flex flex-col !min-w-[300px] p-2">
                    {categories?.slice(0, 10).map((category) => (
                      <div
                        className={`${styles.category} flex flex-col mx-3 my-1`}
                        key={category.id}
                      >
                        <Link
                          key={category.id}
                          href={`/categories/${category.id}`}
                          onClick={() => setIsCategoryDropdownOpen(false)}
                          className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition whitespace-nowrap "
                        >
                          {category.name}
                        </Link>
                      </div>
                    ))}
                    {!categories && isFetchingCategories && (
                      <div className="h-28 w-full grid place-items-center ">
                        <FullPageLoader className="w-6 h-6" />
                      </div>
                    )}
                    {categories && (
                      <Link
                        className="whitespace-nowrap text-[#2C7865] text-sm mx-3 my-2 text-center"
                        href="/categories"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                      >
                        See all
                        {/* See all categories */}
                      </Link>
                    )}
                  </div>
                  {/* <div className={styles.rhs}>
                                            <Image src={images.category_dropdown_image} alt='category iamge' />
                                        </div> */}
                </ul>
              )}
            </div>

            {/* Sell always visible */}
            <Link href="/seller/signup">
              <li>Sell</li>
            </Link>

            <Link href="/faq">
              <li>FAQ&apos;s</li>
            </Link>

            {/* Cart for Buyers */}
            {isLoggedIn && (
              <Link href="/cart">
                <div className={styles.cart}>
                  <div className={styles.cartIcon}>
                    <CartIcon />
                    <span>{cartItems.length > 0 && cartItems.length}</span>
                  </div>
                  <h4>My cart</h4>
                </div>
              </Link>
            )}

            

            

            {isAdminLoggedIn && (
              <>
                <div
                  className={styles.dropDownInfo}
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                >
                  <span>
                    <UserIcon /> <DownArrowIcon />
                  </span>
                </div>
                {isLoginDropdownOpen && (
                  <div
                    className={`${styles.loginDropdownContainer} shadow-lg`}
                    ref={userDropdownRef}
                  >
                    <button
                      className={"hover:opacity-70"}
                      onClick={() => {
                        setIsLoginDropdownOpen(false);
                        Logout();
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </>
            )}

            {isSellerLoggedIn && (
              <>
                <div
                  className={styles.dropDownInfo}
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                >
                  <span>
                    <UserIcon /> <DownArrowIcon />
                  </span>
                </div>
                {isLoginDropdownOpen && (
                  <div
                    className={`${styles.loginDropdownContainer} shadow-lg`}
                    ref={userDropdownRef}
                  >
                    <button
                      className={"hover:opacity-70"}
                      onClick={() => {
                        setIsLoginDropdownOpen(false);
                        Logout();
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </>
            )}

            

            {isLoggedIn && (
              <>
                <div
                  className={styles.dropDownInfo}
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                >
                  <span>
                    <UserIcon /> <DownArrowIcon />
                  </span>
                </div>
                {isLoginDropdownOpen && (
                  <div
                    className={`${styles.loginDropdownContainer} shadow-lg`}
                    ref={userDropdownRef}
                  >
                    <Link
                      href={"/orders"}
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      My orders
                    </Link>
                    <Link
                      href={"/help"}
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Help/support
                    </Link>
                    <Link
                      href={"/stores"}
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Stores
                    </Link>
                    <Link
                      href={"/saved-store"}
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Saved Store
                    </Link>
                    <Link
                      href={"/saved-items"}
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Saved Items
                    </Link>
                    <Link href={"/orders"}>Track order</Link>
                    <button
                      className={"hover:opacity-70 bg[#2c7865]"}
                      onClick={() => {
                        setIsLoginDropdownOpen(false);
                        Logout();
                      }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </>
            )}

            {/* {isSellerLoggedIn && (
              <button
                className={`${styles.signup} hover:opacity-70`}
                onClick={() => {
                  setIsLoginDropdownOpen(false);
                  Logout();
                }}
              >
                Log out
              </button>
            )} */}

            {/* Login/Signup for Unauthenticated Users */}
            {!isLoggedIn && !isSellerLoggedIn && !isAdminLoggedIn && (
              <>
                <Link href="/login">
                  <button className={`${styles.login} hover:opacity-70`}>
                    {" "}
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className={`${styles.signup} hover:opacity-70`}>
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Mobile Navbar */}
      {onMobile && (
        <MobileNavBar
          navIsOpen={navIsOpen}
          setNavIsOpen={setNavIsOpen}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          categories={categories}
          isLoggedIn={isLoggedIn}
          isSellerLoggedIn={isSellerLoggedIn}
          isAdminLoggedIn={isAdminLoggedIn}
          cartItems={cartItems}
          Logout={Logout}
          setIsLoginDropdownOpen={setIsLoginDropdownOpen}

        />
      )}
    </div>
  );
};

export default Navbar;
