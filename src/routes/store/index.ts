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
  getStoreMessages,
  getStoreOrders,
  getStoreProducts,
  getStoreShippingFee,
  removeStoreFromFavourite,
  updateDeliveryFee,
  updateDeliveryStatusOfOrder,
  updateStoreProfile,
} from "../../controllers/store";
import { rootErrorHandler } from "../../root-error-handler";
import {
  checkStore,
  checkStoreId,
  sellerRoleCheck,
} from "../../middlewares/roles";
import { uploadImage } from "../../config/configOptions";
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

router.get(
  "/store/categories",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreCategories)
);
router.get(
  "/store/reviews",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(getReviewsForLoggedInUser)
);
router
  .route("/favourite")
  .get(checkAuth, rootErrorHandler(getFavouriteStores))
  .post(checkAuth, rootErrorHandler(addStoreToFavourite));
router.delete(
  "/favourite/:id",
  checkAuth,
  rootErrorHandler(removeStoreFromFavourite)
);
router
  .route("/store")
  .get(checkAuth, sellerRoleCheck, rootErrorHandler(getStoreByUserLogged))
  .post(checkAuth, sellerRoleCheck, rootErrorHandler(createStore));
router.get(
  "/store/products",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreProducts)
);
router.get(
  "/store/products/draft",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreDraftProducts)
);

router.patch(
  "/store/profile",
  [
    checkAuth,
    sellerRoleCheck,
    checkStore,
    uploadImage.single("image"),
    optimizeImage,
  ],
  rootErrorHandler(updateStoreProfile)
);
router
  .route("/store/profile/bank")
  .get([checkAuth, sellerRoleCheck, checkStore], getStoreBankDetails)
  .patch(
    [checkAuth, sellerRoleCheck, checkStore],
    rootErrorHandler(addBankDetails)
  );
router
  .route("/store/shipping-fee")
  .get([checkAuth, sellerRoleCheck, checkStore], getStoreShippingFee)
  .patch(
    [checkAuth, sellerRoleCheck, checkStore],
    rootErrorHandler(updateDeliveryFee)
  );

router.get(
  "/store/orders",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreOrders)
);
router.get(
  "/store/messages",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreMessages)
);
router.get(
  "/store/about",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(getAboutStore)
);
router.get(
  "/store/transactions",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(getIncomeAndTransactionsFromStore)
);
router.patch(
  "/store/orders/order/:id",
  [checkAuth, sellerRoleCheck, checkStore],
  rootErrorHandler(updateDeliveryStatusOfOrder)
);
export { router as storeRoutes };
