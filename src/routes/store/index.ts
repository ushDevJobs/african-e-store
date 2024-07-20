import { Router } from "express";
import {
  addBankDetails,
  addStoreToFavourite,
  createStore,
  getAboutStore,
  getAllStores,
  getCategoriesfromStoreById,
  getFavouriteStores,
  getProductsOfStoreById,
  getReviewsForLoggedInUser,
  getReviewsForStoreById,
  getStoreById,
  getStoreByUserLogged,
  getStoreCategories,
  getStoreDraftProducts,
  getStoreOrders,
  getStoreProducts,
  removeStoreFromFavourite,
  searchForStore,
  searchStoreProducts,
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
import { uploadStoreImage, uploadUsertImage } from "../../config/configOptions";
import { checkAuth } from "../../middlewares/auth";

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
  [sellerRoleCheck, checkStore, uploadStoreImage.single("image")],
  rootErrorHandler(updateStoreProfile)
);
router.patch(
  "/store/profile/bank",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(addBankDetails)
);

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
router.patch(
  "/store/orders/order/:id",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(updateDeliveryStatusOfOrder)
);
export { router as storeRoutes };
