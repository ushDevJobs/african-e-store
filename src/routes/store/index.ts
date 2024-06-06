import { Router } from "express";
import {
  createStore,
  getAllStores,
  getStoreById,
  getStoreByUserLogged,
  getStoreProduct,
  searchForStore,
} from "../../controllers/store";
import { rootErrorHandler } from "../../root-error-handler";
import { checkStore, sellerRoleCheck } from "../../middlewares/roles";

const router = Router();
router.get("/all", getAllStores);
router.get("/store/id/:id", getStoreById);
router.get("/search/:name", searchForStore);
router
  .route("/store")
  .get(sellerRoleCheck, rootErrorHandler(getStoreByUserLogged))
  .post(sellerRoleCheck, rootErrorHandler(createStore));
router.get("/store/products", [sellerRoleCheck, checkStore], getStoreProduct);
export { router as storeRoutes };
