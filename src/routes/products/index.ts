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
import { uploadImage } from "../../config/configOptions";
import { checkAuth } from "../../middlewares/auth";
import { optimizeImages } from "../../middlewares/processImage";

const router = Router();

router
  .route("/product/:id")
  .get(rootErrorHandler(getProductById))
  .patch(
    [
      checkAuth,
      checkId,
      mutateProductCheck,
      uploadImage.array("images", 4),
      optimizeImages,
    ],
    rootErrorHandler(updateProduct)
  )
  .delete([checkAuth, sellerRoleCheck], rootErrorHandler(deleteProductById));

router.get(
  "/recently-viewed",
  rootErrorHandler(getRecentlyViewedProductsForLoggedUser)
);
router.get("/recommended", rootErrorHandler(getRecommendedProducts));
router.post(
  "/product",
  [checkAuth, sellerRoleCheck, uploadImage.array("images", 4), optimizeImages],
  rootErrorHandler(addProduct)
);
router
  .route("/favourite")
  .get(checkAuth, rootErrorHandler(getFavouriteProducts))
  .post(checkAuth, rootErrorHandler(addProductToFavourite));
router.delete(
  "/favourite/:id",
  checkAuth,
  rootErrorHandler(removeProductFromFavourite)
);
export { router as productRoutes };
