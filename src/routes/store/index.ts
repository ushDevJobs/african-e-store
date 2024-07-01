import { Router } from "express";
import {
  addStoreToFavourite,
  createStore,
  getAllStores,
  getCategoriesfromStoreById,
  getFavouriteStores,
  getProductsOfStoreById,
  getStoreById,
  getStoreByUserLogged,
  getStoreCategories,
  getStoreProducts,
  removeStoreFromFavourite,
  searchForStore,
  searchStoreProducts,
  updateStoreDescription,
  updateStoreProfile,
} from "../../controllers/store";
import { rootErrorHandler } from "../../root-error-handler";
import { checkStore, sellerRoleCheck } from "../../middlewares/roles";
import { uploadUsertImage } from "../../config/configOptions";

const router = Router();
router.get("/all", rootErrorHandler(getAllStores));
router.get("/store/id/:id", rootErrorHandler(getStoreById));

router.get(
  "/store/id/:storeId/products",
  rootErrorHandler(getProductsOfStoreById)
);
router.get(
  "/store/id/:id/categories",
  rootErrorHandler(getCategoriesfromStoreById)
);
router.get("/search", rootErrorHandler(searchForStore));

router.get(
  "/store/categories",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreCategories)
);
router
  .route("/favourite")
  .get(rootErrorHandler(getFavouriteStores))
  .post(rootErrorHandler(addStoreToFavourite))
  router.delete("/favourite/:id", rootErrorHandler(removeStoreFromFavourite));
router
  .route("/store")
  .get(sellerRoleCheck, rootErrorHandler(getStoreByUserLogged))
  .post(sellerRoleCheck, rootErrorHandler(createStore));
router.get(
  "/store/products/",
  [sellerRoleCheck, checkStore],
  rootErrorHandler(getStoreProducts)
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
  [sellerRoleCheck, checkStore, uploadUsertImage.single("image")],
  rootErrorHandler(updateStoreProfile)
);
export { router as storeRoutes };
