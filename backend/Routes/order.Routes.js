const express = require("express");
const {
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  newOrder,
} = require("../controller/oderControler");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");
const OrderRoutes = express.Router();


OrderRoutes.route("/new").post( isAuthenticated, newOrder);

OrderRoutes.route("/:id").get(isAuthenticated, getSingleOrder);

OrderRoutes.route("/signUserOrder/all").get(isAuthenticated, myOrders);
//admin
OrderRoutes
  .route("/admin/all/orders").get(isAuthenticated, authorizedRoles("admin"), getAllOrders);

OrderRoutes
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteOrder);

module.exports = OrderRoutes;