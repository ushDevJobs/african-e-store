import React, { useRef } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import images from "@/public/images";
import {
  DropDownIcon,
  DropDownIcon2,
  HamburgerIcon,
  TimesIcon,
} from "../SVGs/SVGicons";
import { usePathname } from "next/navigation";
import { CategoriesResponse } from "../models/AllCategories";
import { CartItem } from "../models/IProduct";

type Props = {
  navIsOpen: boolean;
  setNavIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoginDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: CategoriesResponse[] | null;
  isLoggedIn: boolean;
  isSellerLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  cartItems: CartItem[];
  Logout: () => Promise<void>;
};

const MobileNavBar = ({
  navIsOpen,
  setNavIsOpen,
  isDropdownOpen,
  setIsDropdownOpen,
  categories,
  isLoggedIn,
  cartItems,
  isSellerLoggedIn,
  isAdminLoggedIn,
  Logout,
  setIsLoginDropdownOpen,
}: Props) => {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);

  return (
    <div className={styles.mobileNavbarContainer}>
      <div className={styles.navbar}>
        <Link
          href={pathname.includes("/seller") ? "/seller" : "/"}
          onClick={() => setNavIsOpen(false)}
        >
          <div className={styles.navbar__img}>
            <Image src={images.logo} alt="Logo" />
          </div>
        </Link>
        <div className={styles.icon} onClick={() => setNavIsOpen(!navIsOpen)}>
          {navIsOpen ? <TimesIcon /> : <HamburgerIcon />}
        </div>
      </div>

      {navIsOpen && (
        <div className={styles.navbarOverlay}>
          <ul>
            {/* Home and Sell (Visible to everyone) */}
            <Link href="/" onClick={() => setNavIsOpen(false)}>
              <li className={pathname == "/" ? styles.active : ""}>Home</li>
            </Link>

            <Link href="/seller/signup" onClick={() => setNavIsOpen(false)}>
              <li className={pathname == "/seller/signup" ? styles.active : ""}>
                Sell
              </li>
            </Link>

            {/* Categories Dropdown (Visible to everyone) */}
            <li
              className={`${styles.dropdown} ${
                isDropdownOpen ? styles.open : styles.close
              }`}
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Categories {isDropdownOpen ? <DropDownIcon2 /> : <DropDownIcon />}
            </li>

            {isDropdownOpen && (
              <ul className={styles.dropdownContainer}>
                {categories?.slice(0, 6).map((category, index) => (
                  <Link
                    href={`/categories/${category.id}?${category.name}`}
                    key={index}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setNavIsOpen(false);
                    }}
                  >
                    <li
                      className={`${styles.dropdownLi} ${
                        pathname == `/categories/${category.id}`
                          ? styles.active
                          : ""
                      }`}
                    >
                      {category.name}
                    </li>
                  </Link>
                ))}
                <Link
                  className="whitespace-nowrap text-[#2C7865] text-sm"
                  href="/categories"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setNavIsOpen(false);
                  }}
                >
                  <li
                    className={`${styles.dropdownLi} ${
                      pathname == `/categories` ? styles.active : ""
                    }`}
                  >
                    See all
                  </li>
                </Link>
              </ul>
            )}

            {/* FAQ (Visible to everyone) */}
            <Link href="/faqs" onClick={() => setNavIsOpen(false)}>
              <li className={pathname == "/faqs" ? styles.active : ""}>
                FAQ&apos;s
              </li>
            </Link>

            {/* Logged-in User Actions */}
            {isLoggedIn && (
              <>
                <Link href="/orders" onClick={() => setNavIsOpen(false)}>
                  <li className={pathname == "/orders" ? styles.active : ""}>
                    Orders
                  </li>
                </Link>

                <Link href="/stores" onClick={() => setNavIsOpen(false)}>
                  <li className={pathname == "/stores" ? styles.active : ""}>
                    Stores
                  </li>
                </Link>

                <Link href="/saved-items" onClick={() => setNavIsOpen(false)}>
                  <li
                    className={pathname == "/saved-items" ? styles.active : ""}
                  >
                    Saved Items
                  </li>
                </Link>

                <Link href="/saved-store" onClick={() => setNavIsOpen(false)}>
                  <li
                    className={pathname == "/saved-store" ? styles.active : ""}
                  >
                    Saved Store
                  </li>
                </Link>

                <Link href="/cart" onClick={() => setNavIsOpen(false)}>
                  <li className={pathname == "/cart" ? styles.active : ""}>
                    My cart {cartItems.length > 0 && <>({cartItems.length})</>}
                  </li>
                </Link>
                <button
                  className={"hover:opacity-70 bg[#2c7865]"}
                  onClick={() => {
                    setIsLoginDropdownOpen(false);
                    Logout();
                  }}
                >
                  Log out
                </button>
              </>
            )}

            {/* Seller Account */}
            {isSellerLoggedIn && (
              <>
                <Link
                  onClick={() => setNavIsOpen(false)}
                  href="/seller-account"
                  className="w-fit whitespace-nowrap"
                >
                  <li
                    className={
                      pathname == "/seller-account" ? styles.active : ""
                    }
                  >
                    My Account
                  </li>
                </Link>
                <button
                  className={"hover:opacity-70 bg-[#2c7865]"}
                  onClick={() => {
                    setIsLoginDropdownOpen(false);
                    Logout();
                  }}
                >
                  Log out
                </button>
              </>
            )}

            {/* Admin Account */}
            {isAdminLoggedIn && (
              <>
              <button
                className="hover:opacity-70 bg-[#2c7865]"
                onClick={() => {
                  setIsLoginDropdownOpen(false);
                  Logout();
                }}
              >
                Log out
              </button>
            </>
            )}

            {/* Unauthenticated Users */}
            {!isLoggedIn && !isSellerLoggedIn && !isAdminLoggedIn && (
              <>
                <Link
                  href="/login"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setNavIsOpen(false);
                  }}
                >
                  <li className={pathname == "/login" ? styles.active : ""}>
                    Login
                  </li>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setNavIsOpen(false);
                  }}
                  className="bg-[#2c7865] w-fit px-6 py-2 text-sm text-white rounded-xl"
                >
                  Signup
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
