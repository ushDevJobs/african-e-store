import { Router } from "express";
import {
  addBankDetails,
  addStoreToFavourite,
  createStore,
  getAboutStore,
  getAllStores,
  getCategoriesfromStoreById,
  getFavouriteStores,
  getIncomeAndTransactionsFromStore,
  getProductsOfStoreById,
  getReviewsForLoggedInUser,
  getReviewsForStoreById,
  getStoreBankDetails,
  getStoreById,
  getStoreByUserLogged,
  getStoreCategories,
  getStoreDraftProducts,
  getStoreOrders,
  getStoreProducts,
  getStoreShippingFee,
  removeStoreFromFavourite,
  searchForStore,
  searchStoreProducts,
  updateDeliveryFee,
  updateDeliveryStatusOfOrder,
  updateStoreDescription,
  updateStoreProfile,
} from "../../controllers/store";
import { rootErrorHandler } from "../../root-error-handler";
import {
  checkStore,
  checkStoreId,
  sellerRoleCheck,
} from "../../middlewares/roles";
import {
  uploadImage,
  uploadStoreImage,
  uploadUsertImage,
} from "../../config/configOptions";
import { checkAuth } from "../../middlewares/auth";
import { optimizeImage } from "../../middlewares/processImage";

const router = Router();
router.get("/all", rootErrorHandler(getAllStores));
router.get("/store/id/:id", checkStoreId, rootErrorHandler(getStoreById));

router.get(
  "/store/id/:id/products",
  checkStoreId,
  rootErrorHandler(getProductsOfStoreById)
);
router.get(
  "/store/id/:id/categories",
  checkStoreId,
  rootErrorHandler(getCategoriesfromStoreById)
);
router.get(
  "/store/id/:id/reviews",
  checkStoreId,
  rootErrorHandler(getReviewsForStoreById)
);
router.get("/search", rootErrorHandler(searchForStore));

router.get(
  "/store/categories",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreCategories)
);
router.get(
  "/store/reviews",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getReviewsForLoggedInUser)
);
router
  .route("/favourite")
  .get(rootErrorHandler(getFavouriteStores))
  .post(rootErrorHandler(addStoreToFavourite));
router.delete("/favourite/:id", rootErrorHandler(removeStoreFromFavourite));
router
  .route("/store")
  .get(sellerRoleCheck, rootErrorHandler(getStoreByUserLogged))
  .post(sellerRoleCheck, rootErrorHandler(createStore));
router.get(
  "/store/products",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreProducts)
);
router.get(
  "/store/products/draft",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreDraftProducts)
);
router.get(
  "/store/search",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(searchStoreProducts)
);
router.patch(
  "/store/description",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(updateStoreDescription)
);
router.patch(
  "/store/profile",
  [sellerRoleCheck, checkStore, uploadImage.single("image"), optimizeImage],
  rootErrorHandler(updateStoreProfile)
);
router
  .route("/store/profile/bank")
  .get([sellerRoleCheck, checkStore], getStoreBankDetails)
  .patch([sellerRoleCheck, checkStore], rootErrorHandler(addBankDetails));
router
  .route("/store/shipping-fee")
  .get([sellerRoleCheck, checkStore], getStoreShippingFee)
  .patch([sellerRoleCheck, checkStore], rootErrorHandler(updateDeliveryFee));

router.get(
  "/store/orders",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreOrders)
);
router.get(
  "/store/about",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getAboutStore)
);
router.get(
  "/store/transactions",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getIncomeAndTransactionsFromStore)
);
router.patch(
  "/store/orders/order/:id",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(updateDeliveryStatusOfOrder)
);
export { router as storeRoutes };
