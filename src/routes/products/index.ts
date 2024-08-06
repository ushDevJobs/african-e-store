import { Router } from "express";
import {
  checkId,
  mutateProductCheck,
  sellerRoleCheck,
} from "../../middlewares/roles";
import { rootErrorHandler } from "../../root-error-handler";
import {
  getProductById,
  updateProduct,
  addProduct,
  deleteProductById,
  getFavouriteProducts,
  addProductToFavourite,
  removeProductFromFavourite,
  getRecentlyViewedProductsForLoggedUser,
  getRecommendedProducts,
} from "../../controllers/products";
import { uploadProductImage } from "../../config/configOptions";
import { checkAuth } from "../../middlewares/auth";

const router = Router();

router
  .route("/product/:id")
  .get(rootErrorHandler(getProductById))
  .patch(
    [checkId, mutateProductCheck, uploadProductImage.array("images")],
    rootErrorHandler(updateProduct)
  )
  .delete([sellerRoleCheck], rootErrorHandler(deleteProductById));

router.get(
  "/recently-viewed",
  checkAuth,
  rootErrorHandler(getRecentlyViewedProductsForLoggedUser)
);
router.get("/recommended", rootErrorHandler(getRecommendedProducts));
router.post(
  "/product",
  [sellerRoleCheck, uploadProductImage.array("images")],
  rootErrorHandler(addProduct)
);
router
  .route("/favourite")
  .get(rootErrorHandler(getFavouriteProducts))
  .post(rootErrorHandler(addProductToFavourite));
router.delete("/favourite/:id", rootErrorHandler(removeProductFromFavourite));
export { router as productRoutes };
