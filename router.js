const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const sellerController = require("./controllers/sellerController");
const orderController = require("./controllers/orderController");

/*************************/
/*  REST API  */
/*************************/

router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);

//Product related routers

router.post(
  "/products",
  memberController.retrieveAuthMember,
  productController.getAllProducts
);

router.get(
  "/products/:id",
  memberController.retrieveAuthMember,
  productController.getChosenProduct
);

//Seller related routers

router.get(
  "/sellers",
  memberController.retrieveAuthMember,
  sellerController.getSellers
);

router.get(
  "/sellers/:id",
  memberController.retrieveAuthMember,
  sellerController.getChosenSeller
);

//Order related routers
router.post(
  "/orders/create",
  memberController.retrieveAuthMember,
  orderController.createOrder
);
