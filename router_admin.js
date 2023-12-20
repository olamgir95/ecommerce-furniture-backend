const express = require("express");
const productController = require("./controllers/productController");
const sellerController = require("./controllers/sellerController");
const upload = require("./utils/upload-multer");

/*************************/
/*  BSSR EJS */
/*************************/
const router_admin = express.Router();

router_admin.get("/", sellerController.home);
router_admin
  .route("/sign-up")
  .get(sellerController.getSignupMySeller)
  .post(upload("members").single("seller_img"), sellerController.signupProcess);

router_admin
  .route("/login")
  .get(sellerController.getLoginMySeller)
  .post(sellerController.loginProcess);

router_admin.get("/logout", sellerController.logout);
router_admin.get("/check-me", sellerController.checkSessions);

router_admin.get("/products/menu", sellerController.getMySellerProducts);
router_admin.post(
  "/products/create",
  sellerController.validateAuthSeller,
  upload("products").array("product_images", 5),
  productController.addNewProduct
);
router_admin.post(
  "/products/edit/:id",
  sellerController.validateAuthSeller,
  productController.updateChosenProduct
);

router_admin.get(
  "/all-seller",
  sellerController.validateAdmin,
  sellerController.getAllSellers
);

router_admin.post(
  "/all-seller/edit",
  sellerController.validateAdmin,
  sellerController.updateSellerByAdmin
);

module.exports = router_admin;
