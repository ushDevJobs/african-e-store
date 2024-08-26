import { NextFunction, Request, Response } from "express";
import apicache from "apicache";
import { RequestUser } from "../types";
export const cacheStatus200 = (req: Request, res: Response) =>
  res.statusCode === 200 && req.method === "GET";
export const cache = apicache.middleware;
export const cacheSuccess = cache("30 minutes", cacheStatus200);
export enum CACHE_KEYS {
  CATEGORIES_WITH_PRODUCTS = "get-category-with-products",
  CATEGORIES = "categories",
  CATEGORY = "category-",
  PRODUCTS = "products",
  PRODUCT = "product-",
  FAVORITE_PRODUCT = "favorite-products-",
  RECENTLY_VIEWED_PRODUCTS = "recently-viewed-products-",
  RECOMMENDED_PRODUCTS = "recommended-products-",
  STORES = "stores",
  STORE = "store-",
  STORE_ID = "store-id-",
  STORE_CATEGORIES_ID = "store-categories-id-",
  STORE_PRODUCTS = "store-products-",
  STORE_DRAFT = "store-draft-",
  FAVORITE_STORE = "favorite-stores-",
  STORE_CATEGORIES = "store-categories-",
  STORE_REVIEWS = "store-review-",
  STORE_REVIEWS_ID = "store-review-id-",
  STORE_ORDERS = "store-orders-",
  STORE_TRANSACTIONS = "store-transactions-",
  STORE_BANK = "store-bank-",
  STORE_MESSAGES = "store-messages-",
  STORE_ABOUT = "store-about-",
  STORE_DELIVERY_FEE = "store-fee-",
  USER_ORDERS = "user-orders-",
  USER_DELIVERED_ORDERS = "user-delivered-orders-",
  USER_ADDRESS = "user-address-",
  USER_STATUS = "user-status-",
}
export const clearCache = (target: string) => apicache.clear(target);
export const modifyUrl = (req: Request, res: Response, next: NextFunction) => {
  let newId = req.isAuthenticated()
    ? (req.user as RequestUser).id
    : req.ip || "";
  req.params.id = newId;
  let modified = req.originalUrl + "/" + newId;
  req.originalUrl = modified;
  req.url = modified;
  next();
};
